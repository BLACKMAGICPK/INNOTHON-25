import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Configure";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email");

      setLoading(true);
    try {
      // Check if user exists
      const checkRes = await fetch(`${BASE_URL}/checkuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const checkData = await checkRes.json();
        if (!checkRes.ok || !checkData.exists) {
      setLoading(false);
      return alert("Email not registered");
    }

      // Send OTP
      const res = await fetch(`${BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
      setLoading(false);
      return alert(data.message);
    }
      setOtpSent(true);
      setMessage("✅ OTP sent to your email successfully.");
    } catch (err) {
      console.error("OTP sending error", err);
      alert("Something went wrong. Try again.");
    }finally {
    setLoading(false);
  }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok)  {
        setLoading(false); 
        return alert(data.message || "Invalid OTP");
      };

      // ✅ OTP verified, go to reset password page
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      console.error("OTP verification failed", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="forgot-container">
        <Header />
        <div className="forgot-content">
          <h2 className="form-title">Reset Your Password</h2>
          <p className="info-text">Enter your registered email to receive an OTP.</p>

          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              required
            />
            <button onClick={handleSendOtp} disabled={otpSent}>{loading && <span className="spinner" />} {loading ? "Sending OTP..." : "Send OTP"}</button>

            {message && <p className="success-text">{message}</p>}

            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button onClick={handleVerifyOtp}>{loading && <span className="spinner" />} {loading ? "Verifying OTP..." : "Verify OTP"}</button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
      body {
          overscroll-behavior: none;
        }
        .forgot-container {
          background: linear-gradient(to bottom, #000, #1a273a);
          color: white;
          font-family: 'Courier New', monospace;
          min-height: 100vh;
        }

        .forgot-content {
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
          margin-bottom: 10px;
        }

        .info-text {
          text-align: center;
          font-size: 16px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          border: 1px solid white;
          background-color: #ffffff0a;
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
          transition: 0.3s ease;
          font-family: 'Courier New', monospace;
        }

        button:hover {
          background: rgb(98, 116, 255);
        }

        .success-text {
          color: #81f581;
          font-weight: bold;
          text-align: center;
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
          .form-group {
            padding: 0 10px;
          }
        }
      `}</style>
    </>
  );
}

export default ForgotPassword;
