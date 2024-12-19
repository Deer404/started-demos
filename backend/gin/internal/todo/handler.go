package todo

import (
	"Demo/internal/base"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	*base.BaseHandler[*Todo]
}

func NewHandler(store TodoStore) *Handler {
	return &Handler{
		BaseHandler: base.NewBaseHandler[*Todo](store),
	}
}

func (h *Handler) Register(r *gin.RouterGroup) {
	todos := r.Group("/todos")
	h.BaseHandler.RegisterRoutes(todos, "")
}
