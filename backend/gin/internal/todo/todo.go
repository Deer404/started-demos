package todo

import (
	"Demo/internal/base"
	"time"
)

// Todo 表示一个待办事项
type Todo struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Store 定义数据存储接口
type Store interface {
	base.BaseStore[*Todo]
}

func (t Todo) GetID() uint {
	return t.ID
}
