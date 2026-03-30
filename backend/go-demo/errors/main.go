package main

import (
	"errors"
	"fmt"
	"strings"
)

var ErrValidation = errors.New("validation failed")

type FieldError struct {
	Field string
	Msg   string
}

func (e FieldError) Error() string {
	return fmt.Sprintf("%s: %s", e.Field, e.Msg)
}

func ValidateUser(name, email string) error {
	var fieldErrs []error
	if len(name) < 2 {
		fieldErrs = append(fieldErrs, FieldError{Field: "name", Msg: "太短"})
	}
	if !strings.Contains(email, "@") {
		fieldErrs = append(fieldErrs, FieldError{Field: "email", Msg: "格式错误"})
	}
	if len(fieldErrs) > 0 {
		return errors.Join(append(fieldErrs, ErrValidation)...)
	}
	return nil
}

func main() {
	err := ValidateUser("g", "invalid-email")
	if err == nil {
		return
	}

	fmt.Println("validate failed:", err)
	if errors.Is(err, ErrValidation) {
		fmt.Println("=> 捕获到 ErrValidation")
	}

	var fieldErr FieldError
	if errors.As(err, &fieldErr) {
		fmt.Println("第一个字段错误:", fieldErr)
	}

	if unwrapper, ok := err.(interface{ Unwrap() []error }); ok {
		fmt.Println("Join 展开:")
		for _, e := range unwrapper.Unwrap() {
			fmt.Println("-", e)
		}
	}
}
