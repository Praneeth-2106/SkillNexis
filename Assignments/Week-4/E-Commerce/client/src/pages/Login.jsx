import { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      alert("Login Successful");

      window.location.href = "/";
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>🛍️ ShopEase</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <p className="login-note">
          Login to continue shopping
        </p>

      </div>
    </div>
  );
}

export default Login;