import { useState } from 'react';
import styles from '../styles/details.module.css'
import axios from 'axios';

function ClientDetail(props) {

    const [onEdit, setOnEdit] = useState(true)
    const [formData, setFormData] = useState({
        id:props.client.id, 
        name: props.client.name,
        email: props.client.email,
        address: props.client.address,
        cep: props.client.cep,
        phoneNumber: props.client.phoneNumber,
        car:{
            model:props.client.car.model,
            color:props.client.car.color,
            year:props.client.car.year,
            carPlate:props.client.car.carPlate,
            brand:props.client.car.brand
        }
      });

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

      const onClose=()=>{
        setOnEdit(false)
        props.onClose()
      }

      const onDelete=()=>{
        props.onDelete()
        props.onClose()
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        //VALIDACOES
        if (formData.name < 1) {
          return alert("campos obrigatorios");
        }
        try {
          axios.put(`http://localhost:5000/api/client/${formData.id}`, formData).then((response) => {
          alert("Editado com sucesso")
          props.onEdit()
          props.onClose()
        });
        } catch (error) {
          alert(error)
        }
      };
  return (
    <div className={styles.back}>
      <form onSubmit={handleSubmit}   className={styles.container}>

        <h2>DETALHES</h2>
          <div className={styles.info}>
              <div className={styles.info_content}>
              <h2>CLIENTE</h2>
                  <div >
                      <label htmlFor="name">Nome: </label>
                      <input className={styles.input} id="name" name="name" value={formData.name} onChange={handleChange} disabled={onEdit}/>
                  </div>
                  <div >
                      <label htmlFor="email">Email: </label>
                      <input className={styles.input} id="email" name="email" value={formData.email} onChange={handleChange} disabled={onEdit}/>
                  </div>
                  <div >
                      <label htmlFor="address">Endereço: </label>
                      <input className={styles.input} id="address" name="address" value={formData.address} onChange={handleChange} disabled={onEdit}/>
                  </div>
                  <div >
                      <label htmlFor="phoneNumber">Contato: </label>
                      <input className={styles.input} id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} disabled={onEdit}/>
                  </div>
              </div>
              <div className={styles.info_content}>
              <h2>VEÍCULO</h2>
                  <div>
                      <label htmlFor="model">Modelo: </label>
                      <input className={styles.input} id="model" name="model" value={formData.car.model} onChange={handleCarChange} disabled={onEdit}/>
                  </div>
                  <div>
                      <label htmlFor="color">Cor: </label>
                      <input className={styles.input} id="color" name="color" value={formData.car.color} onChange={handleCarChange} disabled={onEdit}/>
                  </div>
                  <div>
                      <label htmlFor="year">Ano: </label>
                      <input className={styles.input} id="year" name="year" value={formData.car.year} onChange={handleCarChange} disabled={onEdit}/>
                  </div>
                  <div>
                      <label htmlFor="carPlate">Placa: </label>
                      <input className={styles.input} id="carPlate" name="carPlate" value={formData.car.carPlate} onChange={handleCarChange} disabled={onEdit}/>
                  </div>
                  <div>
                      <label htmlFor="brand">Marca: </label>
                      <input className={styles.input} id="brand" name="brand" value={formData.car.brand} onChange={handleCarChange} disabled={onEdit}/>
                  </div>
              </div>
          </div>

          <div className={styles.groupButtons}>
              <button type='submit'className={`${styles.btn} ${styles.btn_primary}`} disabled={onEdit} >Confirmar</button>
              <button onClick={()=>{setOnEdit(!onEdit)}} type='submit'className={`${styles.btn} ${styles.btn_primary}`} disabled={!onEdit} >Editar</button>
              <button onClick={onDelete} type='submit'className={`${styles.btn} ${styles.btn_delete}`}> Excluir</button>
              <button onClick={onClose} className={`${styles.btn} ${styles.btn_secondary}`} >Cancelar</button>
          </div>

      </form>
    </div>
    
  );
}

export default ClientDetail;