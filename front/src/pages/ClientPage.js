import styles from "../styles/page.module.css";
import CustomButtom from "../components/CustomButton";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import RegisterClient from "../components/RegisterClient";
import ListaClients from "../components/listaClients";

function ClientPage() {
  const [showRegister, setshowRegister] = useState(false);
  const [lista, setLista] = useState([]);
  const [filtredList, setfiltredList] = useState([]);

  useEffect(() => {
    updateTable();
  }, []);

  const updateTable = () => {
    axios.get("http://localhost:5000/api/client").then((response) => {
      setLista(response.data);
      setfiltredList(response.data);
      console.log(response.data);
    });
  };

  const toggleShowRegister = () => {
    setshowRegister(!showRegister);
  };

  const deleteById = (id) => {
    axios.delete("http://localhost:5000/api/client/" + id).then((response) => {
      console.log(response.data);
      updateTable();
    });
  };

  //FILTRAR
  function searchList(valueInput) {
    const filteredData = [];
    if (valueInput.length === 0) {
      return lista;
    }
    for (let i = 0; i < filtredList.length; ++i) {
      const valueLowerCase = valueInput.toLowerCase();
      const client = filtredList[i].name.toLowerCase();

      if (client.includes(valueLowerCase)) {
        filteredData.push(filtredList[i]);
      }
    }
    return filteredData;
  }

  function handleInput(e) {
    const inputValue = e.target.value;
    setfiltredList(searchList(inputValue));
  }

  return (
    <div className={styles.container}>
      {showRegister && (
        <RegisterClient
          onClose={toggleShowRegister}
          onAdd={updateTable}
        ></RegisterClient>
      )}
      <div className={styles.header}>
        <h2>Lista de Clientes</h2>
        <CustomButtom
          text="Adicionar Cliente"
          onClick={toggleShowRegister}
          styled={{ padding: "1rem 1rem", maxHeight: "60px" }}
        />
      </div>
      <hr />
      <input
        className={styles.input}
        type="text"
        onChange={handleInput}
        id="input"
        placeholder="Filtrar"
      />

      <ListaClients lista={filtredList} onDelete={deleteById} onEdit={updateTable} ></ListaClients>
    </div>
  );
}

export default ClientPage;
