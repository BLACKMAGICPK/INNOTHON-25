import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../Configure';

function ProblemStatement() {
  const navigate = useNavigate();
  const [psData, setPsData] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    

  useEffect(() => {
    fetch(`${BASE_URL}/get_ARVR_PS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setPsData(data)) // Expecting an array now
      .catch((err) => console.error("Error fetching problem statements:", err));
  }, []);

  return (
    <>
      <div className="problem-container">
        <Header />
        <main className="problem-content">
          <div className="header-bar">
            <FaArrowLeft className="back-icon" onClick={handleBack} />
            <h2 className="section-heading">ARVR - Problem Statements</h2>
          </div>

          {psData.map((ps, index) => (
            <div className="problem-card" key={index}>
              <div className="code-box">{ps.ps_id}</div>

              <h3 className="title">{ps.ps_title}</h3>

              <div className="text-section">
              <p>
                <strong style={{ fontSize: "15px", color: "white" }}>Objective:</strong>{" "}
                {ps.objective}
              </p>
              <p>
                <strong style={{ fontSize: "15px", color: "white" }}>Background:</strong>{" "}
                {ps.background}
              </p>
              {ps.expectedOutput && ps.expectedOutput.length > 0 && (
                <div>
                  <strong style={{ fontSize: "15px", color: "white" }}>Expected Output:</strong>
                  <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
                    {ps.expectedOutput.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: "6px", color: "#ccc" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

              <div className="top-row">
                <div className="industry-box">
                  <img src={ps.industry_logo} alt="Industry Logo" className="industry-logo" />
                  <p className="industry-text">{ps.industry_name}</p>
                </div>
                <div className="sdg-icons">
                  <img src={ps.sdg1} alt="SDG Goal 1" />
                  <img src={ps.sdg2} alt="SDG Goal 2" />
                </div>
              </div>

               <button
                className="register-button"
                onClick={() => navigate("/register", { state: { ps_id: ps.ps_id , ps_title: ps.ps_title} })}
              >
                Register
              </button>
            </div>
          ))}
        </main>
      </div>

      <style>{`
      body {
          overscroll-behavior: none;
        }
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

  .problem-container {
    min-height: 100vh;
    background: linear-gradient(to bottom, #000, #0c172d);
    color: white;
    font-family: 'Courier New', monospace;
    padding-bottom: 60px;
  }

  .problem-content {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px; /* ✅ Adds vertical space between each container */
}


  .header-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
  }

  .back-icon {
    font-size: 22px;
    cursor: pointer;
    color: #f0f0f0;
  }

  .section-heading {
    font-size: 30px;
    font-weight: bold;
     background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
          -webkit-background-clip: text; /* Clip the background to the text */
          -webkit-text-fill-color: transparent; /* Make the text color transparent */
    flex-grow: 1;
    text-align: center;
  }

  .problem-card {
    background-color: #ffffff0a;
    border: 2px solid #ffffff33;
    border-radius: 20px;
    padding: 24px;
    position: relative;
  }

    .code-box {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #ffffff0a;       /* updated background */
    color: white;                /* changed text color to white */
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid white;     /* added border */
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    color: #ffb700;
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
  }

  .text-section {
    font-family: 'Courier New', monospace;
    line-height: 1.5;
    margin-bottom: 20px;
    font-size : 14px;
    color:#ccc;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .industry-box {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .industry-logo {
    width: 60px;
    height: 60px;
    border-radius: 10%;
    object-fit: cover;
  
  }

  .industry-text {
    font-size: 16px;
  }

  .sdg-icons {
    display: flex;
    gap: 10px;
    
  }

  .sdg-icons img {
    width: 60px;
    border-radius: 4px;
  }

    .register-button {
    margin: 30px auto 0;
    display: block;
    padding: 12px 32px;
    font-size: 16px;
    background: linear-gradient(to right, #007BFF, #04fdbfff);       /* updated button color */
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }

  .register-button:hover {
    background: rgb(98, 116, 255);
  }

  @media (max-width: 768px) {
    .top-row {
      flex-direction: row;
      gap: 20px;
      align-items: center;
    }

    .title {
      font-size: 18px;
    }

    .industry-text {
      text-align: center;
    }
    .sdg-icons img{
    width:40px;
    }
    .industry-logo{
      width: 50px;
      height: 50px;
      }
    .section-heading {
      font-size: 18px;
    }
  }
`}</style>
    </>
  );
}

export default ProblemStatement;
