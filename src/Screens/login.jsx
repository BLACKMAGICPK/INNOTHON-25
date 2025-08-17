import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BASE_URL from '../Configure';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
       if (!response.ok) {
      alert(data.message);
      setLoading(false);
      return;
    }

      navigate("/profile", { state: { userId: data.userId } });
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <>
      <div className="login-container">
        <Header />
        <div className="login-content">
          <h2 className="form-title">Team Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" disabled={loading}>
            {loading && <span className="spinner" />} {loading ? "Logging in..." : "Login"}
          </button>
          </form>

          <p className="register-link">
            Don't know password?{" "}
            <span onClick={() => navigate("/forgot-password")}>Forgot Password</span>
          </p>

          <p className="register-link">
            Didn't register yet? Explore the problem statements.{' '}
            <span onClick={() => navigate("/domains")}>Register</span>
          </p>
        </div>
      </div>
   

      <style>{`
      body {
          overscroll-behavior: none;
        }
        .login-container {
          background: linear-gradient(to bottom, #000, #1a273a);
          color: white;
          font-family: 'Courier New', monospace;
          min-height: 100vh;
        }

        .login-content {
          padding: 40px 20px;
          max-width: 500px;
          margin: auto;
        }

        .form-title {
          text-align: center;
          font-size: 28px;
          background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
        -webkit-background-clip: text; /* Clip the background to the text */
        -webkit-text-fill-color: transparent; /* Make the text color transparent */
          margin-bottom: 30px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          font-weight: bold;
        }

        .login-form input,
        .password-wrapper input {
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid white;
        background-color: #ffffff0a;
        color: white;
        width: 100%;
        box-sizing: border-box;
        }


        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 60%;
          transform: translateY(-50%);
          color: white;
          cursor: pointer;
          font-size: 20px;
        }

        .login-form button {
          padding: 12px;
          font-size: 18px;
          font-weight: bold;
           background: linear-gradient(to right, #007BFF, #04fdbfff);
          color: black;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
          color: #fff;
          font-family: 'Courier New', monospace;
        }

        .login-form button:hover {
          background:rgb(98, 116, 255);
        }

        .register-link {
          text-align: center;
          margin-top: 20px;
          font-size: 16px;
          font-weight: bold;
        }

        .register-link span {
          color: #31cece;
          cursor: pointer;
          text-decoration: underline;
        }

        .register-link span:hover {
          color: #25a3a3;
        }

        .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid #fff;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        display: inline-block;
        margin-right: 8px;
        vertical-align: middle;
        }

        @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .login-form {
            padding: 0 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Login;
