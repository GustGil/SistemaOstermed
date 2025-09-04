import {useState, useEffect} from "react"
import { getVindiCarteirinha } from "../services/api"

function Carteirinha() {
    const [cpf, setCpf] = useState()
    const [carteirinha, setCarteirinha] = useState()

    const handleSubmit = async () => {
        const resp = getVindiCarteirinha(cpf)
        setCarteirinha(resp)
    }

    

    return(
        <div className="w-[100%] h-[100vh] bg-blue-600">
            <form onsubmit={handleSubmit}>  
                <input type="number" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="asdsadas" />
                <input type="submit" />
            </form>
            <a href={carteirinha}>asdsad</a>
        </div>
    )
}
export default Carteirinha