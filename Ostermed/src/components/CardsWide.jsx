
function CardsWide(props){

    return(
        <div class="w-[25%] rounded-3xl h-[27vh] border-[#002E47] border-[3px] p-[40px] flex flex-col justify-between">
            <p class="inline text-[20px] font-semibold text-[#002E47]">{props.text}</p>
            <button class="bg-[#AEC534] w-[200px] h-[40px] text-[#ffffff] rounded-[25px] font-bold text-[13px]">Veja os descontos</button>
        </div>
    )
}

export default CardsWide