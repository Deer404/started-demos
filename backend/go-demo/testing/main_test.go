package main

import (
	"fmt"
	"os"
	"testing"
)

func TestAdd(t *testing.T) {
	t.Parallel()
	if got := Add(2, 3); got != 5 {
		t.Fatalf("Add(2,3)=%d want 5", got)
	}
}

func TestSlowFib(t *testing.T) {
	cases := []struct {
		name string
		n    int
		want int
	}{
		{"zero", 0, 0},
		{"one", 1, 1},
		{"seven", 7, 13},
	}
	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			if got := SlowFib(tc.n); got != tc.want {
				t.Fatalf("SlowFib(%d)=%d want %d", tc.n, got, tc.want)
			}
		})
	}
}

func TestEnvDependentAdd(t *testing.T) {
	t.Setenv("ADD_MODE", "safe")
	t.Cleanup(func() {
		fmt.Println("测试清理，当前 ADD_MODE =", os.Getenv("ADD_MODE"))
	})
	result := Add(10, 5)
	if os.Getenv("ADD_MODE") == "" || result != 15 {
		t.Fatal("Add 在测试模式下表现异常")
	}
}

func BenchmarkSlowFib(b *testing.B) {
	for i := 0; i < b.N; i++ {
		SlowFib(15)
	}
}

func ExampleAdd() {
	fmt.Println(Add(1, 2))
	// Output: 3
}
