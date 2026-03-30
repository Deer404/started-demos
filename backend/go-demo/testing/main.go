package main

import "fmt"

func Add(a, b int) int {
	return a + b
}

func SlowFib(n int) int {
	if n < 2 {
		return n
	}
	return SlowFib(n-1) + SlowFib(n-2)
}

func main() {
	fmt.Println("Add(2, 3) =", Add(2, 3))
	fmt.Println("SlowFib(8) =", SlowFib(8))
}
