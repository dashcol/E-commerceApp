import { useLocation } from "react-router-dom";
import "./forgot-pass.css";

export default function Forgot() {
  const location = useLocation();
  const email = location.state?.email || "";
  console.log(email);

  return (
    <div className="forgot-container">
      <h1 className="forgot-title">Forgot Password</h1>
      <form className="forgot-form">
        <input
          type="text"
          placeholder="Email"
          value={email}
          className="forgot-input"
        />
        <button type="submit" className="forgot-button">
          Submit
        </button>
      </form>
    </div>
  );
}
