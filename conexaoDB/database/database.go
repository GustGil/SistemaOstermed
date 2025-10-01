package database

import (
	"log"
	"ostermed/conexaoDB/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=localhost user=postgres password=#%28Kg70 dbname=Ostermed port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("erro ao conectar ao banco de dados: ", err)
	}

	DB = database

	DB.AutoMigrate(&models.ClinicaTelefones{})
}
