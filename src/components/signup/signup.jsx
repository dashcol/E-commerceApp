import { Link, useNavigate } from "react-router-dom";
import { useValue } from "../../Context/Context";
import { useState } from "react";
import "./signup.css";

export default function Signup() {
  const { handleSignup } = useValue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSignup({
      name,
      email,
      password,
      confirmPassword,
    });

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="email"
          required
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          required
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
          className="signup-input"
        />

        <button className="signup-button">Signup</button>

        <Link to="/login">
          <h4>Login</h4>
        </Link>
      </form>
    </div>
  );
}
