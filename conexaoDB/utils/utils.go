package utils

import (
	"bytes"
	"fmt"
	"image"
	"os"
	"path/filepath"

	_ "image/jpeg"
	_ "image/png"
	"strings"

	"github.com/fogleman/gg"

	"golang.org/x/crypto/bcrypt"
)

func GerarHashSenha(senha string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(senha), bcrypt.DefaultCost)
	return string(bytes), err
}

func CreateCarteirinha(nome string, cpf string, plano string, dependentes []string, validade string) ([]byte, error) {
	var baseImagePath string
	var rgb1, rgb2, rgb3 int
	var x float64
	if plano == "Angel" {
		baseImagePath, _ = filepath.Abs("utils/AngelCarteirinha.png") //127, 129, 131
		rgb1 = 127
		rgb2 = 129
		rgb3 = 131
		x = 370
	} else {
		baseImagePath, _ = filepath.Abs("utils/PremiumCarteirinha.png") //254,254,253
		rgb1 = 254
		rgb2 = 254
		rgb3 = 253
		x = 175
	}

	baseFontPath, _ := filepath.Abs("utils/Roboto-Medium.ttf")
	file, err := os.Open(baseImagePath)

	if err != nil {
		return nil, err
	}
	defer file.Close()
	img, _, err := image.Decode(file)
	if err != nil {
		return nil, err
	}

	largura := img.Bounds().Dx()
	altura := img.Bounds().Dy()
	dc := gg.NewContext(largura, altura) //3146 × 1028 px (cada lado tem 1573 de largura)

	err = dc.LoadFontFace(baseFontPath, 40)
	if err != nil {
		return nil, err
	}

	dc.DrawImage(img, 0, 0)
	dc.SetRGB255(rgb1, rgb2, rgb3)
	dc.DrawString(nome, 100, 815)
	dc.DrawString(cpf, 100, 965)
	dc.DrawString(validade, 575, 965)
	for i := 0; i < len(dependentes); i++ {
		dc.DrawString(dependentes[i], 1815, x)
		x = x + 181
	}

	var buf bytes.Buffer
	err = dc.EncodePNG(&buf)
	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

func SliceSubStringInterval(text string, Point string) string {
	inicio := strings.Index(text, Point)
	fim := strings.LastIndex(text, Point)

	if inicio != -1 && fim != -1 && inicio < fim {
		resultado := text[inicio+2 : fim]
		return resultado
	} else {
		fmt.Println("Delimitadores não encontrados")
		return ""
	}
}

func IsoToString(iso string) string {
	dia := iso[8:10]
	mes := iso[5:7]
	ano := iso[0:4]
	date := fmt.Sprintf("%s/%s/%s", dia, mes, ano)

	return date
}
