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
	ID                int32  `gorm:"primaryKey" json:"id"`
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

type Clinicas struct {
	ID       int32              `json:"id"`
	Name     string             `json:"name"`
	Servico  []Servicos         `gorm:"foreignKey:ClinicaID" json:"servico"`
	Endereco []ClinicaEndereco  `gorm:"foreignKey:ClinicaID" json:"endereco"`
	Telefone []ClinicaTelefones `gorm:"foreignKey:ClinicaID" json:"telefone"`
}

type Servicos struct {
	ID            int32   `gorm:"primaryKey" json:"id"`
	ClinicaID     int32   `json:"-"`
	NomeMedico    string  `json:"namemedico"`
	Preco         float32 `json:"preco"`
	Especialidade string  `json:"especialidade"`
	Descricao     string  `json:"descricao"`
}
type ClinicaEndereco struct {
	ID                int32  `gorm:"primaryKey" json:"id"`
	ClinicaID         string `json:"-"`
	Street            string `json:"street"`
	Number            string `json:"number"`
	AdditionalDetails string `json:"additional_details"`
	Zipcode           string `json:"zipcode"`
	Neighborhood      string `json:"neighborhood"`
	City              string `json:"city"`
	State             string `json:"state"`
	Country           string `json:"country"`
}

type ClinicaTelefones struct {
	ID         int32  `gorm:"primaryKey" json:"id"`
	ClinicaID  int32  `json:"-"`
	Phone_type string `json:"phone_type"`
	Number     string `json:"number"`
	Extension  string `json:"extension"`
}

/*
type Bill struct {
	ID               int              `json:"id"`
	Code             string           `json:"code"`
	Amount           string           `json:"amount"`
	Installments     int              `json:"installments"`
	Status           string           `json:"status"`
	SeenAt           string           `json:"seen_at"`
	BillingAt        string           `json:"billing_at"`
	DueAt            string           `json:"due_at"`
	URL              string           `json:"url"`
	CreatedAt        string           `json:"created_at"`
	UpdatedAt        string           `json:"updated_at"`
	BillItems        []BillItem       `json:"bill_items"`
	Charges          []Charge         `json:"charges"`
	BillAffiliates   []BillAffiliate  `json:"bill_affiliates"`
	Customer         Customer         `json:"customer"`
	Period           Period           `json:"period"`
	Subscription     Subscription     `json:"subscription"`
	Metadata         map[string]any   `json:"metadata"`
	PaymentProfile   PaymentProfile   `json:"payment_profile"`
	PaymentCondition PaymentCondition `json:"payment_condition"`
}

type BillItem struct {
	ID             int           `json:"id"`
	Amount         string        `json:"amount"`
	Quantity       int           `json:"quantity"`
	PricingRangeID int           `json:"pricing_range_id"`
	Description    string        `json:"description"`
	PricingSchema  PricingSchema `json:"pricing_schema"`
	Product        Product       `json:"product"`
	ProductItem    ProductItem   `json:"product_item"`
	Discount       Discount      `json:"discount"`
}

type PricingSchema struct {
	ID            int32          `json:"id"`
	ShortFormat   string         `json:"short_format"`
	Price         string         `json:"price"`
	MinimumPrice  float64        `json:"minimum_price"`
	SchemaType    string         `json:"schema_type"`
	PricingRanges []PricingRange `json:"pricing_ranges"`
	CreatedAt     string         `json:"created_at"`
}

type PricingRange struct {
	ID            string  `json:"id"`
	StartQuantity int     `json:"start_quantity"`
	EndQuantity   int     `json:"end_quantity"`
	Price         float64 `json:"price"`
	OveragePrice  float64 `json:"overage_price"`
}

type Product struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type ProductItem struct {
	ID      int     `json:"id"`
	Product Product `json:"product"`
}

type Discount struct {
	ID           int     `json:"id"`
	DiscountType string  `json:"discount_type"`
	Percentage   float64 `json:"percentage"`
	Amount       float64 `json:"amount"`
	Quantity     int     `json:"quantity"`
	Cycles       int     `json:"cycles"`
}

type Charge struct {
	ID              int           `json:"id"`
	Amount          string        `json:"amount"`
	Status          string        `json:"status"`
	DueAt           string        `json:"due_at"`
	PaidAt          string        `json:"paid_at"`
	Installments    int           `json:"installments"`
	AttemptCount    int           `json:"attempt_count"`
	NextAttempt     int           `json:"next_attempt"`
	PrintURL        string        `json:"print_url"`
	CreatedAt       string        `json:"created_at"`
	UpdatedAt       string        `json:"updated_at"`
	LastTransaction Transaction   `json:"last_transaction"`
	PaymentMethod   PaymentMethod `json:"payment_method"`
}

type Transaction struct {
	ID                    int            `json:"id"`
	TransactionType       string         `json:"transaction_type"`
	Status                string         `json:"status"`
	Amount                string         `json:"amount"`
	Installments          int            `json:"installments"`
	GatewayMessage        string         `json:"gateway_message"`
	GatewayResponseCode   string         `json:"gateway_response_code"`
	GatewayAuthorization  string         `json:"gateway_authorization"`
	GatewayTransactionID  string         `json:"gateway_transaction_id"`
	GatewayResponseFields map[string]any `json:"gateway_response_fields"`
	FraudDetectorScore    int            `json:"fraud_detector_score"`
	FraudDetectorStatus   string         `json:"fraud_detector_status"`
	FraudDetectorID       string         `json:"fraud_detector_id"`
	CreatedAt             string         `json:"created_at"`
	Gateway               Gateway        `json:"gateway"`
	PaymentProfile        PaymentProfile `json:"payment_profile"`
}

type Gateway struct {
	ID        int    `json:"id"`
	Connector string `json:"connector"`
}

type PaymentProfile struct {
	ID                 int            `json:"id"`
	HolderName         string         `json:"holder_name"`
	RegistryCode       string         `json:"registry_code"`
	BankBranch         string         `json:"bank_branch"`
	BankAccount        string         `json:"bank_account"`
	CardExpiration     string         `json:"card_expiration"`
	AllowAsFallback    bool           `json:"allow_as_fallback"`
	CardNumberFirstSix string         `json:"card_number_first_six"`
	CardNumberLastFour string         `json:"card_number_last_four"`
	RenewedCard        RenewedCard    `json:"renewed_card"`
	CardRenewedAt      string         `json:"card_renewed_at"`
	Token              string         `json:"token"`
	CreatedAt          string         `json:"created_at"`
	PaymentCompany     PaymentCompany `json:"payment_company"`
}

type RenewedCard struct {
	CardNumberLastFour string `json:"card_number_last_four"`
	CardExpiration     string `json:"card_expiration"`
}

type PaymentCompany struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type PaymentMethod struct {
	ID         int    `json:"id"`
	PublicName string `json:"public_name"`
	Name       string `json:"name"`
	Code       string `json:"code"`
	Type       string `json:"type"`
}

type BillAffiliate struct {
	AffiliateID int    `json:"affiliate_id"`
	Amount      string `json:"amount"`
	AmountType  string `json:"amount_type"`
}

type Customer struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Code  string `json:"code"`
}

type Period struct {
	ID        int    `json:"id"`
	BillingAt string `json:"billing_at"`
	Cycle     int    `json:"cycle"`
	StartAt   string `json:"start_at"`
	EndAt     string `json:"end_at"`
	Duration  int    `json:"duration"`
}

type Subscription struct {
	ID       int      `json:"id"`
	Code     string   `json:"code"`
	Plan     Plan     `json:"plan"`
	Customer Customer `json:"customer"`
}

type Plan struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type PaymentCondition struct {
	PenaltyFeeValue           float64                    `json:"penalty_fee_value"`
	PenaltyFeeType            string                     `json:"penalty_fee_type"`
	DailyFeeValue             float64                    `json:"daily_fee_value"`
	DailyFeeType              string                     `json:"daily_fee_type"`
	AfterDueDays              int                        `json:"after_due_days"`
	PaymentConditionDiscounts []PaymentConditionDiscount `json:"payment_condition_discounts"`
}

type PaymentConditionDiscount struct {
	Value         float64 `json:"value"`
	ValueType     string  `json:"value_type"`
	DaysBeforeDue int     `json:"days_before_due"`
}
type BillsResponse struct {
	Bills []Bill `json:"bills"`
}*/

type Subscription struct {
	ID                     int                     `json:"id"`
	Status                 string                  `json:"status"`
	StartAt                string                  `json:"start_at"`
	EndAt                  string                  `json:"end_at"`
	NextBillingAt          string                  `json:"next_billing_at"`
	OverdueSince           string                  `json:"overdue_since"`
	Code                   string                  `json:"code"`
	CancelAt               string                  `json:"cancel_at"`
	Interval               string                  `json:"interval"`
	IntervalCount          int                     `json:"interval_count"`
	BillingTriggerType     string                  `json:"billing_trigger_type"`
	BillingTriggerDay      int                     `json:"billing_trigger_day"`
	BillingCycles          int                     `json:"billing_cycles"`
	Installments           int                     `json:"installments"`
	CreatedAt              string                  `json:"created_at"`
	UpdatedAt              string                  `json:"updated_at"`
	Customer               Customer                `json:"customer"`
	Plan                   Plan                    `json:"plan"`
	ProductItems           []ProductItem           `json:"product_items"`
	PaymentMethod          PaymentMethod           `json:"payment_method"`
	CurrentPeriod          CurrentPeriod           `json:"current_period"`
	Metadata               map[string]interface{}  `json:"metadata"`
	PaymentProfile         PaymentProfile          `json:"payment_profile"`
	InvoiceSplit           bool                    `json:"invoice_split"`
	SubscriptionAffiliates []SubscriptionAffiliate `json:"subscription_affiliates"`
}

type Customer struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Code  string `json:"code"`
}

type Plan struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type ProductItem struct {
	ID            int           `json:"id"`
	Status        string        `json:"status"`
	Uses          int           `json:"uses"`
	Cycles        int           `json:"cycles"`
	Quantity      int           `json:"quantity"`
	CreatedAt     string        `json:"created_at"`
	UpdatedAt     string        `json:"updated_at"`
	Product       Product       `json:"product"`
	PricingSchema PricingSchema `json:"pricing_schema"`
	Discounts     []Discount    `json:"discounts"`
}

type Product struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type PricingSchema struct {
	ID            int32          `json:"id"`
	ShortFormat   string         `json:"short_format"`
	Price         string         `json:"price"`
	MinimumPrice  float64        `json:"minimum_price"`
	SchemaType    string         `json:"schema_type"`
	PricingRanges []PricingRange `json:"pricing_ranges"`
	CreatedAt     string         `json:"created_at"`
}

type PricingRange struct {
	ID            int32   `json:"id"`
	StartQuantity int     `json:"start_quantity"`
	EndQuantity   int     `json:"end_quantity"`
	Price         float64 `json:"price"`
	OveragePrice  float64 `json:"overage_price"`
}

type Discount struct {
	ID           int     `json:"id"`
	DiscountType string  `json:"discount_type"`
	Percentage   float64 `json:"percentage"`
	Amount       float64 `json:"amount"`
	Quantity     int     `json:"quantity"`
	Cycles       int     `json:"cycles"`
}

type PaymentMethod struct {
	ID         int    `json:"id"`
	PublicName string `json:"public_name"`
	Name       string `json:"name"`
	Code       string `json:"code"`
	Type       string `json:"type"`
}

type CurrentPeriod struct {
	ID        int    `json:"id"`
	BillingAt string `json:"billing_at"`
	Cycle     int    `json:"cycle"`
	StartAt   string `json:"start_at"`
	EndAt     string `json:"end_at"`
	Duration  int    `json:"duration"`
}

type PaymentProfile struct {
	ID                 int            `json:"id"`
	HolderName         string         `json:"holder_name"`
	RegistryCode       string         `json:"registry_code"`
	BankBranch         string         `json:"bank_branch"`
	BankAccount        string         `json:"bank_account"`
	CardExpiration     string         `json:"card_expiration"`
	AllowAsFallback    bool           `json:"allow_as_fallback"`
	CardNumberFirstSix string         `json:"card_number_first_six"`
	CardNumberLastFour string         `json:"card_number_last_four"`
	RenewedCard        RenewedCard    `json:"renewed_card"`
	CardRenewedAt      string         `json:"card_renewed_at"`
	Token              string         `json:"token"`
	CreatedAt          string         `json:"created_at"`
	PaymentCompany     PaymentCompany `json:"payment_company"`
}

type RenewedCard struct {
	CardNumberLastFour string `json:"card_number_last_four"`
	CardExpiration     string `json:"card_expiration"`
}

type PaymentCompany struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type SubscriptionAffiliate struct {
	ID          int     `json:"id"`
	AffiliateID int     `json:"affiliate_id"`
	Amount      float64 `json:"amount"`
	AmountType  int     `json:"amount_type"`
	Status      string  `json:"status"`
}

type SubscriptionResponse2 struct {
	Subscription []Subscription `json:"subscriptions"`
}
