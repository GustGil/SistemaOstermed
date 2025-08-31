import React,{ useEffect, useState } from "react"
import {getUsers} from "../services/api"
function ListaClientes(){
    const[clientes, setClientes] = useState([])

    useEffect(() => {
        async function fetchData() {
            try{
                const data = await getUsers()
                setClientes(data)
            } catch (err) {
                console.error("erro ao buscar o usuario")
            }
        }
        fetchData()
    }, [])

    return( 
        <ul>
            {clientes.map(cliente =>(
                <li key={cliente.id}>{cliente.id} - {cliente.nome} - {cliente.email}</li>
            ))}
        </ul>
    )


}

export default ListaClientes