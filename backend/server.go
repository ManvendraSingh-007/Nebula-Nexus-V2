package main

import (
	"backend/database"
	"backend/routes"
	"github.com/gofiber/fiber/v3"
	"log"
)

func main() {
	database.Connect()
	defer database.Pool.Close()

	app := fiber.New()

	routes.Setup(app)
	log.Fatal(app.Listen(":3000"))
}
