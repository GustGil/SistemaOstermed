import { BsArrowReturnLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'

function Login(){
    return(
        <div class="w-[100%] h-[100vh] bg-[url(./bgLogin.png)] bg-cover flex items-center p-[25px]">
            <motion.div 
                    initial={{ opacity: 1, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
            
            class="w-[40%] h-[95vh] bg-[#ffff] justify-self-start rounded-xl flex flex-col">
                <div class="w-[100%] h-[17vh] flex justify-start items-center">
                    <div className="w-[10%] h-[7vh] flex items-center justify-center"><BsArrowReturnLeft class="w-[30px]" /></div>
                    <div className="w-[80%] h-[7vh] flex items-center justify-center"><img src="./logoOstermed.png" class="h-[3vh]" /></div>
                </div>
                <div className=" w-[100%] h-[15vh] flex flex-col justify-center items-center text-[#002E47]">
                    <h1 className="font-light text-3xl ">Bem-Vindo de volta!</h1>
                    <h2 className="font-light ">Acesse nosso sistema</h2>
                </div>
                <div className="w-[100%] flex justify-center">
                    <form className="flex flex-col w-[70%] h-[35vh] text-[#002E47] justify-evenly items-center" action="">
                        <div className="flex flex-col w-[100%]">
                            <span className="text-sm font-light ml-[10px]">CPF:</span>
                            <input className="h-[55px] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75" type="text" />
                        </div>
                        <div className="flex flex-col w-[100%]">
                            <span className="text-sm font-light ml-[10px]">SENHA:</span>
                            <input className="h-[55px] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75" type="text" />
                            <span className="ml-[10px] font-light text-sm">Esqueceu a senha</span>
                        </div>
                        <button className="w-[60%] h-[55px] rounded-lg bg-[#AEC534] text-[#ffff] text-xl font-light">Enviar</button>
                        </form>
                </div>
                <div className="h-[20vh] gap-[10px] flex flex-col justify-center items-center font-light text-[#002E47]">
                    
                    <h1>Nao possui cadastro? De uma olhada nos planos e se junte a nos</h1>
                    <Link to="/Cadastro">   <h1 className="text-xl">Ver Planos</h1></Link>
                </div>
            </motion.div>
        </div>
    )
}
export default Login