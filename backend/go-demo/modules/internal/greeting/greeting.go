package greeting

import "fmt"

func Hello(name string) string {
	return fmt.Sprintf("你好, %s", name)
}
