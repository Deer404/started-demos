package main

import (
	"fmt"
	"go-demo/test"
)

type Greeter interface {
	Greet() string
}

type EnglishGreeter struct {
	Name string
}

func (g EnglishGreeter) Greet() string {
	return "Hello, " + g.Name + "!"
}

type SpanishGreeter struct {
	Nombre string
}

func (s SpanishGreeter) Greet() string {
	return "Hola, " + s.Nombre + "!"
}

func say() {
	var greeter Greeter
	greeter = EnglishGreeter{Name: "Alice"}
	fmt.Println(greeter.Greet())
	greeter = SpanishGreeter{Nombre: "Bob"}
	fmt.Println(greeter.Greet())
	fmt.Println("Hello, World!")

	fmt.Println("This is a simple example of using interfaces in Go.")

	animals := []Greeter{
		EnglishGreeter{Name: "Charlie"},
		SpanishGreeter{Nombre: "Diana"}}
	for _, animal := range animals {
		fmt.Println(animal.Greet())
	}
}

func main() {
	test.StartWorker()
}
