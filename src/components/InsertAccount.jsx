import React, { useState } from "react";
import HandleAuth from "../lib/HandleAuth";
import HandleListSession from "../lib/HandleListSession";
import HandleDeleteSessions from "../lib/HandleDeleteSessions";
import HandleGoogle from "../lib/HandleGoogle";
import GoogleIcon from "../assets/google-logo.png"
import AppLogo from "../assets/logo.svg"

const InsertAccount = () => {
  const [email, setEmail] = useState(""); // declare
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <section className="flex flex-col gap-4 p-5">
      <img src={AppLogo} alt="" className="w-40 m-auto mb-4"/>
      <div className="p-2 border border-gray-400 rounded-xl flex justify-center items-center">
        <img src={GoogleIcon} alt="" className="w-4 h-4 mr-2" />
        <button
          type=""
          className="montserrat-regular text-gray-400"
          onClick={() => HandleGoogle()}
        >
          Sign In with Google
        </button>
      </div>
      <p className="montserrat-regular text-center">or</p>
      <form className="flex flex-col" action="">
        {isSignIn ? (
          ""
        ) : (
          <>
            <label className="montserrat-regular mb-1">Username</label>
            <input
              className="p-2 border-black rounded-md border montserrat-regular"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
          </>
        )}
        <label className="montserrat-regular mb-1 mt-3">Email</label>
        <input
          className="p-2 border-black rounded-md border montserrat-regular"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <label className="montserrat-regular mb-1 mt-3">Password</label>
        <input
          className="p-2 border-black rounded-md border montserrat-regular"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </form>
      <button
        type="submit"
        onClick={() => {
          if (!isSignIn) {
            // kalo false berarti user lagi sign up (isSignIn defaultnya FALSE)
            HandleAuth(email, password, username); //function register
          } else {
            // panggil function untuk login
          }
          setEmail("");
          setPassword("");
          setUsername("");
        }}
        className="p-2 bg-ivy rounded-2xl montserrat-regular text-first-frost"
      >
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
      <span className="montserrat-regular text-center">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <button
          className="montserrat-medium text-ivy ml-1"
          onClick={() => {
            setIsSignIn(!isSignIn);
          }}
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </span>
      <button
        type=""
        onClick={() => {
          HandleListSession();
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost"
      >
        List Session
      </button>
      <button
        type=""
        onClick={() => {
          HandleDeleteSessions();
        }}
        className="w-35 h-14 bg-ivy rounded-2xl montserrat-regular text-first-frost"
      >
        Log Out
      </button>
    </section>
  );
};

export default InsertAccount;
