import { useState } from "react";
import styles from "../styles/lista.module.css";
import ServiceDetail from "./serviceDetail";
function ListaService(props) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentClient, setCurrentClient] = useState({});

  const onShowDetail = (client) => {
    setCurrentClient(client)
    setShowDetail(!showDetail);
  };

  return (
    <div>
      {showDetail && (
        <ServiceDetail client={currentClient} onClose={()=>{setShowDetail(false)}} onDelete={()=>props.onDelete(currentClient.id)} onEdit={props.onEdit}></ServiceDetail>
      )}
      <table className={styles.table}>
        <thead>
          <tr className={styles.title}>
            <td>Cliente</td>
            <td>Veículo</td>
            <td>Valor do serviço</td>
            <td>status</td>
          </tr>
        </thead>
        <tbody>
          {props.lista.length > 0 &&
            props.lista.map((i) => (
              <tr key={i.id} className={styles.row}  onClick={()=>onShowDetail(i)}>
                <td>{i.client}</td>
                <td>{i.car}</td>
                <td>R$ {i.price}</td>
                <td>{i.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaService;
