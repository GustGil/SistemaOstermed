package models

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"strings"
)

type StringArray []string

func (a *StringArray) UnmarshalJSON(data []byte) error {
	var tmp []string
	if err := json.Unmarshal(data, &tmp); err != nil {
		return err
	}
	*a = tmp
	return nil
}

func (a StringArray) Value() (driver.Value, error) {
	if a == nil {
		return "{}", nil
	}
	escaped := make([]string, len(a))
	for i, v := range a {
		escaped[i] = fmt.Sprintf("\"%s\"", strings.ReplaceAll(v, "\"", "\\\""))
	}
	return fmt.Sprintf("{%s}", strings.Join(escaped, ",")), nil
}

func (a *StringArray) Scan(src interface{}) error {
	var str string

	switch v := src.(type) {
	case string:
		str = v
	case []byte:
		str = string(v)
	default:
		return fmt.Errorf("StringArray.Scan: unsupported type %T", src)
	}

	str = strings.Trim(str, "{}")

	if str == "" {
		*a = []string{}
		return nil
	}

	parts := strings.Split(str, ",")
	for i, part := range parts {
		parts[i] = strings.Trim(part, `"`)
	}

	*a = parts
	return nil
}

type Cliente struct {
	ID            int         `json:"id"`
	Nome          string      `json:"nome"`
	Email         string      `json:"email"`
	Plano         string      `json:"plano"`
	Fatura        uint        `json:"fatura"`
	Cpf           int64       `json:"cpf"`
	Meiopagamento string      `json:"meiopagamento"`
	Filiacao      int64       `json:"filiacao"`
	Dependentes   StringArray `json:"dependentes" gorm:"type:text[]"`
	Telefone      string      `json:"telefone"`
	Endereco      string      `json:"endereco"`
	Password      string      `json:"password"`
}

type Adress struct {
	Street            string `json:"street"`
	Number            string `json:"number"`
	AdditionalDetails string `json:"additional_details"`
	Zipcode           string `json:"zipcode"`
	Neighborhood      string `json:"neighborhood"`
	City              string `json:"city"`
	State             string `json:"state"`
	Country           string `json:"country"`
}

type Phone struct {
	Phone_type string `json:"phone_type"`
	Number     string `json:"number"`
	Extension  string `json:"extension"`
}

type ClientVindi struct {
	ID         int32   `json:"id"`
	Nome       string  `json:"name"`
	Email      string  `json:"email"`
	Cpf        string  `json:"registry_code"`
	Notes      string  `json:"notes"`
	Status     string  `json:"status"`
	Created_at string  `json:"created_at"`
	Updated_at string  `json:"update_at"`
	Address    Adress  `json:"address"`
	Phones     []Phone `json:"phones"`
}

type ClientVindiToJson struct { // usar para mudar o models puxado da vindi para json e conseguir mostrar (temporario provavelmente)
	Client []ClientVindi `json:"customers"`
}

type SubscriptionResponse struct {
	Subscriptions []struct {
		ID   int32 `json:"id"`
		Plan struct {
			ID   int32  `json:"id"`
			Name string `json:"name"`
		} `json:"plan"`
		Status   string `json:"status"`
		Customer struct {
			ID   int32  `json:"id"`
			Name string `json:"name"`
		} `json:"customer"`
	} `json:"subscriptions"`
}
