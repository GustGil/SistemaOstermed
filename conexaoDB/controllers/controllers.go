package controllers

import (
	"fmt"
	"net/http"
	"ostermed/conexaoDB/database"
	"ostermed/conexaoDB/models"
	"ostermed/conexaoDB/utils"
	"ostermed/conexaoDB/vindi"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GET
func GetUsers(c *gin.Context) {
	var users []models.Cliente
	database.DB.Find(&users)
	c.JSON(http.StatusOK, users)
}

func GetClinica(c *gin.Context) {
	var clinicas []models.Clinicas

	err := database.DB.
		Preload("Servico").
		Preload("Endereco").
		Preload("Telefone").
		Find(&clinicas).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar clínicas"})
		return
	}

	c.JSON(http.StatusOK, clinicas)
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

func CreateClinica(c *gin.Context) {
	var clinica models.Clinicas
	if err := c.ShouldBindJSON(&clinica); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	if err := database.DB.Create(&clinica).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao salvar a clinica no db"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "clinica salva com sucesso"})
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

	dependentes, err := vindi.GetVindiDepsByCpf(cpf)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao buscar os dependentes"})
		return
	}
	bill, err := vindi.GetClienteBillById(ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "erro ao buscar a fatura"})
		return
	}
	t := bill.Subscription[len(bill.Subscription)-1].CurrentPeriod.EndAt

	validade := utils.IsoToString(t)

	imgBytes, err := utils.CreateCarteirinha(name, cpf, customerPlano, dependentes, validade)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": "erro ao gerar a carteirinha"})
	}
	c.Header("Content-Type", "image/png")
	c.Status(http.StatusOK)
	c.Data(http.StatusOK, "image/png", imgBytes)
}

func GetVindiClientDepsByCpf(c *gin.Context) {
	cpf := c.Param("cpf")
	result, err := vindi.GetVindiDepsByCpf(cpf)
	if err != nil {
		fmt.Print(err)
		return
	}
	c.JSON(http.StatusOK, result)
}

/*func GetClientFaturaById(c *gin.Context) {
	id := c.Param("id")
	result, err := vindi.GetClienteBillById(id)
	if err != nil {
		fmt.Print(err)
		return
	}

	//endAt := result.Subscription[i-1].CurrentPeriod.StartAt

	c.JSON(http.StatusOK, result.Subscription[len(result.Subscription)-1])
}*/
