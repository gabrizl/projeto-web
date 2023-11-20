import { useState } from "react";
import styles from "../styles/auth.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      formData.id = formData.id = Math.floor(Math.random() * 30000) + 20000;
      const data = await axios.post( "http://localhost:5000/api/user/register", formData);
      alert("Cadastrado com sucesso");
      console.log(data);
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

        <form onSubmit={onRegister} className={styles.form}>
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
          <div className={styles.input_container}>
            <label htmlFor="senha">Confirmar senha</label>
            <input
              className={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Senha"
            />
          </div>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            CADASTRAR
          </button>
        </form>
      </div>
      <p>
        Já possui uma conta?{" "}
        <Link to="/login" style={{ color: "#FEAF00", fontWeight: "bold" }}>
          Entre
        </Link>
        .
      </p>
    </div>
  );
}

export default Register;
