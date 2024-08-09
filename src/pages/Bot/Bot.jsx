import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Bot.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

function Bot() {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("https://mental-server.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setResponses([
      ...responses,
      { userMessage: message, botReply: data.reply },
    ]);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="AssistantBotBody">
      <Navbar />
      <Navibar />
      {loading && <div className="loader"></div>}

      <div className="AssistantHeader">
        <h1>Riri Assistant Bot</h1>
        <p>Let me help you with your school work. Ask anything!</p>
      </div>
      <div className="Assistant-chat">
        {responses.map((res, index) => (
          <div key={index}>
            <p className="userinput">User: {res.userMessage}</p>
            <p className="assistantanswer">
              Riri:
              <ReactMarkdown>{res.botReply}</ReactMarkdown>
            </p>
          </div>
        ))}
      </div>
      <div>
        <form id="AssistantForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your questions"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Bot;
