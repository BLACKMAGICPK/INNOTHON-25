import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BASE_URL from "../Configure";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword)
      return alert("Please fill all fields");

    if (newPassword !== confirmPassword)
      return alert("Passwords do not match");

    setLoading(true); 
    try {
      const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (!res.ok)  { setLoading(false);  return alert(data.message); }

      alert("Password updated successfully!");
      navigate("/"); // Go back to login
    } catch (err) {
      console.error("Reset error:", err);
      alert("Something went wrong. Try again.");
    } finally{
       setLoading(false); 
    }
  };

  return (
    <>
      <div className="reset-container">
        <Header />
        <div className="reset-content">
          <h2 className="form-title">Set New Password</h2>

          <div className="form-group">
            <label>New Password:</label>
            <input
              type="text" // always visible
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="full-width-input"
            />

            <label>Confirm Password:</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="full-width-input"
              />
              <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-icon">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" disabled={loading}>
            {loading && <span className="spinner" />} {loading ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
      body {
          overscroll-behavior: none;
        }
        .reset-container {
          background: linear-gradient(to bottom, #000, #1a273a);
          color: white;
          font-family: 'Courier New', monospace;
          min-height: 100vh;
        }

        .reset-content {
          padding: 50px 20px;
          max-width: 500px;
          margin: auto;
        }

        .form-title {
          text-align: center;
          font-size: 28px;
          background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
        -webkit-background-clip: text; /* Clip the background to the text */
        -webkit-text-fill-color: transparent; /* Make the text color transparent */
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .full-width-input {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          border: 1px solid white;
          background-color: #ffffff0a;
          color: white;
          box-sizing: border-box;
        }

        .password-wrapper {
          position: relative;
        }

        .toggle-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: white;
        }

        button {
          padding: 12px;
          font-size: 18px;
          font-weight: bold;
          background: linear-gradient(to right, #007BFF, #04fdbfff);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Courier New', monospace;
        }

        button:hover {
          background: rgb(98, 116, 255);
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
      `}</style>
    </>
  );
}

export default ResetPassword;
