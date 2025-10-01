import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cadastro from './pages/Cadastro.jsx'
import SejaUmLicenciado from './pages/SejaUmLicenciado.jsx'
import ListaClientes from './pages/ListaClientes.jsx'
import UpdateCliente from './pages/UpdateCliente.jsx'
import Login from './pages/Login.jsx'
import Carteirinha from './pages/Carteirinha.jsx'
import CadastroClinica from './pages/CadastroClinica.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/SejaUmLicenciado" element={<SejaUmLicenciado />} />

      <Route path="/Cadastro" element={<Cadastro />} />

      <Route path="/ListaClientes" element={<ListaClientes />} />

      <Route path="/UpdateCliente/:id" element={<UpdateCliente />}></Route>

      <Route path="/Login" element={<Login />}></Route>

      <Route path='/Carteirinha' element={<Carteirinha />}></Route>
    
      <Route path="/CadastroClinica" element={<CadastroClinica />} />
    </Routes>
  </BrowserRouter>
)
