package todo

import (
	"Demo/internal/base"
	"time"

	"github.com/google/uuid"
)

// Todo 表示一个待办事项
type Todo struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TodoStore 定义数据存储接口
type TodoStore interface {
	base.BaseStore[*Todo]
}

func (t Todo) GetID() uuid.UUID {
	return t.ID
}
