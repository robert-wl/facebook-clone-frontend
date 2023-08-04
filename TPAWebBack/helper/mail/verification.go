package mail

import (
	"github.com/yahkerobertkertasnya/TPAWebBack/helper"
)

var name = helper.GetDotENVVariable("EMAIL_SENDER_NAME")
var address = helper.GetDotENVVariable("EMAIL_SENDER_ADDRESS")
var password = helper.GetDotENVVariable("EMAIL_SENDER_PASSWORD")

func SendVerification(email string, subject string, content string) (bool, error) {

	sender := NewGmailSender(name, address, password)

	to := []string{email}

	if err := sender.SendEmail(subject, content, to, nil, nil); err != nil {
		return false, err
	}

	return true, nil
}
