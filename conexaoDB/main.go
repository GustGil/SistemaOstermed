package main

import (
	"ostermed/conexaoDB/database"
	"ostermed/conexaoDB/models"
	"ostermed/conexaoDB/routes"
)

func main() {
	database.Connect()

	database.DB.AutoMigrate(&models.Cliente{})

	r := routes.SetupRoutes()
	r.Run(":8000")
}
