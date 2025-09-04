import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin } from 'react-icons/fa';


import Header from "../Components/Header";

// Import icons
import {
  FaCode, FaBrain, FaCloud, FaLock, FaMobileAlt, FaVrCardboard, FaQuestionCircle,
  FaTrophy, FaShieldAlt, FaAward, FaTools, FaCertificate, FaGift
} from "react-icons/fa";

function Domains() {
   const navigate = useNavigate();
    useEffect(() => {
            const sections = document.querySelectorAll('.section');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
                });
            }, { threshold: 0.2 });

            sections.forEach(section => observer.observe(section));

            return () => {
                sections.forEach(section => observer.unobserve(section));
            };
            }, []);

            



 const domains = [
  {
    name: "Artificial Intelligence & Machine Learning (AI/ML)",
    icon: <FaBrain />,
    desc: "Develop intelligent systems using AI, deep learning, NLP, and computer vision.",
    path: "/aiml-ps",
  },
  {
    name: "Cybersecurity & Blockchain",
    icon: <FaLock />,
    desc: "Build secure solutions with encryption, blockchain, and cyber defense.",
    path: "/cs-ps",
  },
  {
    name: "Augmented Reality & Virtual Reality (AR/VR)",
    icon: <FaVrCardboard />,
    desc: "Design immersive AR/VR experiences for gaming, education, and healthcare.",
    path: "/arvr-ps",
  },
  {
    name: "Web & App Development with Cloud",
    icon: <FaMobileAlt />,
    desc: "Create responsive web and mobile apps with cloud integration.",
    path: "/wd-ps",
  },
];




  const awards = [
  {
    name: "Overall Title Winner",
    icon: <FaTrophy />,
    desc: "Awarded to the team with the most outstanding performance across all domains.",
  },
  {
    name: "2nd Prize Winner",
    icon: <FaAward />,
    desc: "Awarded to the team securing the second overall position.",
  },
  {
    name: "3rd Prize Winner",
    icon: <FaAward />,
    desc: "Awarded to the team securing the third overall position.",
  },
  {
    name: "Domain-Wise Title Winner",
    icon: <FaShieldAlt />,
    desc: "One winning team will be chosen from each project domain.",
  },
];


  return (
    <>
        <Header />
      <div className="domains-container">
        <main className="domains-content">
          <h2 className="tagline">&lt; Explore INNOTHON'25 Domains & Awards /&gt;</h2>

          {/* Domains Section */}
          <section className="section">
            <h3 className="section-title">Project Domains</h3>
            <div className="card-grid">
              {domains.map((domain, index) => (
                <div
                  className="info-card"
                  key={index}
                  style={{ '--i': index }}
                  onClick={() => navigate(domain.path)}
                >
                  <div className="icon">{domain.icon}</div>
                  <span className="title">{domain.name}</span>
                  <p className="desc">&lt; {domain.desc} /&gt;</p>
                </div>
              ))}
            </div>

          

          </section>

          {/* Awards Section */}
          <section className="section">
            <h3 className="section-title">Announcement of the Awards</h3>
            <div className="card-grid">
              {awards.map((award, index) => (
                <div className="info-card" key={index} style={{ '--i': index }}>
                  <div className="icon">{award.icon}</div>
                  <span className="title">{award.name}</span>
                  <p className="desc">&lt; {award.desc} /&gt;</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <span>© Developed by Team - LogicLoopers</span>
                <a href="https://www.instagram.com/logicloopersofficial/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram style={{ color: '#ccc', fontSize: '1.5rem' }} />
                </a>
                <a href="https://www.linkedin.com/company/logic-loopers/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin style={{ color: '#ccc', fontSize: '1.5rem' }} />
                </a>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        body {
            overscroll-behavior: none;
          }
        .domains-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000, #0c172d);
          color: white;
          font-family: 'Courier New', monospace;
          
        }

        .domains-content {
          padding: 40px 20px;
          max-width: 960px;
          margin: auto;
          text-align: center;
        }

        .tagline {
          font-size: 20px;
          background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
          -webkit-background-clip: text; /* Clip the background to the text */
          -webkit-text-fill-color: transparent; /* Make the text color transparent */
          margin-bottom: 40px;
          
        }

        .section-title {
          font-size: 35px;
          font-weight: bold;
          margin-bottom: 30px;
          color: #9dffff;
          background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
        -webkit-background-clip: text; /* Clip the background to the text */
        -webkit-text-fill-color: transparent; /* Make the text color transparent */
        }

        .card-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .info-card {
          width: 250px;
          padding: 20px;
          background-color: #ffffff0a;
          border: 2px solid #ffffff33;
          border-radius: 20px;
          text-align: center;
          transition: background 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .info-card:hover {
          background-color: #31cece;
        }

        .icon {
          font-size: 36px;
          margin-bottom: 10px;
          color: #e5f352;
        }

        .title {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }

        .desc {
          font-size: 14px;
          color:#ccc;
          font-weight: 700;
        }
          .section {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
            will-change: opacity, transform;
            }

            .section.visible {
            opacity: 1;
            transform: translateY(0);
            }
            /* Initial state for animation */
                .info-card {
                opacity: 0;
                transform: translateY(30px); /* default: center card fades up */
                transition: all 0.7s ease-out;
                }

                /* Odd-numbered cards (assume they appear on the left) */
                .card-grid .info-card:nth-child(3n + 1) {
                transform: translateX(-50px);
                }

                /* Even-numbered cards that are on the right */
                .card-grid .info-card:nth-child(3n) {
                transform: translateX(50px);
                }

                /* Animate to center on section visible */
                .section.visible .info-card {
                opacity: 1;
                transform: translateX(0) translateY(0);
                }
          .footer-bottom {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          margin-top: 30px;
          color: #aaa;
        }
          .register-btn-container {
          display: flex;
          justify-content: center;
         margin-bottom: 30px;
         margin-top: 20px;
        }

        .register-btn {
          padding: 14px 28px;
          background: linear-gradient(to right, #007BFF, #04fdbfff);
          border: none;
          border-radius: 8px;
          color: #f5f5f5;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px; /* space between text and icon */
          transition: transform 0.2s ease, background-color 0.3s ease;
          font-family: 'Courier New', monospace;
        }

        .register-btn:hover {
          background-color: #28baba;
          transform: scale(1.05);
        }




        @media (max-width: 768px) {
            .domains-container{
            overflow-x: hidden;
            }
            .tagline {
                font-size: 18px;
            }

            .card-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr); 
                gap: 16px;
                justify-items: center;
            }

            .info-card {
                width: 90%;
                max-width: 160px;
                padding: 12px;
                opacity: 0;
                transform: translateY(30px); /* default: fade up */
                transition: all 0.7s ease-out;
            }

            .card-grid .info-card:nth-child(odd) {
                transform: translateX(-50px);
            }

            .card-grid .info-card:nth-child(even) {
                transform: translateX(50px);
            }

            .section.visible .info-card {
                opacity: 1;
                transform: translateX(0) translateY(0);
            }

            .icon {
                font-size: 28px;
            }

            .title {
                font-size: 14px;
                
            }

            .desc {
                font-size: 13px;
            }
                .footer-bottom {
            font-size: 14px;
            
            }
            .register-btn{
            font-size: 16px;
            padding: 12px 24px;
          }
            }


      `}</style>
    </>
  );
}

export default Domains;
    