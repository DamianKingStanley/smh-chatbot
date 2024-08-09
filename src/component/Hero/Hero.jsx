import React, { useState, useEffect } from "react";
import "./Hero.css";
import chatimage from "../../assest/therapist_chat.png";
import { FaRobot, FaChalkboardTeacher } from "react-icons/fa";

const Hero = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = sessionStorage.getItem("studentData");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleChatBot = () => {
    const isLoggedIn = sessionStorage.getItem("studentData");

    if (isLoggedIn) {
      window.location.href = "/mental-health-bot";
    } else {
      window.location.href = "/login";
    }
  };

  const handlePostClick = () => {
    const isLoggedIn = sessionStorage.getItem("studentData");

    if (isLoggedIn) {
      window.location.href = "/assistant-bot";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="HeroSectionBody">
      <section className="heroBody">
        <div className="heroWrite">
          <h1>Student Mental Health Chatbot Support System</h1>
          <p>
            Chat with our Friendly Therapist bot, to help you overcome your
            current crisis
          </p>
          <button onClick={handleChatBot} id="heroChatbotBtn">
            chat <FaRobot />
          </button>
          <button onClick={handlePostClick} id="heroAssesBtn">
            Class Help <FaChalkboardTeacher />
          </button>
        </div>
        <div>
          <img id="chatimage" src={chatimage} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
