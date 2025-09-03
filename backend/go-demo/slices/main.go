package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
	"slices"
)

var digitRegexp = regexp.MustCompile("[0-9]+")

// 例子： 一个函数，用于从文件中复制数字 返回一个新的切片，防止内存泄漏
func CopyDigits(filename string) []byte {
	b, _ := ioutil.ReadFile(filename)
	b = digitRegexp.Find(b)
	c := make([]byte, len(b))
	copy(c, b)
	return c
}

// 优化版，更短一点用append 实现的
func CopyDigitsAlt(filename string) []byte {
	b, _ := ioutil.ReadFile(filename)
	b = digitRegexp.Find(b)
	return append([]byte{}, b...)
}

// 优化版 处理了读取错误，并且使用go 1.16+推荐的os.ReadFile
func CopyDigitsCopy(filename string) ([]byte, error) {
	b, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return append([]byte(nil), digitRegexp.Find(b)...), nil
}

func main() {

	// 这样定义的切片是 nil
	// nil 切片的长度和容量都是 0
	var s []int
	fmt.Println("uninit: ", s, s == nil, len(s) == 0)

	// 使用 make 函数创建一个切片
	// 第一个参数是切片元素类型，第二个参数是长度，第三个参数是容量
	// 如果不指定容量，容量会等于长度
	// 这样定义的切片是非 nil 的，值为类型的零值
	// 例如 int 类型的零值是 0
	s = make([]int, 3)
	fmt.Println("emp:", s, "len:", len(s), "cap:", cap(s), "s default value:", s)

	for i := range len(s) {
		fmt.Println("slice default value: ", s[i])
	}

	var b [3]int

	for j := range b {
		fmt.Println("array default value: ", b[j])
	}

	s[0] = 1
	s[1] = 2
	s[2] = 3
	fmt.Println("set:", s)
	fmt.Println("get:", s[2])

	fmt.Println("len:", len(s))

	s = append(s, 4)
	s = append(s, 5, 6)
	fmt.Println("apd:", s)

	c := make([]int, len(s))
	copy(c, s)
	fmt.Println("cpy:", c)

	l := s[2:5]
	fmt.Println("sl1:", l)

	l = s[:5]
	fmt.Println("sl2:", l)

	l = s[2:]
	fmt.Println("sl3:", l)

	t := []string{"g", "h", "i"}
	fmt.Println("dcl:", t)

	t2 := []string{"g", "h", "i"}
	if slices.Equal(t, t2) {
		fmt.Println("t == t2")
	}

	twoD := make([][]int, 3)
	for i := range 3 {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := range innerLen {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)
}
