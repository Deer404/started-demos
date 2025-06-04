package test

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "started  job", j)
		time.Sleep(time.Second)
		fmt.Println("worker", id, "finished job", j)
		results <- j * 2
	}
}

// StartWorker 启动工作者协程处理任务
func StartWorker() {
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// 启动3个工作者协程
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// 发送任务到任务通道
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	// 收集结果
	for a := 1; a <= numJobs; a++ {
		fmt.Println("result:", <-results)
	}
}
