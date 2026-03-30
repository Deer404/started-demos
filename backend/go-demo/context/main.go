package main

import (
	"context"
	"fmt"
	"time"
)

func fetch(ctx context.Context, id string) (string, error) {
	delay := time.Duration(120) * time.Millisecond
	select {
	case <-time.After(delay):
		return fmt.Sprintf("资源 %s 返回成功", id), nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 80*time.Millisecond)
	defer cancel()
	if _, err := fetch(ctx, "slow-service"); err != nil {
		fmt.Println("短超时:", err)
	}

	ctx = context.WithValue(context.Background(), "request-id", "REQ-42")
	longCtx, cancelLong := context.WithTimeout(ctx, 200*time.Millisecond)
	defer cancelLong()

	if result, err := fetch(longCtx, "slow-service"); err == nil {
		fmt.Println("长超时:", result)
		fmt.Println("context value:", longCtx.Value("request-id"))
	}
}
