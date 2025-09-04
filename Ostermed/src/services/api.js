import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getUsers(){
  const response = await axios.get(`${API_URL}`)
  return response.data
}

export async function createUser(user){
  const response = await axios.post(`${API_URL}/cadastro`, user)
  return response.data
}

export async function updateUser(id, user){
  const response = await axios.put(`${API_URL}/update/${id}`, user)
  return response.data
}

export async function getVindiCarteirinha(cpf){
  const response = await axios.get(`${API_URL}/getCarteirinhaByCpf/${cpf}`)
  return response.data
}
