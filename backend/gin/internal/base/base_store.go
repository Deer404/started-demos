package base

import (
	"errors"
	"log"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

var (
	ErrRecordNotFound = errors.New("record not found")
	ErrInvalidID      = errors.New("invalid id")
)

type BaseStore[T BaseModel] interface {
	Create(item *T) error
	Get(id uuid.UUID) (*T, error)
	List() ([]*T, error)
	Update(id uuid.UUID, item *T) error
	Delete(id uuid.UUID) error
	Patch(id uuid.UUID, updates map[string]interface{}) error
}

type BaseModel interface {
	GetID() uuid.UUID
}

type GormStore[T any] struct {
	db        *gorm.DB
	tableName string
}

func NewGormStore[T any](db *gorm.DB, tableName string) *GormStore[T] {
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

func (s *GormStore[T]) Get(id uuid.UUID) (*T, error) {
	if id == uuid.Nil {
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
	var items []T
	if err := s.db.Table(s.tableName).Find(&items).Error; err != nil {
		log.Printf("List error: %v", err)
		return nil, err
	}

	result := make([]*T, len(items))
	for i := range items {
		result[i] = &items[i]
	}

	return result, nil
}

func (s *GormStore[T]) Update(id uuid.UUID, item *T) error {
	if id == uuid.Nil {
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

func (s *GormStore[T]) Delete(id uuid.UUID) error {
	if id == uuid.Nil {
		return ErrInvalidID
	}

	result := s.db.Table(s.tableName).Delete(&struct{ ID uuid.UUID }{id})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return ErrRecordNotFound
	}
	return nil
}

func (s *GormStore[T]) Patch(id uuid.UUID, updates map[string]interface{}) error {
	if id == uuid.Nil {
		return ErrInvalidID
	}
	if updates == nil {
		return errors.New("updates cannot be nil")
	}

	result := s.db.Table(s.tableName).Where("id = ?", id).Updates(updates)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return ErrRecordNotFound
	}
	return nil
}
