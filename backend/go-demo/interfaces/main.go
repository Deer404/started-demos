package main

import (
	"errors"
	"fmt"
)

type Notifier interface {
	Notify(message string) error
}

type EmailNotifier struct {
	Address string
}

func (e EmailNotifier) Notify(message string) error {
	if e.Address == "" {
		return errors.New("missing email address")
	}
	fmt.Printf("send email to %s: %s\n", e.Address, message)
	return nil
}

type MemoryNotifier struct {
	logs []string
}

func (m *MemoryNotifier) Notify(message string) error {
	m.logs = append(m.logs, message)
	fmt.Println("memory log", len(m.logs), "=>", message)
	return nil
}

func broadcast(subject string, ns ...Notifier) {
	for _, notifier := range ns {
		if err := notifier.Notify(subject); err != nil {
			fmt.Println("notify failed:", err)
		}
	}
}

func describeNotifier(n Notifier) {
	switch v := n.(type) {
	case EmailNotifier:
		fmt.Println("email notifier for", v.Address)
	case *MemoryNotifier:
		fmt.Println("in-memory notifier with", len(v.logs), "entries")
	default:
		fmt.Printf("unknown notifier %T\n", v)
	}
}

func main() {
	memory := &MemoryNotifier{}
	email := EmailNotifier{Address: "dev@example.com"}

	broadcast("build finished", email, memory)

	describeNotifier(email)
	describeNotifier(memory)
}
