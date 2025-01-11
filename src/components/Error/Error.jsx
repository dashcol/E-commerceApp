// Error.js
import React from "react";
import "./error.css";

export default function Error({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">❌</div>
      <p className="error-message">
        {message || "An unexpected error has occurred."}
      </p>
    </div>
  );
}
