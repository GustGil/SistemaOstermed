import {useState} from "react"
import {InputMask} from "react-input-mask";


function Carteirinha() {
    const [cpf, setCpf] = useState()


const gerarCarteirinha = async (cpf) => { 
    const img = await fetch(`http://localhost:8000/getCarteirinhaByCpf/${cpf}`)
    if (!img.ok) throw new Error('Erro ao buscar imagem');
    const blob = await img.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Carteirinha.png';
    a.click();
    URL.revokeObjectURL(url);
}
  
//09634436900

    return(
        <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center bg-gray-200">
            <div className="w-[40%] h-[70vh] rounded-2xl flex bg-white items-center justify-center">
                <div className="w-[250px] h-[30vh] flex flex-col justify-evenly items-center">
                    <input maxlength="11" mask="999.999.999-99"  type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" className="w-[250px] h-[50px] rounded-xl  border-[#002E47] border-[1px] p-2 appearance-none" />
                    <button className="w-[250px] h-[50px] rounded-xl text-white bg-[#002E47] hover:bg-white hover:text-[#002E47] duration-100 border-1 p-2 " onClick={(e) => gerarCarteirinha(cpf)}>Baixar</button>
                </div>
            </div>
                

        </div>
    )
}
export default Carteirinha