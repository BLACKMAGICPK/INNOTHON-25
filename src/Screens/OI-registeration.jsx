import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import qrImage from "../images/UPI.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BASE_URL from '../Configure';

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const openInnovationThemes = [
  "Artificial Intelligence & Machine Learning (AI/ML)",
  "Cybersecurity & Blockchain",
  "Augmented Reality & Virtual Reality (AR/VR)",
  "Web & App Development with Cloud"
];

function RegisterOpenInnovation() {
  const [teamCount, setTeamCount] = useState(1);
  const [paymentFile, setPaymentFile] = useState(null);
  const [loading, setLoading] = useState(false);
   const [title, setTitle] = useState("");
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPaymentFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // Upload payment screenshot to Cloudinary
      if (paymentFile) {
        const data = new FormData();
        data.append("file", paymentFile);
        data.append("upload_preset", "register");

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dizk7t2p6/image/upload",
          { method: "POST", body: data }
        );

        const cloudinaryData = await cloudinaryRes.json();
        imageUrl = cloudinaryData.secure_url;
      }

      const finalData = {
        ...formData,
        ps_id: "PS-OI",
        ps_title: title,   // use state instead of hardcoded string
        teamCount,
        paymentScreenshot: imageUrl,
      };


      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (!response.ok) {
        setLoading(false);
        alert(result.message || "Registration failed");
        return;
      }

      alert("Registered Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <Header />
        <div className="register-contant">
          <div className="header-bar">
            <FaArrowLeft className="back-icon" onClick={() => navigate(-1)} />
            <h2 className="form-title">Open Innovation Registration</h2>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <label>Team Name:</label>
            <input type="text" name="teamName" onChange={handleChange} required />

            <label>Lead Name:</label>
            <input type="text" name="leadName" onChange={handleChange} required />

            <label>Lead Phone No:</label>
            <input type="tel" name="leadPhone" onChange={handleChange} required />

            <label>Lead Email ID:</label>
            <input type="email" name="leadEmail" onChange={handleChange} required />

            <label>Set Password:</label>
            <input type="password" name="password" onChange={handleChange} required />

            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" onChange={handleChange} required />

            <label>Gender:</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label>State:</label>
            <select name="state" onChange={handleChange} required>
              <option value="">Select State</option>
              {statesOfIndia.map((state, i) => (
                <option key={i}>{state}</option>
              ))}
            </select>

            {/* Fixed Problem Statement Fields */}
            <label>Problem Statement ID:</label>
            <input
              type="text"
              value="PS-OI"
              readOnly
              style={{ backgroundColor: "#333", color: "white" }}
            />

             <label>Open Innovation Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your Open Innovation Title"
                  style={{ color: "white" }}
                  required
                />
                <label>Abstract of Your Open Innovation:(max 50 words) </label>
              <textarea
                name="projectabstract"
                value={formData.abstract || ""}
                onChange={handleChange}
                rows="5"
                placeholder="Write your abstract here"
                style={{ resize: "vertical", color: "white" }}
                required
              />

            {/* Open Innovation Theme Dropdown */}
            <p>Note: Your open innovation Idea must come under These Domains</p>
            <label>Select the Open Innovation Theme:</label>
            <select name="oiTheme" onChange={handleChange} required>
              <option value="">Select Theme</option>
              {openInnovationThemes.map((theme, i) => (
                <option key={i}>{theme}</option>
              ))}
            </select>

            <label>College:</label>
            <input type="text" name="college" onChange={handleChange} required />

            <label>Department:</label>
            <input type="text" name="department" onChange={handleChange} required />

            <label>Team Count (max 4 including lead):</label>
            <select
              value={teamCount}
              onChange={(e) => setTeamCount(parseInt(e.target.value))}
            >
              <option value={1}>1 (Solo)</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>

            {teamCount > 1 && (
              <>
                <h4>Member 1 Details:</h4>
                <label>Member 1 Name:</label>
                <input type="text" name="member1Name" onChange={handleChange} required />
                <label>Member 1 Phone No:</label>
                <input type="tel" name="member1Phone" onChange={handleChange} required />
                <label>Member 1 Email ID:</label>
                <input type="email" name="member1Email" onChange={handleChange} required />
                <label>Department:</label>
                <input type="text" name="member1Dept" onChange={handleChange} required />
              </>
            )}

            {teamCount > 2 && (
              <>
                <h4>Member 2 Details:</h4>
                <label>Member 2 Name:</label>
                <input type="text" name="member2Name" onChange={handleChange} required />
                <label>Member 2 Phone No:</label>
                <input type="tel" name="member2Phone" onChange={handleChange} required />
                <label>Member 2 Email ID:</label>
                <input type="email" name="member2Email" onChange={handleChange} required />
                <label>Department:</label>
                <input type="text" name="member2Dept" onChange={handleChange} required />
              </>
            )}

            {teamCount > 3 && (
              <>
                <h4>Member 3 Details:</h4>
                <label>Member 3 Name:</label>
                <input type="text" name="member3Name" onChange={handleChange} required />
                <label>Member 3 Phone No:</label>
                <input type="tel" name="member3Phone" onChange={handleChange} required />
                <label>Member 3 Email ID:</label>
                <input type="email" name="member3Email" onChange={handleChange} required />
                <label>Department:</label>
                <input type="text" name="member3Dept" onChange={handleChange} required />
              </>
            )}

            <label>Any food allergy for you or your teammates (describe here):</label>
            <textarea
              name="foodAllergy"
              onChange={handleChange}
              rows="3"
              placeholder="e.g., Peanut allergy, Lactose intolerance, etc."
              style={{ resize: "vertical" }}
            />

            <h4>UPI Payment:</h4>
            <p className="payment-note">
              Note: ₹100 per head for Initial Registration. This payment is only for Prefinals.
            </p>
            <img src={qrImage} alt="UPI QR Code" className="qr-code" />

            <label>Upload Payment Screenshot:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />

            <button type="submit" disabled={loading}>
              {loading && <span className="spinner" />}{" "}
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
      <style>{`
       body {
          overscroll-behavior: none;
        }
        .register-container {
          background: linear-gradient(to bottom, #000, #1a273a);
          color: white;
          
          font-family: 'Courier New', monospace;
          min-height: 100vh;
        }
        .register-contant{
          padding: 40px 20px;
          max-width: 960px;
          margin: auto;
         
        }
        .form-title {
        text-align: center;
        font-size: 28px;
        background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
        -webkit-background-clip: text; /* Clip the background to the text */
        -webkit-text-fill-color: transparent; /* Make the text color transparent */
        }
          
        .header-bar {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-bottom: 30px;
            }

            .back-icon {
            position: absolute;
            left: 0;
            font-size: 22px;
            cursor: pointer;
            color: #f0f0f0;
            }

            .back-icon:hover {
            color: #9dffff;
            }


        .register-form {
          max-width: 600px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
          
          
        }

        .register-form input,
        .register-form select {
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid white;
        background-color: #ffffff0a;
        color: white;
        }
        .register-form select option {
        background-color: #1a273a;
        color: white;
        }


        .register-form button {
          padding: 12px;
          font-size: 18px;
          font-weight: bold;
          background: linear-gradient(to right, #007BFF, #04fdbfff);
          color: black;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
          color: white;
          font-family: 'Courier New', monospace;
        }

        .register-form button:hover {
          background: rgb(98, 116, 255);
        }
          .register-form textarea {
          padding: 10px;
          font-size: 14px;
          border-radius: 5px;
          border: 1px solid white;
          background-color: #ffffff0a;
          color: white;
        }
        .register-form textarea::placeholder {
          color: #ccc;
        }
         .payment-note {
            font-size: 16px;
           
            text-align: center; /* Center the text */
            margin-bottom: 10px; /* Space below the note */
          } 


        .qr-code {
          width: 400px;
          display: block;
          margin: 10px auto;
          
          border-radius: 20px;
        }

        .preview {
          margin-top: 10px;
          text-align: center;
        }

        .screenshot {
          width: 200px;
          margin-top: 10px;
          border-radius: 10px;
          border: 1px solid #aaa;
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
          .register-form {
            padding: 0 10px;
          }
          .qr-code, .screenshot {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default RegisterOpenInnovation;
