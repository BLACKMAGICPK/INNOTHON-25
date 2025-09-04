import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import BASE_URL from "../Configure";
import { FaArrowLeft } from "react-icons/fa";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [userData, setUserData] = useState(null);
  const [problemStatement, setProblemStatement] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getUser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          fetchProblemStatement(data.ps_id); // Fetch problem statement using new API
        } else {
          alert(data.message || "Unable to fetch profile data");
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        alert("Something went wrong");
      }
    };

    const fetchProblemStatement = async (ps_id) => {
      try {
        const res = await fetch(`${BASE_URL}/getProblemStatementById`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ps_id })
        });
        const data = await res.json();
        if (res.ok) {
          setProblemStatement(data);
        } else {
          console.warn("⚠️ Problem statement not found:", data.error);
        }
      } catch (err) {
        console.error("Error fetching problem statement:", err);
      }
    };

    fetchData();
  }, [userId]);

  const handleBack = () => navigate(-1);

  return (
    <>
      <div className="profile-container">
        <Header />
        <div className="profile-content">
          <div className="profile-header">
            <FaArrowLeft className="back-icon" onClick={handleBack} />
            <h2 className="form-title">Team Profile</h2>
          </div>

          {!userData ? (
            <p className="loading">Loading profile...</p>
          ) : (
            <div className="profile-card">
              <div className="card-header">
                <div></div>
                 <div className="ps-id-tag">{userData.ps_id}</div>
                <div className="user-id-tag">{userData.userId}</div>
              </div>

              <h2 className="team-name">{userData.teamName}</h2>
              <h2 className="Project-domain">{userData.ps_title}</h2>

              <hr />
              <h4>Team Lead</h4>
              <div className="section">
                <div className="field-block"><strong>Name:</strong> {userData.lead.name}</div>
                <div className="field-block"><strong>Email:</strong> {userData.lead.email}</div>
                <div className="field-block"><strong>Phone:</strong> {userData.lead.phone}</div>
                <div className="field-block"><strong>Gender:</strong> {userData.lead.gender}</div>
                <div className="field-block"><strong>State:</strong> {userData.state}</div>
                <div className="field-block"><strong>Department:</strong> {userData.lead.department}</div>
                <div className="field-block"><strong>College:</strong> {userData.lead.college}</div>
                <div className="field-block"><strong>Team Count:</strong> {userData.teamCount}</div>
              </div>

              {userData.teamMembers?.length > 0 && (
                <>
                  <hr />
                  <h4>Team Members</h4>
                  {userData.teamMembers.map((member, index) => (
                    <div key={index} className="member-block section">
                      <div className="field-block"><strong>Member {index + 1} Name:</strong> {member.name}</div>
                      <div className="field-block"><strong>Email:</strong> {member.email}</div>
                      <div className="field-block"><strong>Phone:</strong> {member.phone}</div>
                      <div className="field-block"><strong>Department:</strong> {member.department}</div>
                    </div>
                  ))}
                </>
              )}

          {/* ✅ Problem Statement Section */}
          {problemStatement && (
  <>
    <hr />
    <h4>Problem Statement</h4>
    <div className="problem-card">
      <div className="code-box">{problemStatement.ps_id}</div>

      <h3 className="title">{problemStatement.ps_title}</h3>

      <div className="text-section">
        <p>
          <strong style={{ fontSize: "14px", color: "white" }}>Objective:</strong>{" "}
          {problemStatement.objective}
        </p>
        <p>
          <strong style={{ fontSize: "14px", color: "white" }}>Background:</strong>{" "}
          {problemStatement.background}
        </p>

        {problemStatement.expectedOutput && problemStatement.expectedOutput.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <strong style={{ fontSize: "14px", color: "white" }}>Expected Output:</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              {problemStatement.expectedOutput.map((item, idx) => (
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
          <img src={problemStatement.industry_logo} alt="Industry Logo" className="industry-logo" />
          <p className="industry-text">{problemStatement.industry_name}</p>
        </div>
        <div className="sdg-icons">
          <img src={problemStatement.sdg1} alt="SDG Goal 1" />
          <img src={problemStatement.sdg2} alt="SDG Goal 2" />
        </div>
      </div>
    </div>
  </>
)}

            

              
                

              </div>
          )}
        </div>
      </div>
      <style>{`
      body {
          overscroll-behavior: none;
        }
        .profile-container {
          background: linear-gradient(to bottom, #000, #1a273a);
          color: white;
          font-family: 'Courier New', monospace;
          min-height: 100vh;
        }

        .profile-content {
          padding: 40px 20px;
          max-width: 960px;
          margin: auto;
        }

        .profile-header {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 30px;
        }

        .form-title {
          font-size: 32px;
          background: linear-gradient(to right, #007BFF, #04fdbfff);
            -webkit-background-clip: text; /* Clip the background to the text */
          -webkit-text-fill-color: transparent; /* Make the text color transparent */
          overflow: hidden;
          
          
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

        .profile-card {
          background-color: #ffffff10;
          border-radius: 15px;
          padding: 30px;
          border: 1px solid #9dffff3b;
          font-size: 17px;
          line-height: 1.8;
          position: relative;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .user-id-tag {
          border: 1px solid #fff;
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
        }
          .ps-id-tag {
            border: 1px solid #fff;
            color: #fff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            align-items: left;
            justify-content: left;
            position: absolute;
          }


        .team-name {
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          color: #f6b73c;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .Project-domain {
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .profile-card h4 {
          margin-top: 25px;
          color: #00eaff;
          font-size: 20px;
        }

        .section {
          margin-left: 10px;
          padding-left: 10px;
          border-left: 2px solid #31cece80;
        }

        

        .member-block {
          margin-top: 15px;
          padding-left: 10px;
          border-left: 2px solid #31cece80;
        }

        .payment-img {
          max-width: 280px;
          height: auto;
          border-radius: 10px;
          margin-top: 15px;
          border: 1px solid #9dffff33;
        }

        .loading {
          text-align: center;
          margin-top: 50px;
          font-size: 22px;
          color: #ccc;
        }

        .text-section {
          font-family: 'Courier Prime', monospace;
          line-height: 1.5;
          font-size: 14px;
          color: #ccc;
          flex: 1;
          min-width: 300px;
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

        .flex-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 20px;
    }

    .flex-item {
    flex: 1 1 35%;
    min-width: 300px;
    }


        @media (min-width: 900px) {
          .section {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }

          .field-block {
            flex: 0 0 48%;
          }
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
            font-family: 'Courier Prime', monospace;
            line-height: 1.5;
            margin-bottom: 20px;
            font-size: 14px;
            color: #ccc;
            flex: 1;
            min-width: 0; /* ✅ Allow shrinking */
            word-wrap: break-word; /* ✅ Break long words */
            overflow-wrap: break-word; /* ✅ Alternative property */
            white-space: normal; /* ✅ Ensure wrapping */
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


        @media (max-width: 600px) {
          .profile-card {
            padding: 20px;
            font-size: 15px;
          }

          .form-title {
            font-size: 24px;
          }
            .title{
            font-size: 16px;}

            .text-section {
            font-size: 12px;
            }

          .payment-img {
            max-width: 100%;
          }

          .card-header {
            flex-direction: row;
            justify-content: space-between;
          }

          .team-name {
            font-size: 25px;
          }
            .Project-domain {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          
          margin-top: 10px;
          margin-bottom: 10px;
        }
          
        }
      `}</style>
    </>
    
  );
}

export default Profile;
