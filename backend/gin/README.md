# 创建一个todo
curl -X POST http://localhost:8080/api/v1/todos/ \
  -H "Content-Type: application/json" \
  -d '{"title": "买咖啡", "completed": false}'

# 获取所有todos
curl http://localhost:8080/api/v1/todos/

# 获取单个todo
curl http://localhost:8080/api/v1/todos/1

# 更新todo
curl -X PUT http://localhost:8080/api/v1/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "买咖啡豆", "completed": true}'

# 部分更新todo
curl -X PATCH http://localhost:8080/api/v1/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 删除todo
curl -X DELETE http://localhost:8080/api/v1/todos/1