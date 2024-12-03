package todo

import "gorm.io/gorm"

type store struct {
	db *gorm.DB
}

func NewStore(db *gorm.DB) Store {
	return &store{db: db}
}

func (s *store) Create(todo *Todo) error {
	return s.db.Create(todo).Error
}

func (s *store) Get(id uint) (*Todo, error) {
	var todo Todo
	if err := s.db.First(&todo, id).Error; err != nil {
		return nil, err
	}
	return &todo, nil
}

func (s *store) List() ([]*Todo, error) {
	var todos []*Todo
	if err := s.db.Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

func (s *store) Update(todo *Todo) error {
	return s.db.Save(todo).Error
}

func (s *store) Delete(id uint) error {
	return s.db.Delete(&Todo{}, id).Error
}
