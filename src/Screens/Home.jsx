import React from "react";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import glitchLogo from "../images/INNOTHON-25-glitch.png";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Configure";


// Import icons
import { FaLightbulb, FaCheckCircle, FaLeaf, FaClipboardList, FaBrain, FaTasks, FaProjectDiagram , FaDownload} from "react-icons/fa";
import {  FaStar, FaCogs, FaVideo } from "react-icons/fa";
import { FaRupeeSign, FaUsers, FaClock, FaClipboard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

import winner1 from "../images/Innothon'24_winner/winner1.jpg";
import winner2 from "../images/Innothon'24_winner/winner2.jpg";
import winner3 from "../images/Innothon'24_winner/winner3.jpg";
import winner4 from "../images/Innothon'24_winner/winner4.jpg";
import winner5 from "../images/Innothon'24_winner/winner5.jpg";
import winner6 from "../images/Innothon'24_winner/winner6.jpg";
import winner7 from "../images/Innothon'24_winner/winner7.jpg";
import winner8 from "../images/Innothon'24_winner/winner8.jpg";
import winner9 from "../images/Innothon'24_winner/winner9.jpg";
import winner10 from "../images/Innothon'24_winner/winner10.jpg";
import winner11 from "../images/Innothon'24_winner/winner11.jpg";
import winner12 from "../images/Innothon'24_winner/winner12.jpg";
import winner13 from "../images/Innothon'24_winner/winner13.jpg";
import winner14 from "../images/Innothon'24_winner/winner14.jpg";
import winner15 from "../images/Innothon'24_winner/winner15.jpg";

import kcgLogo from "../images/kcg_logo.jpg";
import cseLogo from "../images/cse-logo.jpg";

import PPT_Template from "../template/PPT_Template.pptx";

function Home() {
  const navigate = useNavigate();
  const winnerImages = [winner1, winner2, winner3, winner4, winner5, winner6, winner7, winner8, winner9, winner10, winner11, winner12, winner13, winner14, winner15];
  const [currentIndex, setCurrentIndex] = useState(0);



      const innotext = `< INNOCOM is our platform for students to incubate and express their talents. It fosters entrepreneurship and innovation, guiding students towards a successful and independent future. Our club aims to elevate the standards of our students, creating achievers and trendsetters in the field of computer science. />`;

      const innothonText = `< INNOTHON 25 is a 30-hour hackathon where students are challenged to develop innovative solutions to real-world problems. Problem statements of INNOTHON 25 are provided by our industry partners, giving students the opportunity to tackle genuine challenges faced by industries today. />`;

      const [typedText, setTypedText] = useState('');
      const [charIndex, setCharIndex] = useState(0);

      const [typedInno25, setTypedInno25] = useState('');
      const [charIndex25, setCharIndex25] = useState(0);

      const [loading, setLoading] = useState(false);



      const [helpForm, setHelpForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });


      useEffect(() => {
        if (charIndex < innotext.length) {
          const timeout = setTimeout(() => {
            setTypedText((prev) => prev + innotext[charIndex]);
            setCharIndex((prev) => prev + 1);
          }, 5);
          return () => clearTimeout(timeout);
        }
      }, [charIndex]);

      useEffect(() => {
        if (charIndex >= innotext.length && charIndex25 < innothonText.length) {
          const timeout = setTimeout(() => {
            setTypedInno25((prev) => prev + innothonText[charIndex25]);
            setCharIndex25((prev) => prev + 1);
          }, 5);
          return () => clearTimeout(timeout);
        }
      }, [charIndex25, charIndex]);

      useEffect(() => {
        const sections = document.querySelectorAll('.section');

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, {
          threshold: 0.2,
        });

        sections.forEach((section) => {
          observer.observe(section);
        });

        return () => {
          sections.forEach((section) => {
            observer.unobserve(section);
          });
        };
      }, []);


  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? winnerImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === winnerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const criteria = [
    { name: "Solution", icon: <FaLightbulb /> },
    { name: "Feasibility", icon: <FaCheckCircle /> },
    { name: "Sustainability", icon: <FaLeaf /> },
    { name: "Relevancy", icon: <FaClipboardList /> },
    { name: "Innovation", icon: <FaBrain /> },
    { name: "Completeness", icon: <FaTasks /> },
    { name: "Business Model", icon: <FaProjectDiagram /> },
  ];

    const handleInputChange = (e) => {
    setHelpForm({ ...helpForm, [e.target.name]: e.target.value });
  };

  const handleHelpSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      const { firstName, lastName, email, phone, message } = helpForm;

      if (!firstName || !lastName || !email || !phone || !message) {
        return alert("Please fill all fields.");
      }

      try {
        const res = await fetch(`${BASE_URL}/submit-help`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(helpForm),
        });

        const data = await res.json();

        if (res.ok) {
           setLoading(false); 
          alert("Query submitted successfully!");
          setHelpForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong!");
      }finally {
    setLoading(false); // Always stop spinner
  }
    };

  return (
    <>
      <div className="home-container">
        <Header />  
        <main className="home-content">
          <h2 className="tagline">&lt; A National Level Tech Hackathon /&gt;</h2>
          <img src={glitchLogo} alt="INNOTHON'25 Glitch Logo" className="glitch-logo" />
          <h2 className="tagline" >&lt; Department Of Computer Science & Engineering /&gt;</h2>

          {/* INNOCOM Section */}
          <section className="section">
            <h3 className="section-title">INNOCOM</h3>
           <p className="section-text typewriter">
              {typedText}
              <span className="cursor" />
            </p>

          </section>

          {/* INNOTHON 25 Section */}
          <section className="section">
            <h3 className="section-title">INNOTHON 25</h3>
            <p className="section-text typewriter">
              {typedInno25}
              <span className="cursor" />
            </p>

            {/* Register Button */}
            <div className="register-btn-container">
              <button className="register-btn" onClick={() => navigate("/domains")}>
                Click to Register <FaArrowRight className="register-icon" />
                
                </button>
            </div>

          </section>

          <section className="section">
            <div className="footer-section">
              <h3 className="section-title" style={{textAlign: "center"}}>Note</h3>
              <ul>
                <li><FaRupeeSign className="note-icon" /><div>Enrollment Fee <span style={{color:"#ff9c00"}}> Rs.100/- </span> per Participant for initial Registeration and <span style={{color:"#ff9c00"}}> Rs.350/- </span> per Participant for Finals.</div></li>
                <li><FaUsers className="note-icon" /><div>Team must consist of maximum 4 members only <span style={{color:"#ff9c00"}}> (1-4)</span> </div></li>
                <li><FaClipboard className="note-icon" /><div>The pre-finals of this event will be conducted in the form of submitted PPTs and video screenings, after which the shortlisted teams for the finals will be announced.</div></li>
                <li><FaClock className="note-icon" /><div>30 hour hackathon.</div></li>
                <li><FaClipboard className="note-icon" /><div>Participants are expected to develop a prototype for the chosen problem statement.</div></li>
              </ul>
            </div>
          </section>


{/* Pitch Video Guidelines Section */}
<section className="section">
  <div className="footer-section">
    <h3 className="section-title" style={{ textAlign: "center" }}>
      Pitch Video Guidelines (3 mins)
    </h3>
    <ul>
      <li>
        <FaUsers className="note-icon" />
        <div>
          <strong>Team:</strong> Introduce your&nbsp;
          <span style={{ color: "#ff9c00", whiteSpace: "nowrap" }}>team name</span>&nbsp;and&nbsp;
          <span style={{ color: "#ff9c00", whiteSpace: "nowrap" }}>members</span> in one line.
        </div>
      </li>
      <li>
        <FaLightbulb className="note-icon" />
        <div>
          <strong>Proposed Solution:</strong> Briefly explain your&nbsp;
          <span style={{ color: "#ff9c00", whiteSpace: "nowrap" }}>idea/solution</span>&nbsp;and how it works.
        </div>
      </li>
      <li>
        <FaStar className="note-icon" />
        <div>
          <strong>Competitive Advantage:</strong> What makes your solution&nbsp;
          <span style={{ color: "#ff9c00", whiteSpace: "nowrap" }}>unique</span>&nbsp;or&nbsp;
          <span style={{ color: "#ff9c00", whiteSpace: "nowrap" }}>better</span> than existing ones.
        </div>
      </li>
      <li>
        <FaCogs className="note-icon" />
<div>
  <strong>Prototype / POC:</strong>
  <ul style={{ listStyleType: "none", paddingLeft: "20px", marginTop: "10px" }}>
    <li>
      <FaVideo className="note-icon" />
      <span style={{ whiteSpace: "" }}>
        If you have a <span style={{ color: "#ff9c00" }}>prototype</span>, show a quick demo or screenshots.
      </span>
    </li>
    <li>
      <FaVideo className="note-icon" />
      <span style={{ whiteSpace: "" }}>
        If not, explain your <span style={{ color: "#ff9c00" }}>Proof of Concept</span> (how it will work, initial validation).
      </span>
    </li>
  </ul>
</div>

      </li>
    </ul>
    <p
      style={{
        textAlign: "center",
        fontWeight: "bold",
        color: "#ff9c00",
        marginTop: "20px",
        whiteSpace: "",
      }}
    >
      Keep it crisp, impactful, and within 3 minutes.
    </p>
  </div>



<a
  href={PPT_Template}
  download="PPT-Template.pptx"
  className="register-btn"
  style={{
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "15px 20px",
    borderRadius: "10px",
    background: "linear-gradient(to right, #007BFF, #04fdbfff)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "'Courier New', monospace",
    cursor: "pointer",
    transition: "background 0.1s ease",
    marginTop:"20px",
    
  }}
>
  Download PPT Template
  <FaDownload style={{ marginLeft: "8px" }} />
</a>
<p>Login using your registered email to submit your PPT and video.</p>


</section>

          
          

      {/* Timeline Section */}
      <section className="section timeline-section">
        <h3 className="section-title">Timeline</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon" />
            <div className="timeline-content">
              <h4 className="timeline-title">Registration Starts</h4>
              <p className="timeline-date">3rd Sept 2025</p>
              <p>Registration starts And Theme Release.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon" />
            <div className="timeline-content">
              <h4 className="timeline-title">Registration Ends</h4>
              <p className="timeline-date">20th Sept 2025</p>
              <p>Registration Closes. </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon" />
            <div className="timeline-content">
              <h4 className="timeline-title">PPT Template Release</h4>
              <p className="timeline-date">8th Sept 2025 Onwards</p>
              <p>PPT Template Release. <br />PPT Submission and 3-mins Video of proposed solution Submission starts.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon" />
            <div className="timeline-content">
              <h4 className="timeline-title">Finalist Announcement</h4>
              <p className="timeline-date">23rd Sept 2025</p>
              <p>The finalists of the event will be announced.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-icon " />
            <div className="timeline-content">
              <h4 className="timeline-title">Grand Finale</h4>
              <p className="timeline-date">29th Sept - 30th Sept 2025</p>
              <p>PPT Presentation and Business Model.<br />Prototype 100%.<br />Mode: Offline.</p>
            </div>
          </div>
        </div>
        
      </section>
      {/* Winner Carousel Section */}
      <section className="section carousel-section">
        <h3 className="section-title">Glimpses of Innothon'24</h3>
        <div className="carousel-container">
          <button className="carousel-btn left" onClick={prevSlide}>&lt;</button>
          <img src={winnerImages[currentIndex]} alt="Winner" className="carousel-image" />
          <button className="carousel-btn right" onClick={nextSlide}>&gt;</button>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {winnerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      <section>    
          <div className="footer-container">
           
            
            <div className="footer-section">
              <h3 className="section-title">Contact Us</h3>
              <ul>
                <li><FaPhoneAlt className="note-icon" /><div>Jyotsna T - President, INNOCOM<br /><a href="tel:9962292154">9962292154</a></div></li>
                <li><FaPhoneAlt className="note-icon" /><div>Subashri M - Secretary, INNOCOM<br /><a href="tel:8754458587">8754458587</a></div></li>
                <li><FaPhoneAlt className="note-icon" /><div>Rithika SK - Technical Lead, INNOCOM<br /><a href="tel:7708261904">7708261904</a></div></li>
                <li><FaPhoneAlt className="note-icon" /><div>Iyaad Luqmaan - Technical Lead, INNOCOM<br /><a href="tel:8714346406">8714346406</a></div></li>
              </ul>
            </div>
            
            <div className="footer-section powered-section">
              <h3 className="section-title">Powered by</h3>
              <div className="powered-logos">
                <div className="powered-item">
                  <img src={kcgLogo} alt="KCG College of Technology" />
                  <p>KCG College of Technology</p>
                </div>
                <div className="powered-item">
                  <img src={cseLogo} alt="CSE Department" />
                  <p>Department of Computer Science & Engineering</p>
                </div>
              </div>
            </div>
          </div>
      </section>
      <section className="help-section">
        <h3 className="section-title">Need Help?</h3>
        <p className="help-desc">For any issues or questions, feel free to reach out to us using the form below.</p>
        <div className="help-form-container">
          <form className="help-form" onSubmit={handleHelpSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={helpForm.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={helpForm.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={helpForm.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={helpForm.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row full-width">
              <textarea
                name="message"
                placeholder="Describe your issue or question..."
                rows="4"
                value={helpForm.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading && <span className="spinner" />} {loading ? "Submitting..." : "Submit"}
            </button>

          </form>

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

        .home-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000, #0c172d);
          color: white;
          font-family: 'Courier New', monospace;
        }

        .home-content {
          padding: 40px 20px;
          max-width: 960px;
          margin: auto;
          text-align: center;
        }

        .tagline {
          background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
          -webkit-background-clip: text; /* Clip the background to the text */
          -webkit-text-fill-color: transparent; /* Make the text color transparent */
          overflow: hidden;
         
          display: inline-block;
        }

        .glitch-logo {
          width: 100%;
          max-width: 1000px;
          margin-bottom: 0px;
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


        .section-title {
          font-size: 35px;
          font-weight: bold;
          margin-bottom: 10px;
          background: linear-gradient(to right, #007BFF, #04fdbfff); /* Gradient color */
        -webkit-background-clip: text; /* Clip the background to the text */
        -webkit-text-fill-color: transparent; /* Make the text color transparent */
        margin-top: 30px;
          
        }

        .section-text {
          display: block;
          white-space: normal;
          animation: none;
          text-align: justify;
          line-height: 1.6;
          font-weight: 700;
        }

        .register-btn-container {
          display: flex;
          justify-content: center;
         margin-bottom: 30px;
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

        .register-icon {
          font-size: 20px; /* make it bigger */
        }


        .eval-criteria {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
          margin-bottom: 40px;
        }

        .criteria-item {
          border: 2px solid;
          padding: 16px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          background-color: #ffffff0a;
          transition: background 0.3s;
          width: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #fff;
        }

        .criteria-item:hover {
          background-color: #31cece;
        }

        .icon {
          font-size: 24px;
          margin-bottom: 8px;
          color:rgb(229, 243, 82);
        }
        .timeline-section {
          margin-top: 50px;
        }

        .timeline {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: relative;
            padding-left: 30px;
          }

          .timeline::before {
            content: '';
            position: absolute;
            left: 6px;
            top: 30px;
            bottom: 130px; /* This makes it stop at the last item */
            width: 2px;
            background-color: white;
          }

        .timeline-item {
          position: relative;
          
        }

        .timeline-icon {
          width: 14px;
          height: 14px;
          background-color: orange;
          border: 3px solid #fff;
          border-radius: 50%;
          position: absolute;
          left: -32px;
          top: 25px;

          
          
        }

        .timeline-icon-final {
          background-color: white;
          box-shadow: none;
        }

        .timeline-content {
          padding-left: 10px;
          color: #eee;
          text-align: left;
          font-weight: 700;
        }

        .timeline-title {
          font-size: 18px;
          font-weight: bold;
          color: #ffb700;
          margin-bottom: 4px;
        }

        .timeline-date {
          font-size: 14px;
          color: #aaa;
          margin-bottom: 4px;
          font-weight: 700;
        }

        .carousel-section {
          margin-top: 60px;
        }

        .carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 600px;
          margin: 20px auto;
          padding: 10px;
        }

        .carousel-image {
          width: 100%;
          max-width: 700px;
          height: auto;
          border-radius: 12px;
          border: 2px solid #fff;
          object-fit: cover;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          font-size: 28px;
          padding: 10px;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s;
          border-radius: 50%;
        }

        .carousel-btn:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .carousel-btn.left {
          left: -50px;
        }

        .carousel-btn.right {
          right: -50px;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          margin-top: 10px;
          gap: 10px;
        }

        .dot {
          height: 12px;
          width: 12px;
          background-color: #ccc;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .dot.active {
          background-color:#ffb700;
          transform: scale(1.3);
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 40px;
          padding: 30px 10px;
          
          color: #fff;
          margin-top: 50px;
        }

        .footer-section {
          flex: 1;
          min-width: 280px;
        }

        .footer-section h3 {
          
          color: #ffffff;
          margin-bottom: 16px;
          text-align: left;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 16px;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.6;
          text-align: left;
          color: #ccc;
        }

        .footer-section li .note-icon {
          margin-top: 4px;
          flex-shrink: 0;
          color: #ff9c00;
        }

        .footer-section li > div {
          text-align: left;
        }
        .footer-section a {
          color: #ff9c00;
          text-decoration: none;
          font-weight: 600;
        }

        .footer-section a:hover {
          text-decoration: underline;
        }
        .footer-bottom {
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          margin-top: 30px;
          color: #aaa;
        }

        .powered-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .powered-logos {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .powered-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .powered-item img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          
          padding: 4px;
          border-radius: 8px;
        }

        .powered-item p {
          font-size: 15px;
          font-weight: 700;
          color: #ccc;
          text-align: left;   /* FIX */
          margin: 0;          /* Optional: remove default spacing */
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

        .help-section {
          margin-top: 40px;
          padding: 20px;
          background:#ffffff0a;
          border-radius: 12px;
          color: #fff;
        }

        .help-desc {
          font-size: 16px;
          margin-bottom: 20px;
          color: #ccc;
        }

        .help-form-container {
          display: flex;
          justify-content: center;
        }

        .help-form {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-row.full-width {
          flex-direction: column;
        }

        .help-form input,
        .help-form textarea {
          flex: 1;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid #444;
          background-color: #ffffff0a;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
        }

        .help-form input:focus,
        .help-form textarea:focus {
          outline: none;
          border-color: #31cece;
        }

        .submit-btn {
          padding: 12px;
          background: linear-gradient(to right, #007BFF, #04fdbfff);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: bold;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-bottom: 20px;
          font-family: 'Courier New', monospace;
        }

        .submit-btn:hover {
          background-color: #28baba;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
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
          .tagline {
            font-size: 16px;
          }

          .section-title {
            font-size: 24px;
          }

          .section-text {
            font-size: 14px;
            font-weight: 700;
          }
          .typewriter {
            min-height: 170px;
          }

          .criteria-item {
            font-size: 12px;
            padding: 12px 18px;
            width: 120px;
          }

          .icon {
            font-size: 20px;

          }

          .timeline {
            margin-left: 20px;
            padding-left: 28px;
            
          }
          .timeline::before { 
            left: 5px;
            top: 30px;
            bottom: 110px; /* This makes it stop at the last item */
           
          }
          .timeline-icon {
            top: 20px;
          } 
          .timeline-title {
            font-size: 16px;
          }

          .timeline-date {
            font-size: 13px;
          }

          .timeline-content p {
            font-size: 13px;
            
          }
            
          .carousel-image {
            max-width: 90%;
          }

          .carousel-btn {
            font-size: 24px;
            padding: 7px;
          }
             .carousel-btn.left {
          left: -7px;
        }

        .carousel-btn.right {
          right: -7px;
        }
          .dot{
            height: 8px;
            width: 8px;
          }
            .form-row {
          flex-direction: column;
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

export default Home;
