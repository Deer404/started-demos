package todo

import "time"

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
	Create(todo *Todo) error
	Get(id uint) (*Todo, error)
	List() ([]*Todo, error)
	Update(todo *Todo) error
	Delete(id uint) error
}
