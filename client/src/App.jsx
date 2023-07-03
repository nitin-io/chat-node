import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://127.0.0.1:3000");

function App() {
  const [message, setMessage] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");

  const sendMessage = () => {
    socket.emit("message", { message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMsg(data.message);
    });
  }, [socket]);
  return (
    <>
      <h1>Random Stranger</h1>
      <div className="chat-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
        <p>Message: {receivedMsg}</p>
      </div>
    </>
  );
}

export default App;
