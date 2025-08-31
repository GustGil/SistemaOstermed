import { AiOutlineCheckCircle } from "react-icons/ai";
import Button from "./Button";
function Painel(props){

    let bg1, colText, bgMensal, border, button, corTitle, corSubTitle, mensagem = ""

    if (props.type == "green"){
        bg1 = "#AEC534"
        border = "border-[#AEC534]"
        bgMensal = "#002E47"
        colText = "#002E47"
        button = "blue"
        corTitle = "#ffff"
        corSubTitle = "#002E47"
    } if (props.type == "blue" ) {
        bg1 = "#002E47"
        bgMensal = "#AEC534"
        colText = "#ffff"
        border = "border-[#ffff]"
        button = "green"
        corTitle = "#ffff"
        corSubTitle = "#AEC534"
    } if (props.type == "gray") {
        bg1 ="#C7C9B8"
        bgMensal = "#AEC534"
        button = "blue"
        colText = "#002E47"
        border = "border-[#C7C9B8]"
        corTitle = "#002E47"
        corSubTitle = "#002E47"
    }

    if (props.status === 'ativo') {
        mensagem = <p class="flex gap-2"><AiOutlineCheckCircle class={`text-[${corSubTitle}]`}/>Seguro de vida e o auxílio funeral</p>;
    } else if (props.status === 'inativo') {
        mensagem = null
    }
    return(
        <div class={`w-[44%] h-[70vh] flex flex-col border-2 border-solid ${border} bg-[${bg1}] rounded-3xl items-center `}>
            <div class="h-[30vh] w-[90%] flex flex-col justify-center items-center">
                <h1 class={`text-4xl font-bold text-[${corTitle}] m-[20px]`}>{props.plano}</h1>
                <div class={`w-[70%] h-[5vh] border-1 border-[${bgMensal}] flex justify-around rounded-[2.5vh] text-[20px] font-light text-[#ffff]`}>
                    <div class={`h-[4.8vh] w-[50%] flex justify-around items-center bg-[${bgMensal}] rounded-l-[2.45vh]`}>Anual</div>
                    <div class={`h-[4.8vh] w-[50%] flex justify-around items-center text-[${corTitle}]`}>Mensal</div>
                </div>
                <h1 class="text-4xl font-bold text-[#ffff] m-[10px]">R${props.preco}</h1>
                <h2 class="text-[20px] font-thin text-[#ffff]">Valor plano mensal</h2>
                <h3 class={`text-[12px] font-thin text-[${corSubTitle}] `}>Pagando a sua <h3 class="font-bold inline">assinatura anual</h3>,  ganhe desconto e comece a usar imediatamente</h3>
            </div>
            <div class={`w-[90%] h-[30vh] flex flex-col justify-evenly text-[17px] text-[${colText}] font-thin`}>
                    <p class="flex gap-2"><AiOutlineCheckCircle class={`text-[${corSubTitle}]`}/>Feito para até {props.dependentes} pessoas</p>
                    <p class="flex gap-2"><AiOutlineCheckCircle class={`text-[${corSubTitle}]`}/>Rede credenciada regional</p>
                    <p class="flex gap-2"><AiOutlineCheckCircle class={`text-[${corSubTitle}]`}/>Hospitais, laboratórios, centros médicos e imagem e especialidades</p>
                    <p class="flex gap-2"><AiOutlineCheckCircle class={`text-[${corSubTitle}]`}/>{props.telemed}</p>
                    {mensagem}
                    <p class="flex gap-2"><AiOutlineCheckCircle class={`text-[${corSubTitle}]`}/>Descontos com até {props.desconto}%</p>
                    
            </div>
            <div class="h-[10vh] flex justify-center items-center">
                <Button bg={`${button}`} text="Contrate Agora"></Button>
            </div>
        </div>
    )
}

export default Painel