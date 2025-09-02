package utils

import (
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

func CreateCarteirinha(nome string, cpf string, plano string) {
	var baseImagePath string
	var rgb1, rgb2, rgb3 int
	if plano == "Angel" {
		baseImagePath, _ = filepath.Abs("utils/AngelCarteirinha.png") //127, 129, 131
		rgb1 = 127
		rgb2 = 129
		rgb3 = 131
	} else {
		baseImagePath, _ = filepath.Abs("utils/PremiumCarteirinha.png") //254,254,253
		rgb1 = 254
		rgb2 = 254
		rgb3 = 253
	}

	baseFontPath, _ := filepath.Abs("utils/Roboto-Medium.ttf")
	file, err := os.Open(baseImagePath)

	if err != nil {
		panic(err)
	}
	defer file.Close()
	img, _, err := image.Decode(file)
	if err != nil {
		panic(err)
	}

	largura := img.Bounds().Dx()
	altura := img.Bounds().Dy()
	dc := gg.NewContext(largura, altura) //1573 × 1028 px

	err = dc.LoadFontFace(baseFontPath, 40)
	if err != nil {
		panic(err)
	}
	dc.DrawImage(img, 0, 0)
	dc.SetRGB255(rgb1, rgb2, rgb3)
	dc.DrawString(nome, 50, 800)
	dc.DrawString(cpf, 50, 950)

	fileName := fmt.Sprintf("%s Carteirinha - %s.png", plano, nome)

	err = dc.SavePNG(fileName)

	if err != nil {
		panic(err)
	}
}

func SliceSubStringInterval(text string, Point string) string {
	inicio := strings.Index(text, Point)
	fim := strings.LastIndex(text, Point)

	if inicio != -1 && fim != -1 && inicio < fim {
		resultado := text[inicio+1 : fim]
		return resultado
	} else {
		fmt.Println("Delimitadores não encontrados")
		return ""
	}
}
