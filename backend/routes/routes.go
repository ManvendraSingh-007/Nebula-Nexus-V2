package routes

import (
	"backend/handlers"
	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {
	auth := app.Group("/auth")

	// Auth routes
	auth.Get("/login", handlers.Login)
}
