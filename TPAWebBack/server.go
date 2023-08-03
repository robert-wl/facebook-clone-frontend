package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	cors2 "github.com/rs/cors"
	"github.com/yahkerobertkertasnya/TPAWebBack/database"
	"github.com/yahkerobertkertasnya/TPAWebBack/graph"
	"github.com/yahkerobertkertasnya/TPAWebBack/graph/resolver"
	"github.com/yahkerobertkertasnya/TPAWebBack/helper"
	"github.com/yahkerobertkertasnya/TPAWebBack/middleware"
	"log"
	"net/http"
)

const defaultPort = "8080"

func main() {
	port := helper.GetDotENVVariable("PORT")
	if port == "" {
		port = defaultPort
	}

	router := chi.NewRouter()

	cors := cors2.New(cors2.Options{
		AllowedOrigins:   []string{"http://localhost", "http://localhost:5173", "http://localhost:8080", "chrome-extension://flnheeellpciglgpaodhkhmapeljopja"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
		Debug:            true,
	})

	router.Use(cors.Handler)
	router.Use(middleware.AuthMiddleware)

	c := graph.Config{Resolvers: &resolver.Resolver{
		DB: database.GetInstance(),
	}}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(c))

	database.MigrateDatabase()

	//helper.SendVerification("robert.wiliam12345@gmail.com", "12345")

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
