import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/home" Component={Home} />
        <Route
        path="*"
        element={<Navigate to="/login" replace />}
    />
      </Routes>
    </div>
  );
}

export default App;
