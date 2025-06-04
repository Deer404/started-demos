package test

import (
	"fmt"  // 格式化输入输出包
	"time" // 时间处理包
)

// worker 工作者函数，每个协程执行的任务处理逻辑
// 参数说明：
// - id: 工作者的唯一标识符
// - jobs: 只读通道，用于接收待处理的任务
// - results: 只写通道，用于发送处理结果
func worker(id int, jobs <-chan int, results chan<- int) {
	// 使用range遍历jobs通道，持续接收任务直到通道关闭
	for j := range jobs {
		// 打印工作者开始处理任务的信息
		fmt.Println("worker", id, "started  job", j)

		// 模拟任务处理时间，暂停1秒
		time.Sleep(time.Second)

		// 打印工作者完成任务的信息
		fmt.Println("worker", id, "finished job", j)

		// 将处理结果（任务值乘以2）发送到results通道
		results <- j * 2
	}
	// 当jobs通道关闭且所有数据被处理完后，worker函数结束
}

// StartWorker 启动工作者协程处理任务
// 这是一个演示工作者池模式的主函数
func StartWorker() {
	// 定义常量：总任务数量
	const numJobs = 5

	// 创建带缓冲的任务通道，缓冲区大小为numJobs
	// 这意味着可以同时存储5个任务而不会阻塞发送方
	jobs := make(chan int, numJobs)

	// 创建带缓冲的结果通道，缓冲区大小为numJobs
	// 用于存储工作者处理完成的结果
	results := make(chan int, numJobs)

	// 启动3个工作者协程
	// 每个协程都会并发地从jobs通道接收任务并处理
	for w := 1; w <= 3; w++ {
		// 使用go关键字启动协程，传入工作者ID和通道
		go worker(w, jobs, results)
	}

	// 向任务通道发送所有任务
	// 这里发送1到5这5个任务
	for j := 1; j <= numJobs; j++ {
		// 将任务j发送到jobs通道
		jobs <- j
	}
	// 关闭任务通道，告诉所有工作者不会再有新任务
	// 这会导致worker函数中的range循环最终结束
	close(jobs)

	// 收集所有处理结果
	// 由于有5个任务，所以需要接收5个结果
	for a := 1; a <= numJobs; a++ {
		// 从results通道接收一个结果并打印
		// 如果通道为空，这个操作会阻塞等待
		fmt.Println("result:", <-results)
	}
	// 函数结束，所有任务处理完成
}
