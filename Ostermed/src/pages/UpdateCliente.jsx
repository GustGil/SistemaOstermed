import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { updateUser } from "../services/api"

function UpdateCliente(){
    const { id } = useParams()
    const[ cliente, setCliente ] = useState({
        name: '',
    })

    useEffect(() => {
        axios.get(`http://localhost:8000/getUsuariosByID/${id}`)
            .then(res => setCliente(res.data))
            .catch(err => console.log("Erro ao encontrar o usuario", err))
    }, [id])

    const handleChange = (e) => {
        const { name , value } = e.target
        setCliente(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateUser( id, cliente)
            alert("cliente atualizaso com sucesso")
        } catch (err) {
            console.error("erro ao atualizar o usuario", err)
            alert("erro ao atualizar o cliente")
        }
    }

    return(
        <>

            <form onSubmit={handleSubmit}>
                <input name="nome" value={cliente.nome} onChange={handleChange}></input>
                <input name="email" value={cliente.email} onChange={handleChange}></input>
                <input name="telefone" value={cliente.telefone} onChange={handleChange}></input>
                <button type="submit">salvar</button>
            </form>
        </>
    )
}

export default UpdateCliente