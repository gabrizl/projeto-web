import { useState } from "react";
import styles from "../App.module.css";
import NavBar from "../components/layout/NavBar";
import ClientPage from "./ClientPage";
import ServicePage from "./ServicePage";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [changeView, setchangeView] = useState("client");

  const showView = (e) => {
    setchangeView(e);
  };

  const logout = ()=>{
    return navigate("/login");
  }
  
  return (
    <div className={styles.container}>
      <NavBar showView={showView} logout={logout}></NavBar>

      <div className={styles.content}>
        {changeView === "client" ? (
          <ClientPage></ClientPage>
        ) : (
          <ServicePage></ServicePage>
        )}
      </div>
    </div>
  );
}

export default Home;
