import React, { useState } from 'react';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

function Duvida(props){

const [isExpanded, setIsExpanded] = useState(false);



const expan = () =>{
    setIsExpanded(!isExpanded)
}



    return(
        <div className={`w-[85%] ${isExpanded ? "max-h-[25vh]" : "h-[7vh]"} rounded-3xl transition-all cursor-pointer overflow-hidden bg-[#AEC534] duration-250`} onClick={expan}>
            <div class="p-[15px] w-[100%] h-[7vh] flex items-center gap-3"> 
                <AiOutlineCheckCircle class="w-[3%] text-[#002E47] text-3xl justify-self-start" />
                <h1 class="w-[94%] text-[20px] text-[#ffff]">{props.question}</h1>
                <IoIosArrowBack class={`w-[3%] text-[#ffff] text-3xl justify-self-end ${isExpanded ? "-rotate-90" : ""} duration-150`} />
            </div>
            <div class={`px-[25px] pb-[15px] w-[100%] font-light ${isExpanded ? "visible" : "invisible"} `}>
                {props.answer}
            </div>
        </div>
    )
}
export default Duvida