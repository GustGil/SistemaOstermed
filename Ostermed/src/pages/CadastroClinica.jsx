
import {useState} from "react"

function CadastroClinica(){

const [clinica, setClinica] = useState({
    id: 0,
	name : '',
	servico: [{
        id: 0,
        nomeMedico: '',
        preco: 0.0,
        descricao: '',
        especialidade: ''
    }],
	endereco : {
        street: '',
	    number: 0,          
    	additionalDetails: '', 
    	zipcode: 0,           
    	neighborhood: '',
	    city: '',  
	    state: '',             
    	country: ''           
    },
	telefone : {
        phone_type: '',
        number: 0,
        extension: 0
    }
})

const handleChange = async (e) =>{
    const {name, value} = e.target;
    setClinica({...clinica, [name]: value});
}

const handleEnderecoChange = async (e) =>{
    const {name, value} = e.target;
    setClinica({
        ...clinica,
        endereco: {
            ...clinica.endereco,
            [name]: value
        }
    });
}

  const handleServicoChange = (index, e) => {
    const { name, value } = e.target;
    const novosServicos = [...clinica.servico];
    novosServicos[index][name] = value;
    setClinica({ ...clinica, servico: novosServicos });
  };

  const handleTelefoneChange = (index, e) => {
    const { name, value } = e.target;
    const novosTelefones = [...clinica.telefone];
    novosTelefones[index][name] = value;
    setClinica({ ...clinica, telefone: novosTelefones });
  };

 const adicionarEndereco = () => {
    setClinica({
      ...clinica,
      endereco: [...clinica.endereco, { street: '', number: 0, additionalDetails: '', zipcode: 0, neighborhood: '', city: '', state: '', country: '' }]
    });
  };

  const adicionarTelefone = () => {
    setClinica({
      ...clinica,
      telefone: [...clinica.telefone, { phone_type: '', number: 0, extension: 0 }]
    });
  };

    return(
        <div className="w-[100%] h-[100vh]">
            <form action="">
                <input type="text" value={clinica.name} onChange={(e) => handleChange} />
                <input type="text" value={servicoState.nomeMedico} onChange />

            </form>

        </div>
    )
}
export default CadastroClinica 