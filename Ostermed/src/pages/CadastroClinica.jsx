
import {useState} from "react"
import { createClinica } from "../services/api"
function CadastroClinica(){


  const [clinica, setClinica] = useState({
    Name: '',
    Servicos: [{
      NomeMedico: '',
      Preco: '',
      Especialidade: '',
      Descricao: '',
    }],
    ClinicaEndereco: {
      Street: '',
      Number: '',
      AdditionalDetails: '',
      Zipcode: '',
      Neighborhood: '',
      City: '',
      State: '',
      Country: '',
    },
    ClinicaTelefone: [{
      Phone_type: '',
      Number: '',
      Extension: '',
    }],
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setClinica(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChangeServicos = (index, e) => {
    const {name, value} = e.target;
    setClinica(prev => {
      const newServicos = [...prev.Servicos];
      newServicos[index][name] = value;
      return {...prev, Servicos: newServicos};
    });
  }

  const handleChangeClinicaEndereco = (e) => {
    const {name, value} = e.target
    setClinica(prev => ({
      ...prev,
      ClinicaEndereco: {
        ...prev.ClinicaEndereco,
        [name]: value
      }
    }))
  }

  const handleChangeClinicaTelefone = (index, e) => {
    const {name, value} = e.target
    setClinica(prev => {
      const newClinicaTelefone = [...prev.ClinicaTelefone];
      newClinicaTelefone[index][name] = value;
      return {...prev, ClinicaTelefone: newClinicaTelefone};
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      await createClinica(clinica)
      setClinica("") 
    }catch (error){
      console.log("erro ao cadastrar a clinica")
    }
  }
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <input className="b-1 border-black bg-amber-200" name="Name" type="text" value={clinica.Name} onChange={handleChange} />
          <input className="b-1 border-black bg-amber-200" name="NomeMedico" type="text" value={clinica.Servicos[0].NomeMedico} onChange={(e) => handleChangeServicos(0, e)} />
          <input className="b-1 border-black bg-amber-200" name="Preco" type="text" value={clinica.Servicos[0].Preco} onChange={(e) => handleChangeServicos(0, e)} />
          <input className="b-1 border-black bg-amber-200" name="Especialidade" type="text" value={clinica.Servicos[0].Especialidade} onChange={(e) => handleChangeServicos(0, e)} />
          <input className="b-1 border-black bg-amber-200" name="Descricao" type="text" value={clinica.Servicos[0].Descricao} onChange={(e) => handleChangeServicos(0, e)} />
          <input className="b-1 border-black bg-amber-200" name="Street" type="text" value={clinica.ClinicaEndereco.Street} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="Number" type="text" value={clinica.ClinicaEndereco.Number} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="AdditionalDetails" type="text" value={clinica.ClinicaEndereco.AdditionalDetails} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="Zipcode" type="text" value={clinica.ClinicaEndereco.Zipcode} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="Neighborhood" type="text" value={clinica.ClinicaEndereco.Neighborhood} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="City" type="text" value={clinica.ClinicaEndereco.City} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="State" type="text" value={clinica.ClinicaEndereco.State} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="Country" type="text" value={clinica.ClinicaEndereco.Country} onChange={handleChangeClinicaEndereco} />
          <input className="b-1 border-black bg-amber-200" name="Phone_type" type="text" value={clinica.ClinicaTelefone[0].Phone_type} onChange={(e) => handleChangeClinicaTelefone(0, e)} />
          <input className="b-1 border-black bg-amber-200" name="Number" type="text" value={clinica.ClinicaTelefone[0].Number} onChange={(e) => handleChangeClinicaTelefone(0, e)} />
          <input className="b-1 border-black bg-amber-200" name="Extension" type="text" value={clinica.ClinicaTelefone[0].Extension} onChange={(e) => handleChangeClinicaTelefone(0, e)} />
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    )
  }
export default CadastroClinica