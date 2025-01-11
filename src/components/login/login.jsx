import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useValue } from "../../Context/Context";
import { useState } from "react";
export default function Login() {
  const { handleLogin } = useValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucsess = await handleLogin(email, password);

    if (sucsess) {
      navigate("/products");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <Link to="forgot-password" state={{ email }}>
          <p>forgot password?</p>
        </Link>
        <Link to="/signup">
          <h4>Signup</h4>
        </Link>
      </form>
    </div>
  );
}
