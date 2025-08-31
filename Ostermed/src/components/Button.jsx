function Button(props){
    let bg = ""

    if (props.bg == "green"){
        bg = "#AEC534"
    } if (props.bg == "blue" ) {
        bg = "#002E47"
    }


    return(
        <button href={`${props.href}`} class={`bg-[${bg}] w-[250px] h-[50px] text-[#ffffff] rounded-[25px] font-bold`}>
            {props.text}
        </button>
    )
}

export default Button