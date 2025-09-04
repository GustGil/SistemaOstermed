import { Link } from "react-router-dom"

function Header(){
    return(
        <div class="w-[100%] h-[15vh]  flex justify-center items-center">
            <div className="w-[90%] h-[10vh] flex justify-between">
                <div class="w-[30%] h-[10vh] flex items-center ">
                    <img src="./logoOstermed.png" alt="" class="w-[200px]"/>
                </div>
                <div class="w-[30%] h-[10vh] flex justify-between items-center">
                    <button class="bg-[#AEC534] w-[195px] h-[50px] text-[#ffffff] rounded-[25px] font-bold" >Seja um Licenciado</button>
                    <Link to="/Carteirinha"><button class="bg-[#002E47] w-[165px] h-[50px] text-[#ffffff] rounded-[25px] font-bold">Emitir Carteirinha</button></Link>
                    <div>
                        <img src="./menu-button.png" alt="" class="h-[30px]"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header