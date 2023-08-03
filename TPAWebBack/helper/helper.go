package helper

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func GetDotENVVariable(key string) string {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	return os.Getenv(key)
}
