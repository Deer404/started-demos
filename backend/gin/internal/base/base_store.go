package base

import (
	"errors"

	"gorm.io/gorm"
)

var (
	ErrRecordNotFound = errors.New("record not found")
	ErrInvalidID      = errors.New("invalid id")
)

type BaseModel interface {
	GetID() uint
}

type GormStore[T BaseModel] struct {
	db        *gorm.DB
	tableName string
}

func NewGormStore[T BaseModel](db *gorm.DB, tableName string) *GormStore[T] {
	return &GormStore[T]{
		db:        db,
		tableName: tableName,
	}
}

func (s *GormStore[T]) Create(item *T) error {
	if item == nil {
		return errors.New("item cannot be nil")
	}
	return s.db.Table(s.tableName).Create(item).Error
}

func (s *GormStore[T]) Get(id uint) (*T, error) {
	if id == 0 {
		return nil, ErrInvalidID
	}

	var item T
	if err := s.db.Table(s.tableName).First(&item, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrRecordNotFound
		}
		return nil, err
	}
	return &item, nil
}

func (s *GormStore[T]) List() ([]*T, error) {
	var items []*T
	if err := s.db.Table(s.tableName).Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}

func (s *GormStore[T]) Update(id uint, item *T) error {
	if id == 0 {
		return ErrInvalidID
	}
	if item == nil {
		return errors.New("item cannot be nil")
	}

	result := s.db.Table(s.tableName).Where("id = ?", id).Updates(item)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return ErrRecordNotFound
	}
	return nil
}

func (s *GormStore[T]) Delete(id uint) error {
	if id == 0 {
		return ErrInvalidID
	}

	result := s.db.Table(s.tableName).Delete(&struct{ ID uint }{id})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return ErrRecordNotFound
	}
	return nil
}

type BaseStore[T BaseModel] interface {
	Create(item *T) error
	Get(id uint) (*T, error)
	List() ([]*T, error)
	Update(id uint, item *T) error
	Delete(id uint) error
}
