package model

import (
	"time"
)

type NewUser struct {
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Dob       time.Time `json:"dob"`
	Gender    string    `json:"gender"`
}

type User struct {
	ID         string    `json:"id"`
	FirstName  string    `json:"firstName"`
	LastName   string    `json:"lastName"`
	Username   string    `json:"username"`
	Email      string    `json:"email" gorm:"unique"`
	Password   string    `json:"password"`
	Dob        time.Time `json:"dob"`
	Gender     string    `json:"gender"`
	Active     bool      `json:"active"`
	MiscId     *string   `json:"miscId,omitempty"`
	Profile    *string   `json:"profile,omitempty"`
	Background *string   `json:"background,omitempty"`
}
