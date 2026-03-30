package main

import (
	"fmt"
	"runtime/debug"

	"example.com/gomod/internal/greeting"
)

func main() {
	fmt.Println(greeting.Hello("模块化世界"))

	if info, ok := debug.ReadBuildInfo(); ok {
		fmt.Println("当前 go.mod 模块:", info.Main.Path)
	}
}
