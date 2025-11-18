import React, { useState } from "react";
import GoogleIcon from "../assets/google-logo.png";
import AppLogo from "../assets/logo.svg";
import { insertUsers, verifyUser } from "../lib/userController";
import axios from "axios";

const InsertAccount = () => {
  const [email, setEmail] = useState(""); // declare
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  
  const HandleSubmit = async () => {
    // --- VALIDASI ---
    
    // 1. Validasi Username (hanya untuk Sign Up)
    if (!isSignIn && username.trim() === "") {
      alert("Username is required.");
      return;
    }

    // 2. Validasi Email wajib isi
    if (email.trim() === "") {
      alert("Email is required.");
      return;
    }

    // 3. Validasi format Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // 4. Validasi Password wajib isi
    if (password.trim() === "") {
      alert("Password is required.");
      return;
    }

    if (!isSignIn) {
      // SIGN UP
      insertUsers(username, email, password, userImage);
    } else {
      // SIGN IN
      let response = await verifyUser(email, password);

      if (response) {
        sessionStorage.setItem("User", response);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
        window.location.reload()
      } else {
        alert("Login failed");
        return;
      }

    }

    // Reset form setelah berhasil
    setEmail("");
    setPassword("");
    setUsername("");
    setReviewImage(null);
  };

  return (
    <section className="flex flex-col gap-4 p-5">
      <img src={AppLogo} alt="" className="w-40 m-auto mb-4" />
      <div className="p-2 border border-gray-400 rounded-xl flex justify-center items-center">
        <img src={GoogleIcon} alt="" className="w-4 h-4 mr-2" />
        <button type="" className="montserrat-regular text-gray-400">
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
              required
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
          required
        />
        <label className="montserrat-regular mb-1 mt-3">Password</label>
        <input
          className="p-2 border-black rounded-md border montserrat-regular"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {isSignIn ? ("") : (
          <>
            <label className="montserrat-regular mb-1 mt-3">Image</label>
            <input
              className="p-2 cursor-pointer border-black rounded-md border montserrat-regular"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => setUserImage(e.target.files[0])}
              type="file"
            />
          </>
        )}
        
      </form>
      <button
        type="submit"
        onClick={HandleSubmit}
        className="p-2 bg-ivy rounded-2xl montserrat-regular text-first-frost">
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
      <span className="montserrat-regular text-center">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <button
          className="montserrat-medium text-ivy ml-1"
          onClick={() => {
            setIsSignIn(!isSignIn);
            setEmail("");
            setPassword("");
            setUsername("");
          }}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </span>
    </section>
  );
};

export default InsertAccount;
