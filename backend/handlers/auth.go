package handlers

import (
	"github.com/gofiber/fiber/v3"
)

func Login(c fiber.Ctx) error {
	return c.SendString("hi there dichole ")
}
