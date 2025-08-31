function Cards(props){
    let color = ""
    let textColor = ""


    if (props.color == "green"){
        color = "#AEC534"
    } if (props.color == "blue" ) {
        color = "#002E47"
    }

    if (props.textColor == "white"){
        textColor = "#ffff"
    } if (props.textColor == "green"){
        textColor = "#AEC534"
    } if (props.textColor == "blue"){
        textColor = "#002E47"
    }


    return(
        <div class={`w-[31%] h-[25vh] border-2 border-[${color}] rounded-3xl flex flex-col justify-evenly items-center`}>
            <img src={props.img} alt="" class="w-[60px]" />
            <p class={`text-[20px] text-[${textColor}] font-light text-center`} >{props.text}</p>
        </div>
    )
}

export default Cards