package main

import (
	"cmp"
	"fmt"
	"slices"
)

type Number interface {
	~int | ~float64
}

func Sum[T Number](vals []T) T {
	var total T
	for _, v := range vals {
		total += v
	}
	return total
}

func Filter[T any](vals []T, keep func(T) bool) []T {
	var result []T
	for _, v := range vals {
		if keep(v) {
			result = append(result, v)
		}
	}
	return result
}

func Max[T cmp.Ordered](vals ...T) T {
	if len(vals) == 0 {
		panic("Max 需要至少一个值")
	}
	max := vals[0]
	for _, v := range vals[1:] {
		if v > max {
			max = v
		}
	}
	return max
}

func main() {
	ints := []int{1, 2, 3, 4}
	floats := []float64{1.2, 3.4, 5.6}
	fmt.Println("sum ints:", Sum(ints))
	fmt.Println("sum floats:", Sum(floats))

	even := Filter(ints, func(v int) bool { return v%2 == 0 })
	fmt.Println("even:", even)

	fmt.Println("max string:", Max("go", "rust", "c"))

	names := []string{"zeta", "beta", "alpha"}
	slices.Sort(names)
	fmt.Println("sorted:", names)
	if idx, found := slices.BinarySearch(names, "go"); found {
		fmt.Println("found go at", idx)
	} else {
		fmt.Println("go 不在切片中")
	}
}
