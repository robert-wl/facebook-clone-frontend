package middleware

import (
	"context"
	"fmt"
	"net/http"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")

		fmt.Println(token)
		if token != "" {
			ctx := context.WithValue(r.Context(), "token", token)
			r = r.WithContext(ctx)
		}

		next.ServeHTTP(w, r)
	})
}
