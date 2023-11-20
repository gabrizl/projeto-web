import { useEffect, useState } from "react";
import styles from "../styles/register.module.css";
import axios from "axios";

function RegisterService(props) {
  const [formData, setFormData] = useState({
    id: "",
    price: "",
    description: "",
    client: "",
    car: "",
    status: "",
  });

  //FUNCAO PARA ATUALIZAR OS CAMPOS DO INPUT
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //FUNCAO QUANDO CLICAR EM CADASTRAR
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
    //VALIDACOES
    if (formData.price < 1) {
      return alert("campos obrigatorios");
    }
    //SALVAR NO BANCO
    formData.id = Math.floor(Math.random() * 20000) + 10000;
    try {
      axios
        .post("http://localhost:5000/api/service", formData)
        .then((response) => {
          alert("cadastrado com sucesso");
          props.onAdd(response.data);
          props.onClose();
        });
    } catch (error) {
      alert(error);
    }
  };

  //pegar os valores do option
  useEffect(() => {
    //ao iniciar o componente ele puxa a lista
    axios.get("http://localhost:5000/api/client").then((response) => {
      const removeDuplicated = response.data.filter((obj, i, arr) => {
        return arr.findIndex((o) => o.name === obj.name) === i;
      });
      setClients(removeDuplicated);
      console.log(response.data);
    });
  }, []);
  const [clients, setClients] = useState([]);
  const [cars, setCars] = useState([]);

  const onSetCars = async () => {
    const client = await clients.find((item) => item.name == formData.client);
    if (client) {
      axios
        .get("http://localhost:5000/api/client/cars/" + client.name)
        .then((response) => {
          console.log(response);
          setCars(response.data);
        });
    }
    //
  };
  useEffect(() => {
    onSetCars();
  }, [formData.client]);

  return (
    <div className={styles.back}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2>DETALHES DO SERVIÇO</h2>
        <div className={styles.form_content}>
          <div className={styles.select_container}>
            <div className={styles.select_content}>
              <label htmlFor="client">Cliente</label>
              <select
                name="client"
                id="client"
                value={formData.client}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden defaultValue={""}>
                  Selecionar
                </option>
                {clients.length > 0 &&
                  clients.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.select_content}>
              <label htmlFor="car">Veículo</label>
              <select
                name="car"
                id="car"
                value={formData.car}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Selecionar
                </option>
                s
                {cars.length > 0 &&
                  cars.map((c) => (
                    <option key={c.carPlate} value={c.model}>
                      {c.model}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.select_content}>
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden defaultValue={""}>
                  Selecionar
                </option>
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
          </div>
          <div className={styles.input_content}>
            <input
              className={styles.input}
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Preço"
            />
            <textarea
              value={formData.description}
              name="description"
              id="description"
              onChange={handleChange}
              placeholder="Descrição"
              rows={7}
            />
          </div>
        </div>

        <div className={styles.groupButtons}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            Confirmar
          </button>
          <button
            onClick={props.onClose}
            className={`${styles.btn} ${styles.btn_secondary}`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterService;
