package controllers

import (
	"fmt"
	"net/http"
	"ostermed/conexaoDB/database"
	"ostermed/conexaoDB/models"
	"ostermed/conexaoDB/utils"
	"ostermed/conexaoDB/vindi"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// GET
func GetUsers(c *gin.Context) {
	var users []models.Cliente
	database.DB.Find(&users)
	c.JSON(http.StatusOK, users)
}
func GetVindiClientes(c *gin.Context) {
	data, err := vindi.ListClient()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"erro": "Erro ao buscar clientes",
		})
		fmt.Println(err)
		return
	}

	c.Data(http.StatusOK, "autorization/json", data)
}
func GetVindiClientByID(c *gin.Context) {
	id := c.Param("id")
	data, err := vindi.GetClientByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "cliente inexistente",
		})
		fmt.Println(err)
		return
	}
	c.Data(http.StatusOK, "authorization/json", data)
}
func GetVindiClientByCpf(c *gin.Context) {
	cpf := c.Param("cpf")
	customer, err := vindi.GetClientByCPF(cpf)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "cliente inexistente",
		})
		fmt.Println(err)
		return
	}
	c.JSON(http.StatusOK, customer)
}
func GetNameVindiClientByCpf(c *gin.Context) {
	cpf := c.Param("cpf")
	customer, err := vindi.GetClientByCPF(cpf)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "cliente inexistente",
		})
		fmt.Println(err)
		return
	}
	c.JSON(http.StatusOK, customer)

}

func GetUserByID(c *gin.Context) {
	id := c.Param("id")

	var cliente models.Cliente

	if err := database.DB.First(&cliente, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Usuario nao encontrado"})
		return
	}

	c.JSON(http.StatusOK, cliente)
}

func GetCustomerPlanoById(c *gin.Context) {
	idStr := c.Param("id")
	num, _ := strconv.ParseInt(idStr, 10, 32)

	id := int32(num)

	plano, err := vindi.GetPlansByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Cliente inexistente",
		})
		fmt.Println(err)
		return
	}
	c.JSON(http.StatusOK, plano)
}

//POST

func CreateUser(c *gin.Context) {
	var cliente models.Cliente

	if err := c.ShouldBindJSON(&cliente); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	hash, err := utils.GerarHashSenha(cliente.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao rodar a funcao hash"})
		return
	}

	cliente.Password = hash
	if err := database.DB.Create(&cliente).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao salvar o cliente"})
	}

	c.JSON(http.StatusOK, gin.H{"message": "usuario cadastrado com sucesso"})
}

// PUT
func UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var cliente models.Cliente

	if err := database.DB.First(&cliente, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cliente nao encontrado"})
		return
	}

	var dadosAtualizados models.Cliente

	if err := c.ShouldBindJSON(&dadosAtualizados); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cliente.Nome = dadosAtualizados.Nome
	cliente.Email = dadosAtualizados.Email
	cliente.Plano = dadosAtualizados.Plano
	cliente.Fatura = dadosAtualizados.Fatura
	cliente.Cpf = dadosAtualizados.Cpf
	cliente.Meiopagamento = dadosAtualizados.Meiopagamento
	cliente.Filiacao = dadosAtualizados.Filiacao
	cliente.Dependentes = dadosAtualizados.Dependentes
	cliente.Telefone = dadosAtualizados.Telefone
	cliente.Endereco = dadosAtualizados.Endereco
	cliente.Password = dadosAtualizados.Password

	if err := database.DB.Save(&cliente).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar cliente"})
		return
	}

	c.JSON(http.StatusOK, cliente)
}

// DELETE
func DeleteUser(c *gin.Context) {
	idParam := c.Param("id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID invalido"})
		return
	}

	var cliente models.Cliente

	if err := database.DB.First(&cliente, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": " cliente nao encontrado"})
		return
	}

	if err := database.DB.Delete(&cliente).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao deletar o usuario"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Usuario deletado com sucesso"})

}

//funcionalidades

func GetCarteirinhaByCpf(c *gin.Context) {
	cpf := c.Param("cpf")
	client, err := vindi.GetClientByCPF(cpf)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Cliente Nao encontrado"})
		fmt.Println(err)
		return
	}

	customer := client[0]
	ID := customer.ID
	name := customer.Nome
	customerPlano, err := vindi.GetPlansByID(ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "assinatura nao encontrada"})
		return
	}
	var Plano string

	pontInad, err := vindi.GetInadById(ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "status nao encontrado"})
		return
	}
	var inadVer bool
	inadVer = *pontInad

	if inadVer {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "o clinete se encontra inadimplente"})
		return
	}

	if strings.Contains(strings.ToUpper(customerPlano), strings.ToUpper("ANGEL")) {
		Plano = "Angel"
	} else if strings.Contains(strings.ToUpper(customerPlano), strings.ToUpper("GUARDIAN")) {
		Plano = "Guardian"
	} else if strings.Contains(strings.ToUpper(customerPlano), strings.ToUpper("PREMIUM")) {
		Plano = "Premium"
	} else if strings.Contains(strings.ToUpper(customerPlano), strings.ToUpper("DIAMOND")) {
		Plano = "Diamond"
	} else if strings.Contains(strings.ToUpper(customerPlano), strings.ToUpper("VIDA PLENA")) {
		Plano = "Vida Plena"
	}

	utils.CreateCarteirinha(name, cpf, Plano)
}

/*
	func GetClienteBillById(c *gin.Context) {
		id := c.Param("id")
		client, err := vindi.GetClienteBillById(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao encontrar a bill"})
			fmt.Print(err)
			return
		}
		c.JSON(http.StatusOK, client)
	}
*/
/*func GetVindiClientDepsByCpf(c *gin.Context) {
	cpf := c.Param("cpf")
	result := vindi.GetVindiDepsByCpf(cpf)
	c.JSON(http.StatusOK, result)
}*/
