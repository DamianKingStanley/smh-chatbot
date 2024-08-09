import React, { useState } from "react";
import axios from "axios";
import thera from "../../assest/thera.jpg";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";
import "./MedBot.css";

function MedBot() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Store chat history
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://mental-server.onrender.com/api/chat"; // Replace with your actual backend API URL

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); // Reset error state before each request

    try {
      const res = await axios.post(apiUrl, { input });
      console.log("Response received from backend:", res.data); // Log response data

      // Update chat history with the new user message and chatbot response
      setChatHistory([
        ...chatHistory,
        { user: input, bot: res.data }, // Store both user message and bot response
      ]);

      setInput(""); // Clear input field
      setLoading(false);
    } catch (error) {
      setError(
        "Failed to fetch response: " +
          (error.response ? error.response.data.error : error.message)
      );
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="MedBotBody">
      <Navbar />
      <Navibar />
      {loading && <div className="loader"></div>}

      <div className="MedBotHeader">
        <img src={thera} alt="Therapist" />
        <h1>Mental Health Chatbot </h1>
      </div>

      <div className="MedBotResponse">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <p className="studentAsk">{chat.user}</p>
              <p className="therapistResponse">{chat.bot}</p>
            </div>
          ))}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="QuestionSection">
        <form className="MedBotInput" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default MedBot;
