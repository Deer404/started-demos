package base

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BaseHandler[T BaseModel] struct {
	store BaseStore[T]
}

func NewBaseHandler[T BaseModel](store BaseStore[T]) *BaseHandler[T] {
	return &BaseHandler[T]{store: store}
}

func (bh *BaseHandler[T]) RegisterRoutes(r *gin.RouterGroup, path string) {
	group := r.Group(path)
	{
		group.POST("/", bh.Create)
		group.GET("/", bh.List)
		group.GET("/:id", bh.Get)
		group.PUT("/:id", bh.Update)
		group.DELETE("/:id", bh.Delete)
	}
}

func (bh *BaseHandler[T]) Create(c *gin.Context) {
	var item T
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := bh.store.Create(&item); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, item)
}

func (bh *BaseHandler[T]) Get(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	item, err := bh.store.Get(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "item not found"})
		return
	}

	c.JSON(http.StatusOK, item)
}

func (bh *BaseHandler[T]) List(c *gin.Context) {
	items, err := bh.store.List()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, items)
}

func (bh *BaseHandler[T]) Update(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var item T
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := bh.store.Update(uint(id), &item); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, item)
}

func (bh *BaseHandler[T]) Delete(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	if err := bh.store.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
