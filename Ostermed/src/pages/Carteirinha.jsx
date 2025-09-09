import {useState} from "react"
import { getVindiCarteirinha } from "../services/api"
import { HttpStatusCode } from "axios"

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
            <div className="w-[40%] h-[70vh] rounded-2xl flex flex-col bg-gray-100 items-center justify-center">
                <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="asdsadas" className="w-[250px] h-[50px] rounded-xl  border-[#002E47] border-1 p-2" />
                <button onClick={(e) => gerarCarteirinha(cpf)}>Baixar</button>
            </div>
                

        </div>
    )
}
export default Carteirinha