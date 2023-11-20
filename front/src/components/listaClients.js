import axios from "axios";
import styles from "../styles/lista.module.css";
import { useState } from "react";
import ClientDetail from "./clientDetail";
function ListaClients(props) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentClient, setCurrentClient] = useState({});

  const onShowDetail = (client) => {
    setCurrentClient(client)
    setShowDetail(!showDetail);
  };


  return (
    <div>
      {showDetail && (
        <ClientDetail client={currentClient} onClose={()=>{setShowDetail(false)}} onDelete={()=>props.onDelete(currentClient.id)} onEdit={props.onEdit}></ClientDetail>
      )}
      <table className={styles.table}>
        <thead>
          <tr className={styles.title}>
            <td>Nome</td>
            <td>Email</td>
            <td>Veículo</td>
            <td>Marca</td>
          </tr>
        </thead>
        <tbody>
          {props.lista.length > 0 &&
            props.lista.map((i) => (
              <tr key={i.id} className={styles.row} onClick={()=>onShowDetail(i)}>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.car.model}</td>
                <td>{i.car.brand}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClients;
