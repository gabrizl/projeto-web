import { useState } from "react";
import styles from "../styles/auth.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post( "http://localhost:5000/api/user/login",formData);
      alert("Logado com sucesso");
      console.log(data.data);
      return navigate("/home");
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/img/engrenagem.png" alt="icon" width={200} />

        <form onSubmit={onLogin} className={styles.form}>
          <div className={styles.input_container}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className={styles.input_container}>
            <label htmlFor="senha">Senha</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Senha"
            />
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            ENTRAR
          </button>
        </form>
        <Link to="/register" style={{ width: "100%" }}>
          <button className={`${styles.btn} ${styles.btn_secondary}`}>
            CADASTRAR
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
