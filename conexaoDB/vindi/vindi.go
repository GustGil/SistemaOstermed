package vindi

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"ostermed/conexaoDB/models"
	"ostermed/conexaoDB/utils"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Aviso: não foi possível carregar .env, tentando usar variáveis do sistema.")
	}
}
func ListClient() ([]byte, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("VINDI_API_KEY nao encontrada no arquivo key")
	}

	req, err := http.NewRequest("GET", "https://app.vindi.com.br/api/v1/customers", nil)

	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))

	req.Header.Set("Authorization", "Basic "+encoded)

	fmt.Println("Auth header:", req.Header.Get("Authorization"))
	req.Header.Set("Accept", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("status da API: %d", resp.StatusCode)
	}

	return io.ReadAll(resp.Body)
}

func createVindiUser(data map[string]interface{}) ([]byte, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("ApiKey nao encontrada")
	}

	req, err := http.NewRequest("POST", "https://app.vindi.com.br/api/v1/customers", nil)
	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))
	req.Header.Set("Authorization", "Basic "+encoded)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API respondeu com o status: %d", resp.StatusCode)
	}
	return io.ReadAll(resp.Body)
}

func GetClientByID(id string) ([]byte, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("VINDI_API_KEY nao encontrada no arquivo key")
	}

	safeURL := fmt.Sprintf("https://app.vindi.com.br/api/v1/customers/%s", id)

	req, err := http.NewRequest("GET", safeURL, nil)
	if err != nil {
		return nil, fmt.Errorf("erro ao gerar a requisicao")
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))
	req.Header.Set("Authorization", "Basic "+encoded)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API respondeu com o status: %d", resp.StatusCode)
	}
	return io.ReadAll(resp.Body)
}

func GetClientByCPF(cpf string) ([]models.ClientVindi, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("Chave API nao encotrada")
	}

	baseURL := "https://app.vindi.com.br/api/v1/customers"

	params := url.Values{}
	params.Set("query", "registry_code="+cpf)
	fullURL := baseURL + "?" + params.Encode()

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))
	req.Header.Set("Authorization", "Basic "+encoded)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API respondeu com o status: %d", resp.StatusCode)
	}

	var result models.ClientVindiToJson
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return nil, err
	}
	return result.Client, nil

}

func GetPlansByID(idInt int32) (string, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("Chave da API nao encontrada")
	}
	baseURL := "https://app.vindi.com.br/api/v1/subscriptions"
	id := fmt.Sprintf("%d", idInt)

	params := url.Values{}
	params.Set("query", "customer_id="+id)
	fullURL := baseURL + "?" + params.Encode()

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return "", err
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))
	req.Header.Set("Authorization", "Basic "+encoded)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("API respondeu com o status:%d ", resp.StatusCode)
	}
	var result models.SubscriptionResponse

	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return "", err
	}
	if len(result.Subscriptions) == 0 {
		return "", fmt.Errorf("nenhum plano encontrado")
	}

	planName := result.Subscriptions[len(result.Subscriptions)-1].Plan.Name

	var Plano string

	if strings.Contains(strings.ToUpper(planName), strings.ToUpper("ANGEL")) {
		Plano = "Angel"
	} else if strings.Contains(strings.ToUpper(planName), strings.ToUpper("GUARDIAN")) {
		Plano = "Guardian"
	} else if strings.Contains(strings.ToUpper(planName), strings.ToUpper("PREMIUM")) {
		Plano = "Premium"
	} else if strings.Contains(strings.ToUpper(planName), strings.ToUpper("DIAMOND")) {
		Plano = "Diamond"
	} else if strings.Contains(strings.ToUpper(planName), strings.ToUpper("VIDA PLENA")) {
		Plano = "Vida Plena"
	}

	return Plano, err
}

func GetInadById(idInt int32) (*bool, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("Chave da API nao encontrada")
	}
	baseURL := "https://app.vindi.com.br/api/v1/subscriptions"
	id := fmt.Sprintf("%d", idInt)

	params := url.Values{}
	params.Set("query", fmt.Sprintf("customer_id=%s AND overdue_since!=null", id))
	fullURL := baseURL + "?" + params.Encode()

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))
	req.Header.Set("Authorization", "Basic "+encoded)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API respondeu com o status:%d", resp.StatusCode)
	}

	type SubscriptionResponse struct {
		Subscriptions []struct {
			Code   string `json:"code"`
			Status string `json:"status"`
		} `json:"subscriptions"`
	}

	var result SubscriptionResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return nil, err
	}

	if len(result.Subscriptions) > 0 {
		result := true
		return &result, nil
	} else {
		result := false
		return &result, nil
	}

}

func GetClienteBillById(id int32) (*models.SubscriptionResponse2, error) {
	apiKey := os.Getenv("VINDI_API_KEY")
	if apiKey == "" {
		return nil, fmt.Errorf("Chave da API nao encontrada")
	}

	ID := fmt.Sprintf("%d", id)

	baseUrl := "https://app.vindi.com.br/api/v1/subscriptions"
	params := url.Values{}
	params.Set("query", "customer_id="+ID)
	fullUrl := baseUrl + "?" + params.Encode()

	req, err := http.NewRequest("GET", fullUrl, nil)
	if err != nil {
		return nil, err
	}

	encoded := base64.StdEncoding.EncodeToString([]byte(apiKey + ":"))
	req.Header.Set("Authorization", "Basic "+encoded)
	req.Header.Set("Accept", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API respondeu com o status:%d", resp.StatusCode)
	}

	var subs models.SubscriptionResponse2

	err = json.NewDecoder(resp.Body).Decode(&subs)
	if err != nil {
		return nil, err
	}
	return &subs, nil
}

func GetVindiDepsByCpf(cpf string) ([]string, error) {
	client, err := GetClientByCPF(cpf)
	if err != nil {
		return nil, err
	}
	texto := client[0].Notes
	id := client[0].ID

	plan, err := GetPlansByID(id)
	if err != nil {
		return nil, err
	}
	var length int
	switch plan {
	case "Angel":
		length = 3
	case "Premium":
		length = 5
	}
	dependentes := make([]string, length)
	var ponteiro string
	for i := 0; i < length; i++ {
		ponteiro = "#" + strconv.Itoa(i+1)
		dep := utils.SliceSubStringInterval(texto, ponteiro)
		dependentes[i] = dep
	}

	return dependentes, nil
}
