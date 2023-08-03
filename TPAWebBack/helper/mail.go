package helper

import "gopkg.in/gomail.v2"

func SendVerification(email string, id string) (bool, error) {
	m := gomail.NewMessage()
	m.SetHeader("From", "facebook@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Account Verification")
	m.SetBody("text/html", "Click this link to verify your account: <a href='http://localhost:3000/"+id+"'>Activate</a>")

	d := gomail.NewDialer("smtp.gmail.com", 587, "user", "password")

	if err := d.DialAndSend(m); err != nil {
		panic(err)
		return false, err
	}

	return true, nil
}
