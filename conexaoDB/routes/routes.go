package routes

import (
	"ostermed/conexaoDB/controllers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Acess-Control-Allow-Origin", "*")
		c.Next()
	})

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	userRoutes := r.Group("/")
	{
		userRoutes.GET("/", controllers.GetUsers)

		userRoutes.DELETE("/:id", controllers.DeleteUser)
	}

	r.GET("/clientesVindi", controllers.GetVindiClientes)

	r.POST("/cadastro", controllers.CreateUser)
	r.PUT("/update/:id", controllers.UpdateUser)

	r.GET("/getUsuariosByID/:id", controllers.GetUserByID)
	r.GET("/getVindiClientByID/:id", controllers.GetVindiClientByID) //35794958
	r.GET("/getVindiClientByCpf/:cpf", controllers.GetVindiClientByCpf)
	r.GET("/getNameVindiClientByCpf/:cpf", controllers.GetNameVindiClientByCpf)
	r.GET("/getClientPlanoById/:id", controllers.GetCustomerPlanoById)
	r.GET("/getCarteirinhaByCpf/:cpf", controllers.GetCarteirinhaByCpf)
	//r.GET("/getVindiClientDepsByCpf/:cpf", controllers.GetVindiClientDepsByCpf)
	//r.GET("/getBillsById/:id", controllers.GetClienteBillById)
	r.GET("/getDepsByCpf/:cpf", controllers.GetVindiClientDepsByCpf)
	return r
}
