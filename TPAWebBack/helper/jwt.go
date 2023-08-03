package helper

import (
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

var defaultKey = "secret"

func CreateJWT(userID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.RegisteredClaims{
			Issuer:    "TPAWebBack",
			Subject:   userID,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour)),
		})

	key := GetDotENVVariable("JWT_KEY")

	if key == "" {
		key = defaultKey
	}

	jwtString, err := token.SignedString([]byte(key))

	if err != nil {
		return "", err
	}

	return jwtString, nil
}

func ParseJWT(jwtToken string) (string, error) {

	key := GetDotENVVariable("JWT_KEY")

	if key == "" {
		key = defaultKey
	}

	token, err := jwt.ParseWithClaims(jwtToken, &jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(*jwt.RegisteredClaims); ok && token.Valid {
		return claims.Subject, nil
	} else {
		return "", fmt.Errorf("Invalid Token")
	}

}
