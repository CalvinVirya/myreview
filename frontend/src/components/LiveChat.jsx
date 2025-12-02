import React from "react";
import { useState } from "react";
import { insertMessage } from "../lib/messageController";

const LiveChat = ({ businessId = "No Business Id" }) => {
  const [message, setMessage] = useState("");

  return (
    <form action="">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      />
      <button type="button" onClick={() => insertMessage(message, businessId)}>
        submit
      </button>
    </form>
  );
};

export default LiveChat;
