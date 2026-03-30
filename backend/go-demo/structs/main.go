package main

import "fmt"

type Address struct {
	City string
	Zip  int
}

type User struct {
	FirstName string
	LastName  string
	Email     string
	Address   Address
}

func NewUser(first, last, email string, addr Address) *User {
	return &User{
		FirstName: first,
		LastName:  last,
		Email:     email,
		Address:   addr,
	}
}

func (u User) FullName() string {
	return fmt.Sprintf("%s %s", u.FirstName, u.LastName)
}

func (u *User) Move(addr Address) {
	u.Address = addr
}

type Admin struct {
	User
	Permissions []string
}

func (a Admin) Describe() string {
	return fmt.Sprintf("%s can %v", a.FullName(), a.Permissions)
}

func main() {
	home := Address{City: "Shanghai", Zip: 200000}
	user := NewUser("Go", "Learner", "hi@example.com", home)
	fmt.Println("full name:", user.FullName())
	fmt.Println("email:", user.Email)
	fmt.Println("city:", user.Address.City)

	admin := Admin{
		User:        *user,
		Permissions: []string{"deploy", "ban-user"},
	}
	fmt.Println(admin.Describe())

	admin.Move(Address{City: "Hangzhou", Zip: 310000})
	fmt.Println("moved to:", admin.Address)
}
