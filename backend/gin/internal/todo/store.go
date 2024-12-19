package todo

import (
	"Demo/internal/base"

	"gorm.io/gorm"
)

type store struct {
	*base.GormStore[*Todo]
}

func NewStore(db *gorm.DB) TodoStore {
	return &store{
		GormStore: base.NewGormStore[*Todo](db, "todos"),
	}
}
