import { useState, useRef, useEffect } from "react"
import { createUser } from "../services/api"
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
function Cadastro(){    
    const [alertcont, setAlertcont] = useState("")
    const [step, setStep] = useState(1)

    const [tel, setTel] = useState()
    const [ddd, setDdd] = useState()
    const [numTel, setNumTel] = useState()

    const [numDep, setNumDep] = useState()
    const [nomeDep, setNomeDep] = useState()
    const [cpfDep, setCpfDep] = useState()
    const [dep, setDep] = useState([])

    const [cliente, setCliente] = useState({
        nome:'',
        email:'',
        plano:'',
        fatura:'',
        cpf:'',
        meiodepagamento:'',
        filiacao:'',
        dependentes:'',
        telefone:'',
        endereco:'',
        password:''
    })


    useEffect(() => {
        setNumTel(`${ddd} ${tel}`)
        handleChange({target: {name:"telefone", value:`${numTel}`}} )
    }, [ddd, tel])


    const handleChange = (e) => {
        const {name, value} = e.target
        setCliente((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const visor = [1, 2, 3, 4]

    const verStep = () => {
        if (step === 1) {
            return cliente.nome
        } else if ( step === 2) {
            return (
                cliente.email,
                cliente.telefone,
                cliente.cpf
            )
        }
    }


    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            await createUser(cliente)
            setCliente("")
        } catch (error) {
            console.error("erro ao criar cliente", error)
        }
    }

    const pages = useRef(null)

    
    const retornar = (e) => {
        e.preventDefault()
        pages.current.scrollLeft -= pages.current.offsetWidth
        setStep(step-1)
    }
    
    const continuar = (e) => {
        if(verStep() === ""){
            console.log("campo invalido, esta vazio!")
            setAlertcont(true)
        } else {
            e.preventDefault()
            pages.current.scrollLeft += pages.current.offsetWidth
            setAlertcont(false)
            setStep(step + 1)
        }
    }

    const adicionarDep = () => {
        if(!nomeDep || !cpfDep )return
        if(dep.length >= numDep){
            return
        }
        setDep([...dep, {nomeDep, cpfDep}])
        setNomeDep('')
        setCpfDep('')
    }

    const removeDep = (index) => {
        setDep((prev) => prev.filter((_, i) => i !== index))
    }

    return(
        <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
            <div className="w-[35%] h-[80vh] border-2 flex justify-between flex-col py-2">
                <div className="w-[100%] h-[5px] flex justify-evenly items-center">
                    {visor.map((etapa)=>(
                        <div className={`w-[22%] h-[5px] rounded ${etapa === step ? 'bg-[#AEC534]':'bg-[#e9e9e9]'}`} />
                    ))}
                </div>
                
                    <form onSubmit={handleSubmit} className="w-[100%] h-[50vh] max-w-[40vw] flex overflow-hidden scroll-smooth scrollbar-none" ref={pages}>
                        <div className="min-w-[100%] h-[50vh] flex flex-col items-center justify-evenly " >
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-2xl font-light">Primeiramente gostariamos de saber seu nome!</h1>
                                <h2 className="font-thin">Ja possui uma conta? <Link to="/Login">Login</Link></h2>
                            </div>
                            <div className="flex flex-col w-[80%] justify-center">
                                <span className="text-sm font-light ml-[10px]">Nome:</span>
                                <input type="text" name="nome" value={cliente.nome}  onChange={handleChange} className="h-[6vh] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75"  />
                            </div>
                        </div>
                        <div className="min-w-[100%] h-[50vh] flex flex-col justify-around items-center">
                            <h1 className="text-2xl font-light text-center">Bem-vindo <p className="font-normal inline">{cliente.nome}</p>! Agradecemos a confianca, vamos precisar de mais algumas informacoes!</h1>
                            <div className="flex flex-col h-[35vh] w-[80%] ">                 
                                <div className="flex flex-col w-[100%] justify-center">
                                    <span className="text-sm font-light ml-[10px]">E-mail:</span>
                                    <input type="text" name="email" value={cliente.email}  onChange={handleChange} className="h-[6vh] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75"  />
                                </div>
                                <div className="flex w-[100%] justify-between">
                                    <div className="flex flex-col w-[20%] justify-center">
                                        <span className="text-sm font-light ml-[10px]">DDD:</span>
                                        <input type="text" name="ddd" value={ddd}  onChange={(e) => setDdd(e.target.value)} className="h-[6vh] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75"  />
                                    </div>
                                    <div className="flex flex-col w-[70%] justify-center">
                                        <span className="text-sm font-light ml-[10px]">Telefone:</span>
                                        <input type="text" name="tel" value={tel}  onChange={(e) => setTel(e.target.value)} className="h-[6vh] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75"  />
                                    </div>
                                </div>
                                <div className="flex flex-col w-[100%] justify-center">
                                    <span className="text-sm font-light ml-[10px]">CPF:</span>
                                    <input type="text" name="cpf" value={cliente.cpf}  onChange={handleChange} className="h-[6vh] border-1 rounded-lg text-xl font-light p-[10px] outline-0 border-[#E5E5E5] bg-[#F8F8F8] hover:border-[#AEC534] focus:border-[#AEC534] duration-75"  />
                                </div>
                            </div>
                            
                        </div>
                        <div className="min-w-[100%] h-[50vh] flex flex-col justify-around items-center">
                            <h1 className="text-2xl font-light text-center">Qual plano voce deseja adquirir!</h1>
                            <div className="w-[80%] h-[25vh] flex flex-col justify-center">
                                <div className="w-[100%] h-[10vh] flex justify-between">
                                    <div className="w-[45%] h-[100px] justify-center items-center flex rounded-xl border-1 border-[#e9e9e9]">
                                        <div className="w-[30%] h-[100px] flex justify-center items-center">
                                            <input type="radio" name="plano" value="angel" onChange={(e) => {handleChange(e); setNumDep(3); setDep([])}} />
                                        </div>
                                        <div className="w-[55%] h-[80px] flex flex-col justify-evenly">
                                            <h1 className="font-light text-normal">Angel</h1>
                                            <p className="font-thin text-sm">R$<h2 className="text-2xl inline font-normal text-[#AEC534]">59,90</h2></p>
                                            <h1 className="font-thin text-sm">Ver</h1>
                                        </div>
                                    </div>
                                    <div className="w-[45%] h-[100px] justify-center items-center flex rounded-xl border-1 border-[#e9e9e9]">
                                        <div className="w-[30%] h-[100px] flex justify-center items-center">
                                            <input type="radio" name="plano" value="guardian" onChange={(e) => {handleChange(e); setNumDep(4); setDep([])}} />
                                        </div>
                                        <div className="w-[55%] h-[80px] flex flex-col justify-evenly">
                                            <h1 className="font-light text-normal">Guardian</h1>
                                            <p className="font-thin text-sm">R$<h2 className="text-2xl inline font-normal text-[#AEC534]">79,90</h2></p>
                                            <h1 className="font-thin text-sm">Ver</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[100%] h-[11vh] flex justify-between">
                                    <div className="w-[45%] h-[100px] justify-center items-center flex rounded-xl border-1 border-[#e9e9e9]">
                                        <div className="w-[30%] h-[100px] flex justify-center items-center">
                                            <input type="radio" name="plano" value="premium" onChange={(e) => {handleChange(e); setNumDep(5); setDep([])}} />
                                        </div>
                                        <div className="w-[55%] h-[80px] flex flex-col justify-evenly">
                                            <h1 className="font-light text-normal">Premium</h1>
                                            <p className="font-thin text-sm">R$<h2 className="text-2xl inline font-normal text-[#AEC534]">99,90</h2></p>
                                            <h1 className="font-thin text-sm">Ver</h1>
                                        </div>
                                    </div>
                                    <div className="w-[45%] h-[100px] justify-center items-center flex rounded-xl border-1 border-[#e9e9e9]">
                                        <div className="w-[30%] h-[100px] flex justify-center items-center">
                                            <input type="radio" name="plano" value="diamond" onChange={(e) => {handleChange(e); setNumDep(5); setDep([])}} />
                                        </div>
                                        <div className="w-[55%] h-[80px] flex flex-col justify-evenly">
                                            <h1 className="font-light text-normal">Diamond</h1>
                                            <p className="font-thin text-sm">R$<h2 className="text-2xl inline font-normal text-[#AEC534]">159,90</h2></p>
                                            <h1 className="font-thin text-sm">Ver</h1>
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                            <div className="w-[100%] h-[25vh] py-2.5 flex flex-col items-center">
                                <div className="flex justify-between items-center w-[80%] h-[6vh] border-[#e9e9e9] border-1 rounded-xl p-[15px] mb-[10px]">
                                        <input type="text" className="w-[35%]" value={nomeDep} onChange={(e) => setNomeDep(e.target.value)}/>
                                        <input type="text" className="w-[35%]" value={cpfDep} onChange={(e) => setCpfDep(e.target.value)}/>
                                        <div className={`flex text-center items-center font-light bg-[#AEC534] w-[25%] justify-center h-[40px] text-[#ffffff] rounded-xl ${dep.length >= numDep ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#AEC534] hover:bg-[#9dad4c]'}`} onClick={adicionarDep}> Adicionar <CiSquarePlus /></div>
                                </div>
                                <ul className="w-[80%] h-[19vh] flex flex-col items-center overflow-y-auto">
                                    {dep.map((dep, index) => (
                                        <li key={index} className="flex items-center justify-around w-[] min-h-[4vh] rounded-xl bg-[#e9e9e9] my-[5px]">
                                            <p>{dep.nomeDep}</p>
                                            <p>{dep.cpfDep}</p>
                                            <p className="justify-self-end" onClick={() => removeDep(index)}>delete</p>
                                        </li>
                                    ))}
                                </ul>


                            </div>
                        </div>
                    </form>
                <div className="w-[100%] h-[35px]">
                    {alertcont && (
                        <div className="h-[35px] flex justify-center items-center bg-red-200 text-red-800 ">
                            <p>Preencha todos os campos!
                            <button className="ml-4 text-blue-500" onClick={() => setAlertcont(false)}>
                                Fechar
                            </button></p>
                        </div>
                    )}
                </div>
                <div className="w-[100%] h-[10vh] flex justify-evenly items-center">
                    {step != 1 && <button onClick={retornar} className="h-[6vh] w-[40%] hover:bg-[#eaeef0] rounded-4xl duration-125 text-xl font-thin">voltar</button>}
                    <button onClick={continuar} className={`${step === 1 ? 'w-[80%]':'w-[40%]'} h-[6vh]  bg-[#AEC534] rounded-4xl text-[#ffff] text-xl font-light`}>continuar</button>
                </div>
            </div>
        </div>
    )
}
export default Cadastro