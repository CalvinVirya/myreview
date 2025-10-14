import React, { useState } from "react";
import HandleAuth from "../lib/HandleAuth";
import HandleCreateSession from "../lib/HandleCreateSession";
import HandleListSession from "../lib/HandleListSession";
import HandleDeleteSessions from "../lib/HandleDeleteSessions";

const InsertAccount = () => {
  const [email, setEmail] = useState(""); // declare
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <section className="w-140 m-20 flex flex-col gap-4">
      <form className="flex flex-col gap-4" action="">
        <input
          className="border-black rounded-md border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <input
          className="border-black rounded-md border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
        />
        <input
          className="border-black rounded-md border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </form>
      <button
        type="submit"
        onClick={() => {
          HandleAuth(email, password, username);
          setEmail("");
          setPassword("");
          setUsername("");
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        Login
      </button>
      <button
        type=""
        onClick={() => {
          HandleListSession();
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        List Session
      </button>
      <button
        type=""
        onClick={() => {
          HandleDeleteSessions();
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        Log Out
      </button>
    </section>
  );
};

export default InsertAccount;
