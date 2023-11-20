import styles from '../../styles/navbar.module.css';
import CustomButton from '../CustomButton';

function NavBar(props) {
  return (
    <div className={styles.container}>
      <div>
      <p className={styles.title}> Garage gestor</p>
        <img src='/img/engrenagem.png' alt='icon' width={100}/>

        <div className={styles.buttons}>
          <CustomButton text="Clientes" iconUrl="/img/pessoa.png" onClick={() =>props.showView("client")}/>
          <CustomButton text="Serviços" iconUrl="/img/chave.png" onClick={() =>props.showView("service")}/>
        </div>
        
      </div>
      <div className={styles.logout} onClick={()=>props.logout()}>
        <p>Logout</p>
        <img src='/img/logout.png' alt='icon' width={25}/>
      </div>
        
    </div>
  );
}

export default NavBar;
