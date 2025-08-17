import React from "react";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { FaInstagram, FaLinkedin } from 'react-icons/fa';


import jyotsnaImg from "../images/core _team/jyotsna.jpg";
import subashriImg from "../images/core _team/subashri.jpg";
import rithikaImg from "../images/core _team/rithika_2.jpg";
import iyaadImg from "../images/core _team/Iyaad.png";
import lalithaImg from "../images/core _team/lalitha.jpg";

import premImg from "../images/Web-developers/Prem.jpg";
import vamithaImg from "../images/Web-developers/vamitha_v.jpg";

import AjayImg from "../images/quango/Ajay.jpg";
import DhanushImg from "../images/quango/Dhanush.jpg";
import BalaabiramiImg from "../images/quango/Balaabirami.jpg";
import HafsahImg from "../images/quango/Hafsah_Niaz.jpg";
import HariniImg from "../images/quango/Harini.jpg";
import JayavarshanImg from "../images/quango/jayavarshan.jpg";
import KeerthanaaImg from "../images/quango/Keerthanaa.jpg";
import LokeshImg from "../images/quango/Lokesh.jpg";
import SushmitaaImg from "../images/quango/Sushmithaa.jpg";
import VishwanathImg from "../images/quango/Vishwanath.jpg";
import SivaSuryaImg from "../images/quango/Sivasuriya.jpg";
import SivakumarImg from "../images/quango/Sivakumar.jpg";



function AboutUs() {
  const aboutText = `< The Innocom Club of the CSE Department, KCG Tech is a student-driven community that fosters inclusivity, peer growth, and technical excellence. It empowers students through hands-on programs in AIML, Cybersecurity, and emerging tech domains, while actively guiding them in project development and innovation. Flagship events like Innothon ‘23 and Innothon ‘24 showcased impactful student solutions through intense prelims and mentorship. Challenges like Web Quest further spark research and critical thinking. Innocom creates a vibrant space for collaboration, creativity, and continuous learning, helping students turn ideas into action. />`;

  const [typedAbout, setTypedAbout] = useState("");
  const [aboutIndex, setAboutIndex] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (aboutIndex < aboutText.length) {
      const timeout = setTimeout(() => {
        setTypedAbout((prev) => prev + aboutText[aboutIndex]);
        setAboutIndex((prev) => prev + 1);
      }, 5);
      return () => clearTimeout(timeout);
    }
  }, [aboutIndex]);

 const coreMembers = [
  { id: "jyotsna", name: "Jyotsna T", role: "President", image: jyotsnaImg, color: "#31cece" },
  { id: "subashri", name: "Subashri M", role: "Secretary", image: subashriImg, color: "#2f3a7f" },
  { id: "rithika", name: "Rithika SK", role: "Technical Lead", image: rithikaImg, color: "#2f3a7f" },
  { id: "iyaad", name: "Iyaad Luqmaan K", role: "Technical Lead", image: iyaadImg, color: "#31cece" },
  { id: "lalitha", name: "Lalitha B", role: "Treasurer", image: lalithaImg, color: "#d5444f" },
];

  const developers = [
    { name: "Premkumar D", role: "Web - Developer", color: "#d5444f" },
    { name: "Vamitha v", role: "Web - Developer", color: "#2f3a7f" },
  ];

  const quangoMembers = [
  { name: "Ajay Kumar N", image: AjayImg },
  { name: "Dhanush M", image: DhanushImg },
  { name: "Balaabirami B", image: BalaabiramiImg },
  { name: "Hafsah Niaz", image: HafsahImg },
  { name: "Harini B", image: HariniImg },
  { name: "Jayavarshan S", image: JayavarshanImg },
  { name: "Keerthanaa SS", image: KeerthanaaImg },
  { name: "Lokesh V", image: LokeshImg },
  { name: "Sushmitaa M", image: SushmitaaImg },
  { name: "Vishwanath SA", image: VishwanathImg },
  { name: "Siva Surya S", image: SivaSuryaImg },
  { name: "Sivakumar B", image: SivakumarImg },
  ,
];


  return (
    <>
      <div className="aboutus-container">
        <Header />
        <main className="aboutus-content">

            <section className="section fade-in">
                <h3 className="section-title">About Us</h3>
                <p className="section-text typewriter">
                    {typedAbout}
                    <span className="cursor" />
                </p>
            </section>

          <section className="section fade-in">
             <h3 className="section-title">The Core Team</h3>
            

            <div className="split-members-layout">
              <div className="members-column">
              <div className="alternate-row left-align scroll-fade slide-left">
                {coreMembers.slice(0, 2).map((member, index) => (
                  <div
                    className={`alternate-row ${
                      member.id === "subashri" ? "custom-reverse " : "left-align"
                    }`}
                    key={index}
                  >
                    <div className="alt-circle-bg" style={{  border: `2px solid ${member.color}`, backgroundColor: " #ffffff11" }}>
                      <div className="alt-img-box">
                        <img src={member.image} alt={member.name} />
                      </div>
                    </div>
                    <div className="alt-info-box" style={{  border: `2px solid ${member.color}`, backgroundColor: " #ffffff11" }}>
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
              <div className="members-column">
              <div className="alternate-row right-align scroll-fade slide-right">
                {coreMembers.slice(2).map((member, index) => (
                  <div
                    className={`alternate-row ${
                        member.id === "lalitha"
                        ? "reverse-desktop"
                        : member.id === "rithika"
                        ? "left-align"
                        : "right-align"
                    }`}
                    key={index + 2}
                    >

                    <div className="alt-circle-bg" style={{ border: `2px solid ${member.color}`, backgroundColor: " #ffffff11" }}>
                      <div className="alt-img-box">
                        <img src={member.image} alt={member.name} />
                      </div>
                    </div>
                    <div className="alt-info-box" style={{  border: `2px solid ${member.color}`, backgroundColor: " #ffffff11" }}>
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </section>

          <section className="section fade-in">
  <h5 className="section-title" style={{ fontSize: "22px" }}>Developers of this Website</h5>
  <div className="developer-card-container">

    {/* Premkumar card with scroll animation */}
    <div className="dev-card scroll-fade slide-left" style={{ backgroundColor: "#1e2d40" }}>
      <div className="dev-img-outer" style={{ border: "2px solid white", backgroundColor: "#ffffff11" }}>
        <div className="dev-img-inner">
          <img src={premImg} alt="Premkumar" className="dev-img" />
        </div>
      </div>
      <div className="dev-details">
        <h4 className="dev-name">Premkumar D</h4>
        <p className="dev-role"> Web Developer</p>
        <p className="dev-tag">@LogicLoopers</p>
      </div>
    </div>

    {/* Vamitha card with scroll animation */}
    <div className="dev-card reverse-card scroll-fade slide-right" style={{ backgroundColor: "#2f3a7f" }}>
      <div className="dev-img-outer" style={{ border: "2px solid white", backgroundColor: "#ffffff11" }}>
        <div className="dev-img-inner">
          <img src={vamithaImg} alt="Vamitha" className="dev-img" />
        </div>
      </div>
      <div className="dev-details">
        <h4 className="dev-name">Vamitha V</h4>
        <p className="dev-role">Web Developer</p>
        <p className="dev-tag">@LogicLoopers</p>
      </div>
    </div>

  </div>
</section>


                <section className="section fade-in">
                <h5 className="section-title">Quango Members</h5>
                <div className="quango-grid">
                    {quangoMembers.map((member, index) => (
                    <div className="quango-card" key={index}>
                        <div className="quango-img-outer">
                        <div className="quango-img-inner">
                            <img src={member.image} alt={member.name} className="quango-img" />
                        </div>
                        </div>
                        <p className="quango-name">{member.name}</p>
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
        .custom-reverse {
          flex-direction: row-reverse;
        }

        .aboutus-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000, #0c172d);
          color: white;
          font-family: 'Courier New', monospace;
        }

        .aboutus-content {
          padding:10px 20px;
          max-width: 960px;
          margin: auto;
          text-align: center;
        }

        .section {
          margin: 60px 0;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s forwards;
        }
        .section-title {
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 16px;
        background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
        -webkit-background-clip: text; /* Clip the background to the text */
        -webkit-text-fill-color: transparent; /* Make the text color transparent */
        text-align: center;
        }
        .section-text{
          font-size: 14px;
          font-weight: 700;}
        

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


        .developer-heading {
          margin-top: 60px;
          font-size: 28px;
          font-weight: bold;
          color: #fff;
        }

        .members-alternate-layout {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-top: 40px;
        }

        .alternate-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .left-align {
          flex-direction: row;
        }

        .right-align {
          flex-direction: row-reverse;
        }
        .reverse-desktop {
          flex-direction: row-reverse;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 20px;
          position: relative;
          right: 50%;
        }
        


        .alt-circle-bg {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .alt-img-box {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 24px;
          background-color: #fff;
          color: #000;
        }

        .alt-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .alt-info-box {
          padding: 14px 24px;
          border-radius: 40px;
          color: #fff;
          font-weight: 600;
          text-align: center;
          min-width: 180px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          
        }

        .alt-info-box h4 {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }

        .alt-info-box p {
          margin: 4px 0 0;
          font-size: 14px;
          font-weight: 600;
        }

        .split-members-layout {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 40px;
          margin-top: 40px;
        }

        .members-column {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .typewriter {
        white-space: pre-wrap;
        text-align: justify;
        line-height: 1.6;
        font-family: 'Courier New', monospace;
        min-height: 140px;
        overflow: hidden;
        }

        .cursor {
        display: inline-block;
        width: 8px;
        height: 1em;
        margin-left: 2px;
        }

        .developer-card-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        margin-top: 40px;
        align-items: center;
        }

        .dev-card {
        display: flex;
        align-items: center;
        padding: 30px;
        
        border-radius: 20px;
        width: 40%;
        max-width: 600px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        color: #fff;
        transition: transform 0.3s ease;
        }

        .dev-card:hover {
        transform: translateY(-5px);
        }

        .dev-img {
        width: 110px;
        height: 110px;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid white;
        
        background-color:#fff;
        }

        .dev-img-outer {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        }

        .reverse-card .dev-img-outer {
        margin-left: 20px;
        margin-right: 0;
        }

        .dev-img-inner {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid white;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        }

        

        
        .dev-details {
        text-align: center;

        flex: 1;
        }

        .dev-name {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
        }

        .dev-role {
        font-size: 16px;
        color: #ddd;
        margin: 4px 0;
        font-weight: 700;
        }

        .dev-tag {
        font-size: 14px;
        color: #9dffff;
        font-weight: 700;
        }
        .reverse-card {
            flex-direction: row-reverse;
        }

        .quango-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 35px;
            justify-content: center;
            margin-top: 40px;
            }

            .quango-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 120px;
            }

            .quango-img-outer {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 2px solid white;
            background-color: #ffffff11;
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .quango-img-inner {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid white;
            background-color: #fff;
            }

            .quango-img-inner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            }

            .quango-name {
            margin-top: 10px;
            font-size: 15px;
            font-weight: 700;
            color: #fff;
            text-align: center;
            }
        .scroll-fade {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
          }
          .scroll-fade.slide-left {
            transform: translateX(-40px);
          }
          .scroll-fade.slide-right {
            transform: translateX(40px);
          }
          .scroll-fade.slide-up {
            transform: translateY(30px);
          }
          .scroll-fade.in-view {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }

          .footer-bottom {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          margin-top: 30px;
          color: #aaa;
          margin-bottom: 30px;
        }


        @media (max-width: 768px) {
          .aboutus-container{
            overflow-x: hidden;
          }
          .split-members-layout {
            flex-direction: column;
            align-items: center;
          }
          .typewriter {
          min-height: 350px;
          }
          .members-column {
            width: 100%;
            align-items: center;
          }

          .alternate-row {
            justify-content: center;
            align-items: center;
            gap: 15px;
          }

          .alt-img-box {
            width: 110px;
            height: 110px;
            border: 2px solid white;
          }

          .alt-info-box {
            min-width: 150px;
            padding: 10px 16px;
          }
            .dev-card {
            width: 90%;
            padding: 20px;
        }
       
        .reverse-desktop {
        right: 0;
        flex-direction: row;
        }
        
        .developer-card-container {
        
        flex-direction: column;
        
      }
        .footer-bottom {
            font-size: 14px;
            
            }
            }
      `}</style>
    </>
  );
}

export default AboutUs;
