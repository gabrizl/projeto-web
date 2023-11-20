import { useState } from 'react';
import styles from '../styles/register.module.css';
import axios from 'axios';

function RegisterClient(props) {

    const [formData, setFormData] = useState({
        id:"",
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        car:{
            model:"",
            color:"",
            year:"",
            carPlate:"",
            brand:""
        }
      });
      
    
      //FUNCAO PARA ATUALIZAR OS CAMPOS DO INPUT
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

      const handleCarChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          car: {
            ...prevFormData.car,
            [name]: value,
          },
        }));
      };
    
      //FUNCAO QUANDO CLICAR EM CADASTRAR
      const handleSubmit = (event) => {
        event.preventDefault();
        //VALIDACOES
        if (formData.name < 1) {
          return alert("campos obrigatorios");
        }
        //SALVAR NO BANCO
        formData.id = Math.floor(Math.random() * 10000) + 1;
        try {
          axios.post("http://localhost:5000/api/client", formData).then((response) => {
          alert("cadastrado com sucesso")
          props.onAdd(response.data)
          props.onClose()
        });
        } catch (error) {
          alert(error)
        }
      };


  return (
    <div className={styles.back}>
      <form  onSubmit={handleSubmit} className={styles.container}>
        <h2>DADOS DO CLIENTE</h2>
        <div className={styles.groupInput}>
            <input className={styles.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder='Nome'/>
            <input className={styles.input} type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email'/>  
        </div>
        <div className={styles.groupInput}>
            <input className={styles.input} type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder='Endereço'/>
            <input className={styles.input} type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder='Telefone'/>
        </div>
        <h2>DADOS DO VEÍCULO</h2>
        <div className={styles.groupInput}>
            <input className={styles.input} type="text" id="model" name="model" value={formData.car.model} onChange={handleCarChange } placeholder='Modelo'/>
            <input className={styles.input} type="text" id="color" name="color" value={formData.car.color} onChange={handleCarChange } placeholder='Cor'/>
        </div>
        <div className={styles.groupInput}>
            <input className={styles.input} type="text" id="year" name="year" value={formData.car.year} onChange={handleCarChange } placeholder='Ano'/>
            <input className={styles.input} type="text" id="carPlate" name="carPlate" value={formData.car.carPlate} onChange={handleCarChange } placeholder='Placa'/>
        </div>
            <input className={styles.input} type="text" id="brand" name="brand" value={formData.car.brand} onChange={handleCarChange } placeholder='Marca'/>


        <div className={styles.groupButtons}>
            <button type='submit'className={`${styles.btn} ${styles.btn_primary}`} >Confirmar</button>
            <button onClick={props.onClose} className={`${styles.btn} ${styles.btn_secondary}`}>Cancelar</button>
            
        </div>
    </form>
    </div>
    
  );
}

export default RegisterClient;