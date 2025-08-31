function HyperLink(props){
    return(
        <a href={`${props.link}`} class=" text-[#9c9c9c] font-light hover:text-[#002E47]">{props.text}</a>
    )
}
export default HyperLink