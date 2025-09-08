import React, { useState } from "react";
import { useLocation } from "react-router-dom";  // detect current page
import { FiLogIn, FiLogOut } from "react-icons/fi"; // door/arrow icons
import innocomLogo from "../images/innocom.jpg";
import kcgLogo from "../images/kcg-logo-new.jpg";
import cseLogo from "../images/cse-logo_2.jpg";
import ietLogo from "../images/IET.png";
import ietLogo2 from "../images/IET-2.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isProfilePage = location.pathname === "/profile"; // check if profile page

  return (
    <>
      <header className="header">
        <div className="logo-section">
          <img src={kcgLogo} alt="KCG Logo" className="logo" />
          <img src={cseLogo} alt="CSE Logo" className="logo" />
          <img src={innocomLogo} alt="Innocom Logo" className="logo" />
          {/* Conditional IET Logos */}
          <img src={ietLogo2} alt="IET Logo Desktop" className="logo iet-desktop" />
          <img src={ietLogo} alt="IET Logo Mobile" className="logo iet-mobile" />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/domains">Domains</a>
          <a href="/about-us">About</a>

          {/* Conditional Login/Logout with icons */}
          {isProfilePage ? (
            <a href="/login" className="login-btn">
              Logout
              <FiLogOut size={20} style={{ marginLeft: "6px" }} />
            </a>
          ) : (
            <a href="/login" className="login-btn">
              Login
              <FiLogIn size={20} style={{ marginLeft: "6px" }} />
            </a>
          )}
        </nav>

        {/* Hamburger Menu (Mobile Only) */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>

        {/* Popup Menu */}
        {menuOpen && (
          <div className="popup-menu">
            <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="/domains" onClick={() => setMenuOpen(false)}>Domains</a>
            <a href="/about-us" onClick={() => setMenuOpen(false)}>About</a>

            {isProfilePage ? (
              <a href="/login" className="login-btn mobile-login" onClick={() => setMenuOpen(false)}>
                Logout
                <FiLogOut size={18} style={{ marginLeft: "6px" }} />
              </a>
            ) : (
              <a href="/login" className="login-btn mobile-login" onClick={() => setMenuOpen(false)}>
                Login
                <FiLogIn size={18} style={{ marginLeft: "6px" }} />
              </a>
            )}
          </div>
        )}
      </header>

      <style>{`
        .header {
          background-color: black;
          color: white;
          padding: 20px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Courier New', monospace;
          position: relative;
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo {
          height: 60px;
          width: auto;
          margin-right: 8px;
          border-radius: 5px;
          object-fit: cover;
        }

        .nav-links {
          display: flex;
          align-items: center;
          font-family: 'Courier New', monospace;
          background: linear-gradient(to right, #007BFF, #04fdbfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          margin-left: 16px;
          font-weight: 600;
          font-size: 26px;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .nav-links a:hover {
          color: #ffcc00;
        }

        /* Login/Logout button */
        .login-btn {
          background: linear-gradient(to right, #007BFF, #04fdbfff);
          color: white !important;
          -webkit-text-fill-color: white !important;
          padding: 8px 18px;
          border-radius: 25px;
          font-size: 18px !important;
          font-weight: bold;
          transition: background 0.3s ease;
          text-decoration: none;
          margin-left: 20px;
          display: flex;
          align-items: center;
        }
        .login-btn:hover {
          background: #0056b3;
          color: #fff !important;
        }

        .menu-toggle {
          display: none;
          font-size: 20px;
          cursor: pointer;
          background-color: #222;
          padding: 6px 12px;
          border-radius: 6px;
          transition: background 0.3s ease, transform 0.3s ease;
          user-select: none;
          font-weight: bold;
        }
        .menu-toggle:hover {
          background-color: #333;
        }
        .menu-toggle:active {
          transform: scale(0.95);
        }

        .popup-menu {
          position: absolute;
          top: 70px;
          right: 16px;
          background: #1a1a1a;
          border: 1px solid #333;
          padding: 16px 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          z-index: 999;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
          animation: fadeIn 0.3s ease-in-out;
          min-width: 160px;
        }

        .popup-menu a {
          color: #fff;
          text-decoration: none;
          padding: 10px 12px;
          font-size: 17px;
          font-weight: 600;
          border-radius: 8px;
          transition: background 0.2s ease, color 0.2s ease;
          display: flex;
          align-items: center;
        }
        .popup-menu a:hover {
          background: #333;
          color: #00ffff;
        }

        /* Mobile-specific login button */
        .mobile-login {
          margin-top: 10px;
          text-align: center;
        }
          .iet-desktop {
        display: inline-block;
      }
      .iet-mobile {
        display: none;
      }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .menu-toggle {
            display: block;
            color: white;
          }

          .logo {
            height: 35px;
            margin-right: 5px;
          }

          .header {
            padding: 12px;
          }
            .login-btn {
            font-size: 18px;
            margin-left: 0;
            padding: 8px 16px;
            justify-content: center;
          }
            .iet-desktop {
            display: none;
          }
          .iet-mobile {
            display: inline-block;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </>
  );
}

export default Header;
