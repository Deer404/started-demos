# 摸鱼时候写着玩的

全部内容来自 [Go by Example](https://gobyexample.com/)，并额外补齐了常用工程化知识、Go 1.18+ 的新语法示例以及 Go 1.21/1.22 之后常见的标准库。

RoadMap：
  - 函数定义和调用（`function/`、`values/`、`variables/`）
  - 结构体(struct)和方法（`structs/`）
  - 指针操作（`structs/`、`arrays/`）
  - 接口(interface) 与多态（`interfaces/`、`errors/`）

  核心概念：
  - 错误处理、`errors.Join`、`errors.Is/As`（`errors/`）
  - goroutine、channel、`sync.WaitGroup`、`sync/atomic`（`concurrency/`）
  - `context` 超时/取消、`time` 组合（`context/`）
  - 包管理、模块化与 `debug.ReadBuildInfo`（`modules/`）

  实用技能：
  - 单元测试 + 基准（`testing/`，演示 `t.Parallel`、`t.Setenv`、`Benchmark` 和 `Example`）
  - Go 1.18 泛型与 `cmp`/`slices` 辅助包（`generics/`）
  - 结构化日志 `log/slog`（`slog/`）
  - 其他基础：数组、切片、map、switch、控制流等（已有目录）

  项目实践：
  - 构建一个简单的 REST API（可基于 `context/` + `errors/` 的模式拓展）
  - 命令行工具开发（关注 `modules/` 来管理依赖）
  - 微服务基础（结合 `concurrency/`、`slog/`、`context/`）

Map 学习路线：
  1. 基础语法与创建：阅读 `map/` 下的示例，熟悉字面量定义、`make` 初始化以及键值访问。
  2. 更新与删除：掌握存在性判断（`value, ok := m[key]`）和 `delete` 操作，并结合 `clear` 重置 map。
  3. 迭代与排序：在 `map/` + `slices/` 中练习 `for range` 遍历、键收集排序，理解 Go 迭代无序的语义。
  4. 并发安全：结合 `concurrency/` 学习 `sync.Mutex` 或 `sync.Map` 保护共享 map，明白普通 map 不是并发安全的。
  5. 泛型 + map：在 `generics/` 中尝试使用 `maps.Clone`、`maps.Equal` 等辅助函数，搭配约束实现类型安全的 map 操作。
  6. 工程应用：把 map 用在 `errors/`（字段校验结果）、`context/`（元信息存储）、`slog/`（结构化字段）等目录示例，体会一等公民容器在实际项目中的用法。

## 新增示例目录速览
- `structs/`：结构体、构造函数、方法接收者与嵌入式组合。
- `interfaces/`：接口定义、实现、类型断言与多通知器组合。
- `errors/`：`errors.Join` 组合错误、`errors.Is/As` 捕获以及自定义字段错误。
- `concurrency/`：goroutine 池、`sync.WaitGroup`、`atomic.Uint64` 统计。
- `context/`：`context.WithTimeout`/`WithValue` 配合超时逻辑。
- `generics/`：自定义约束、`cmp.Ordered`、`slices.Sort/BinarySearch`。
- `testing/`：`t.Parallel`、`t.Setenv`、`t.Cleanup`、`Benchmark`、`Example`。
- `modules/`：独立 `go.mod`、`internal/` 包、`debug.ReadBuildInfo` 查看模块元数据。
- `slog/`：Text/JSON Handler、自定义字段、结构化日志链。

## 新语法与工具链提示
- Go 1.21 的新 `for range` 语义修复已经在 `for/` 中使用 `range N` 的写法，注意与旧版本的差异。
- `clear` 内建函数、`maps`/`slices` 泛型包在 `map/`、`slices/`、`generics/` 中都有实战。
- 关注 `go work`（多模块协作）以及 `go vulncheck`（依赖漏洞检测），本仓库的 `modules/` 可作为扩展到多模块工作区的起点。

## 后续可以继续补充的练习
- 文件 I/O、JSON、HTTP、数据库等（可仿照新增目录继续拓展）。
- REST API、CLI、微服务样板工程，建议结合 `errors/` + `context/` + `slog/` 的模式直接落地。
