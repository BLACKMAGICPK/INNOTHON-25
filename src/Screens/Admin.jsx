import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BASE_URL from "../Configure";

function AdminPage() {
  // 🔹 Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Teams page state
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [psFilter, setPsFilter] = useState(""); 

  // 🔹 Fetch teams after login
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchTeams = async () => {
      try {
        const res = await fetch(`${BASE_URL}/registrations`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok && data.data) {
          setTeams(data.data);
        } else {
          alert(data.message || "Unable to fetch registered teams");
        }
      } catch (err) {
        console.error("❌ Error fetching registered teams:", err);
        alert("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [isLoggedIn]);

  // 🔹 Hardcoded admin credentials
  const handleLogin = () => {
    if (username === "Admin@innocom" && password === "WeInnocomCrew") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password!");
    }
  };

  // 🔹 Count teams per PS ID category
  const psCategories = ["PS-AI", "PS-AR", "PS-VR", "PS-WD", "PS-CS"];
  const psCounts = psCategories.reduce((acc, ps) => {
    acc[ps] = teams.filter(team => team.ps_id.startsWith(ps)).length;
    return acc;
  }, {});

  // 🔹 Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPS = psFilter ? team.ps_id.startsWith(psFilter) : true;
    return matchesSearch && matchesPS;
  });

  // 🔹 Render login form
  if (!isLoggedIn) {
    return (
      <div>
        <Header />
      <div className="login-container">
        <div className="login-content">
          <h2 className="form-title">Admin Login</h2>
          <div className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
        </div>

        <style>{`
          .login-container {
            background: linear-gradient(to bottom, #000, #1a273a);
            color: white;
            font-family: 'Courier New', monospace;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .login-content {
            padding: 40px 20px;
            max-width: 400px;
            width: 100%;
            margin-top: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .form-title {
            text-align: center;
            font-size: 28px;
            margin-bottom: 30px;
            background: linear-gradient(to right, #007BFF, #04fdbfff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            width: 100%;
          }
          .login-form input {
            padding: 10px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid white;
            background-color: #ffffff0a;
            color: white;
            width: 100%;
            box-sizing: border-box;
          }
          .login-form button {
            padding: 12px;
            font-size: 18px;
            font-weight: bold;
            background: linear-gradient(to right, #007BFF, #04fdbfff);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            color: #fff;
            font-family: 'Courier New', monospace;
            transition: 0.3s ease;
          }
          .login-form button:hover {
            background: rgb(98, 116, 255);
          }

          .password-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .toggle-password {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
            cursor: pointer;
            font-size: 20px;
          }
        `}</style>
      </div>
    );
  }

  // 🔹 Render admin teams page after login
  return (
    <>
      <div className="admin-container">
        <Header />
        <div className="admin-content">
          <h2 className="form-title">All Registered Teams</h2>

          {/* 🔹 Stats & Search Container */}
          <div className="stats-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by Team Name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 🔹 PS Filter Dropdown */}

            <div className="stats-box">
              <p><strong>Total Teams:</strong> {teams.length}</p>
              <div className="ps-counts">
                {psCategories.map(ps => (
                  <div key={ps} className="ps-count">
                    <strong>{ps}:</strong> {psCounts[ps]}
                  </div>
                ))}
              </div>
            </div>
          </div>
            <div className="ps-filter">
              <label>Filter by PS ID: </label>
              <select
                value={psFilter}
                onChange={e => setPsFilter(e.target.value)}
              >
                <option value="">All</option>
                {psCategories.map(ps => (
                  <option key={ps} value={ps}>{ps}</option>
                ))}
              </select>
            </div>

          {loading ? (
            <p className="loading">Loading teams...</p>
          ) : filteredTeams.length === 0 ? (
            <p className="loading">No teams found.</p>
          ) : (
            filteredTeams.map((team, index) => (
              <div key={index} className="profile-card">
                <div className="card-header">
                  <div className="ps-id-tag">{team.ps_id}</div>
                  <div className="user-id-tag">{team.userId}</div>
                </div>

                <h2 className="team-name">{team.teamName}</h2>
                <h2 className="Project-domain">{team.ps_title}</h2>

                <hr />
                <h4>Team Lead</h4>
                <div className="section">
                  <div className="field-block"><strong>Name:</strong> {team.lead_name}</div>
                  <div className="field-block"><strong>Email:</strong> {team.lead_email}</div>
                  <div className="field-block"><strong>Phone:</strong> {team.lead_phone}</div>
                  <div className="field-block"><strong>Gender:</strong> {team.lead_gender}</div>
                  <div className="field-block"><strong>State:</strong> {team.state}</div>
                  <div className="field-block"><strong>Department:</strong> {team.lead_department}</div>
                  <div className="field-block"><strong>College:</strong> {team.lead_college}</div>
                  <div className="field-block"><strong>Team Count:</strong> {team.teamCount}</div>
                  <div className="field-block"><strong>Food Allergy:</strong> {team.foodAllergy}</div>
                  <div className="field-block">
                    <strong>Payment Screenshot:</strong><br />
                    <a href={team.paymentScreenshot} target="_blank" rel="noopener noreferrer">
                      {team.paymentScreenshot}
                    </a>
                  </div>
                </div>

                <hr />
                <h4>Team Members</h4>
                {["member1", "member2", "member3"].map(m => (
                  team[`${m}_name`] && (
                    <div key={m} className="member-block section">
                      <div className="field-block"><strong>Name:</strong> {team[`${m}_name`]}</div>
                      <div className="field-block"><strong>Email:</strong> {team[`${m}_email`]}</div>
                      <div className="field-block"><strong>Phone:</strong> {team[`${m}_phone`]}</div>
                      <div className="field-block"><strong>Department:</strong> {team[`${m}_department`]}</div>
                    </div>
                  )
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .admin-container { background: linear-gradient(to bottom, #000, #1a273a); color: white; font-family: 'Courier New', monospace; min-height: 100vh; }
        .admin-content { padding: 30px 20px; max-width: 900px; margin: auto; }
        .form-title { font-size: 32px; text-align: center; margin-bottom: 20px; background: linear-gradient(to right, #007BFF, #04fdbfff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .stats-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 25px; padding: 15px 20px; border-radius: 12px; background-color: #ffffff15; border: 1px solid #31cece80; max-width: 1000px; margin-left: auto; margin-right: auto; }
        .search-box { width: 100%; display: flex; justify-content: center; margin-bottom: 10px; }
        .search-box input { width: 80%; max-width: 300px; padding: 8px 12px; font-size: 15px; border-radius: 8px; border: none; outline: none; background-color: #ffffff10; color: #fff; text-align: center; }
        .search-box input::placeholder { color: #ccc; }

        .ps-filter { margin-bottom: 15px; text-align: center; }
        .ps-filter select { padding: 6px 10px; border-radius: 6px; border: none; background-color: #ffffff10; color: #fff; }

        .stats-box { width: 100%; text-align: center; }
        .ps-counts { display: flex; justify-content: space-evenly; flex-wrap: wrap; margin-top: 10px; }
        .ps-count { font-size: 14px; margin: 5px 0; padding: 5px 10px; background-color: #31cece30; border-radius: 8px; }

        .profile-card { background-color: #ffffff10; border-radius: 10px; padding: 18px; margin-bottom: 20px; border: 1px solid #9dffff3b; font-size: 15px; line-height: 1.6; }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .ps-id-tag, .user-id-tag { border: 1px solid #fff; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; }
        .team-name { text-align: center; font-size: 22px; font-weight: bold; color: #f6b73c; margin-top: 5px; margin-bottom: 5px; }
        .Project-domain { text-align: center; font-size: 14px; font-weight: bold; margin-bottom: 8px; }
        h4 { margin-top: 15px; color: #00eaff; font-size: 16px; }
        .field-block { font-size: 14px; }
        .field-block a { color: #00eaff; text-decoration: underline; word-break: break-all; }

        .section { margin-left: 10px; padding-left: 10px; border-left: 2px solid #31cece80; }
        .member-block { margin-top: 15px; padding-left: 10px; border-left: 2px solid #31cece80; }
        .loading { text-align: center; margin-top: 50px; font-size: 22px; color: #ccc; }

        @media (max-width: 900px) { .stats-container { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </>
  );
}

export default AdminPage;
