import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./compoments/Login/Login";
import Register from "./compoments/Register/Register";
import Dashboard from "./compoments/Dashboard/Dashboard";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [logUsername, setLogUsername] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const handleSetAuth = () => {
    setAuth(!auth);
    alert(`Auth is set to ${!auth}`);
  };

  const handleLogOut = () => {
    setAuth(!auth);
    localStorage.removeItem("token");
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (regUsername === "" || regPassword === "") {
      alert("Fill full information to create account");
    } else {
      try {
        let account = { username: regUsername, password: regPassword };
        const res = await axios.post("http://localhost:5000/register", account);
        const data = res.data;
        alert(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLoginAccount = async (e) => {
    e.preventDefault();
    if (logUsername === "" || logPassword === "") {
      alert("Fill full information to login");
    } else {
      try {
        const account = { username: logUsername, password: logPassword };
        const res = await axios.post("http://localhost:5000/login", account);
        const data = {
          token: res.data.token,
          msg: res.data.message,
        };

        // alert(data.msg);

        // Strore token to localStorage
        localStorage.setItem("token", data.token);

        // Set Auth sate to true
        auth === false && setAuth(!auth);
        // alert(`Auth is set to ${!auth}`);

        // Move to dashboard page
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  // useEffect to verify account
  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        const verify = {
          token: token,
        };
        const res = await axios.post("http://localhost:5000/verify", verify);
        const data = res.data;
        // console.log(data);

        setUser(data.user);

        // Set Auth sate to true
        auth === false && setAuth(!auth);
        // console.log("useEffect verify check:", auth);

        return () => {
          localStorage.removeItem("token");
        };
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    verifyAccount();
  }, [auth]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              handleSetAuth={handleSetAuth}
              setLogUsername={setLogUsername}
              setLogPassword={setLogPassword}
              handleLoginAccount={handleLoginAccount}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setRegUsername={setRegUsername}
              setRegPassword={setRegPassword}
              handleCreateAccount={handleCreateAccount}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes auth={auth}>
              <Dashboard handleLogOut={handleLogOut} user={user} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
