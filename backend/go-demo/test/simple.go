package test

import "fmt"

func add(x int, y int) int {
	return x + y
}

func greet() {
	fmt.Println("Hello!")
}

func divide(x int, y int) (int, error) {
	if y == 0 {
		return 0, fmt.Errorf("cannot divide by zero") // 避免除以零
	}
	return x / y, nil
}

func TestDivide() {
	result, err := divide(10, 2)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Result:", result)
	}

	result, err = divide(10, 0)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("Result:", result)
	}
}
