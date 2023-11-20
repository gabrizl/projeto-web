import { useState } from "react";
import styles from "../styles/details.module.css";
import axios from "axios";

function ServiceDetail(props) {
  const [onEdit, setOnEdit] = useState(true);
  const [formData, setFormData] = useState({
    id: props.client.id,
    client: props.client.client,
    car: props.client.car,
    description: props.client.description,
    price: props.client.price,
    status: props.client.status,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onClose = () => {
    setOnEdit(false);
    props.onClose();
  };

  const onDelete = () => {
    props.onDelete();
    props.onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //VALIDACOES
    if (formData.name < 1) {
      return alert("campos obrigatorios");
    }
    try {
      axios
        .put(`http://localhost:5000/api/service/${formData.id}`, formData)
        .then((response) => {
          alert("Editado com sucesso");
          props.onEdit();
          props.onClose();
        });
    } catch (error) {
      alert(error);
    }
  };
  
  return (
    <div className={styles.back}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>DETALHES</h2>
        <div className={styles.info}>
          <div className={styles.info_content}>
            <h2>CLIENTE</h2>
            <div>
              <label htmlFor="client">Nome: </label>
              <input
                className={styles.input}
                id="client"
                name="client"
                value={formData.client}
                disabled
              />
            </div>
            <div>
              <label htmlFor="car">Veículo: </label>
              <input
                className={styles.input}
                id="car"
                name="car"
                value={formData.car}
                disabled
              />
            </div>
          </div>
          <div className={styles.info_content}>
            <h2>SERVICO</h2>
            <div>
              <label htmlFor="status">Status: </label>
              <select
                disabled={onEdit}
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
            <div>
              <label htmlFor="price">Preço: </label>
              <input
                className={styles.input}
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={onEdit}
              />
            </div>
            <div>
              <textarea
                value={formData.description}
                name="description"
                id="description"
                onChange={handleChange}
                placeholder="Descrição"
                rows={7}
                disabled={onEdit}
              />
            </div>
          </div>
        </div>

        <div className={styles.groupButtons}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btn_primary}`}
            disabled={onEdit}
          >
            Confirmar
          </button>
          <button
            onClick={() => {
              setOnEdit(!onEdit);
            }}
            type="submit"
            className={`${styles.btn} ${styles.btn_primary}`}
            disabled={!onEdit}
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            type="submit"
            className={`${styles.btn} ${styles.btn_delete}`}
          >
            {" "}
            Excluir
          </button>
          <button
            onClick={onClose}
            className={`${styles.btn} ${styles.btn_secondary}`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceDetail;
