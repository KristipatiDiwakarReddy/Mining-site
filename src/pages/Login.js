import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { defaultContent as content } from "../content";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
      console.error("Firebase Auth Error:", err.code, err.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>{content.login.heading}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder={content.login.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          /><br />
          <input
            type="password"
            placeholder={content.login.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          /><br />
          <button type="submit" className="login-btn">{content.login.button}</button>
        </form>
        {error && <p className="login-error">{content.login.error}</p>}
      </div>
      <style>{`
        .login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
        }
        .login-card {
          background: #fff;
          padding: 2.5rem 2rem 2rem 2rem;
          border-radius: 18px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
          min-width: 340px;
          max-width: 90vw;
          text-align: center;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .login-input {
          padding: 0.7rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .login-input:focus {
          border: 1.5px solid #4f8cff;
          box-shadow: 0 0 0 2px #e0eafc;
        }
        .login-btn {
          background: linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.8rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79, 140, 255, 0.08);
          transition: background 0.2s, transform 0.1s;
        }
        .login-btn:hover {
          background: linear-gradient(90deg, #38b6ff 0%, #4f8cff 100%);
          transform: translateY(-2px) scale(1.03);
        }
        .login-error {
          color: #e74c3c;
          background: #fff0f0;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          font-size: 0.98rem;
        }
      `}</style>
    </div>
  );
};

export default Login;
