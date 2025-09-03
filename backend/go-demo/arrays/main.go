package main

import "fmt"

func main() {

	var a [5]int
	fmt.Println("emp:", a)

	a[4] = 100
	fmt.Println("set:", a)
	fmt.Println("get:", a[4])

	fmt.Println("len:", len(a))

	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	b = [...]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	b = [...]int{100, 3: 400, 500}
	fmt.Println("idx:", b)

	// 默认赋值是复制数组

	c := b
	c[0] = 200
	fmt.Println("c:", c)
	fmt.Println("b:", b)

	// 可以通过切片来引用数组 [1:4] 表示从索引1到索引4（不包含4）左闭右开区间
	d := b[1:4]
	fmt.Println("d", d)
	// 修改切片会影响原数组
	d[0] = 300
	fmt.Println("d:", d)
	fmt.Println("b:", b)

	// 通过指针 引用数组
	e := &b
	e[0] = 500

	fmt.Println("e:", e)
	fmt.Println("b:", b)

	var twoD [2][3]int
	for i := range 2 {
		for j := range 3 {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)

	twoD = [2][3]int{
		{1, 2, 3},
		{1, 2, 3},
	}
	fmt.Println("2d: ", twoD)
}
