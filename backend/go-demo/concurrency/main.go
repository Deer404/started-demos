package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

func main() {
	// 无缓冲 channel：jobs 分发任务 ID, results 收集 worker 输出
	jobs := make(chan int)
	results := make(chan string)
	var wg sync.WaitGroup
	var processed atomic.Uint64

	worker := func(id int) {
		defer wg.Done()
		for job := range jobs {
			// 模拟耗时并发任务，同时用原子计数器避免数据竞争
			time.Sleep(50 * time.Millisecond)
			count := processed.Add(1)
			results <- fmt.Sprintf("worker %d 完成任务 %d (第 %d 个完成)", id, job, count)
		}
	}

	for id := 1; id <= 3; id++ {
		wg.Add(1)
		go worker(id)
	}

	go func() {
		// 投递 5 个任务并关闭 jobs，通知 worker 无新任务
		for job := 1; job <= 5; job++ {
			jobs <- job
		}
		close(jobs)
	}()

	go func() {
		// 所有 worker 完成后关闭 results，这样 range 可以退出
		wg.Wait()
		close(results)
	}()

	// 主 goroutine 读取并打印每条结果
	for res := range results {
		fmt.Println(res)
	}
	fmt.Println("总计完成:", processed.Load())
}
