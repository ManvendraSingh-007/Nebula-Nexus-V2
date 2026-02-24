package database

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"os"
)

var Pool *pgxpool.Pool

func Connect() {
	databaseUrl := os.Getenv("DATABASE_URL")
	if databaseUrl == "" {
		databaseUrl = "postgres://postgres:chouhanmonty@localhost:5432/Nebula"
	}
	var err error
	Pool, err = pgxpool.New(context.Background(), databaseUrl)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	err = Pool.Ping(context.Background())
	if err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("Connected to PostgreSQL!")
}
