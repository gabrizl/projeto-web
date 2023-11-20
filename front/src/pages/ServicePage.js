import styles from "../styles/page.module.css";
import CustomButtom from "../components/CustomButton";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ListaService from "../components/listaServices";
import RegisterService from "../components/RegisterService";

function ServicePage() {
  const [showRegister, setshowRegister] = useState(false);
  const [lista, setLista] = useState([]);
  const [filtredList, setfiltredList] = useState([]);

  useEffect(() => {
    //ao iniciar o componente ele puxa a lista
    updateTable()
  }, []);

  const updateTable = ()=>{
    axios.get("http://localhost:5000/api/service").then((response) => {
      setLista(response.data);
      setfiltredList(response.data);
      console.log(response.data);
    });
  }

  const onSetRegister = () => {
    setshowRegister(!showRegister);
  };

  //FILTRAR1(ADICIONAR NUM ARQUIVO DE HELPERS COM FUNCOES SEPARADAS)
  function searchList(valueInput) {
    const filteredData = [];
    //caso o valor do inpout seja nada ele retorna toda a lista
    if (valueInput.length === 0) {
      return lista;
    }

    for (let i = 0; i < filtredList.length; ++i) {
      const valueLowerCase = valueInput.toLowerCase();
      const client = filtredList[i].client.toLowerCase();

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

  const deleteById = (id) => {
    axios.delete("http://localhost:5000/api/service/" + id).then((response) => {
      updateTable()
    });
  };

  return (
    <div className={styles.container}>
      {showRegister && (
        <RegisterService onClose={onSetRegister} onAdd={updateTable}></RegisterService>
      )}
      <div className={styles.header}>
        <h2>Lista de Serviços</h2>
        <CustomButtom
          text="Adicionar Serviço"
          onClick={onSetRegister}
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

      <ListaService lista={filtredList} onDelete={deleteById} onEdit={updateTable}></ListaService>
    </div>
  );
}

export default ServicePage;
