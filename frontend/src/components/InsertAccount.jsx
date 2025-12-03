import React, { useState } from "react";
import GoogleIcon from "../assets/google-logo.png";
import AppLogo from "../assets/logo.svg";
import { insertUsers, verifyUser } from "../lib/userController";
import axios from "axios";

const InsertAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);

  const HandleSubmit = async (e) => {
    if (e) e.preventDefault();

    // --- VALIDASI ---
    if (!isSignIn && username.trim() === "") {
      alert("Username is required.");
      return;
    }
    if (email.trim() === "") {
      alert("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.trim() === "") {
      alert("Password is required.");
      return;
    }

    if (!isSignIn) {
      insertUsers(username, email, password, userImage);
    } else {
      let response = await verifyUser(email, password);
      if (response) {
        sessionStorage.setItem("User", response);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
        window.location.reload();
      } else {
        alert("Login failed");
        return;
      }
    }

    setEmail("");
    setPassword("");
    setUsername("");
    setUserImage(null);
  };

  return (
    // Section terluar hanya mengatur posisi, tanpa background warna
    <section className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      
      {/* Header Logo & Title */}
      <div className="flex flex-col items-center mb-8 w-full">
        <img src={AppLogo} alt="App Logo" className="w-32 mb-2 drop-shadow-sm" />
        <h2 className="montserrat-bold text-2xl text-gray-800">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="montserrat-regular text-sm text-gray-500 mt-1">
          {isSignIn ? "Please sign in to continue" : "Join us to review businesses"}
        </p>
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        className="w-full flex justify-center items-center gap-3 p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 group"
      >
        <img src={GoogleIcon} alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="montserrat-medium text-gray-600 text-sm">Sign in with Google</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center w-full py-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink-0 mx-4 montserrat-regular text-xs text-gray-400 uppercase tracking-widest">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Form Section */}
      <form className="flex flex-col gap-4 w-full" onSubmit={HandleSubmit}>
        {!isSignIn && (
          <div className="flex flex-col gap-1">
            <label className="montserrat-medium text-xs text-gray-700 ml-1">Username</label>
            <input
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-ivy focus:ring-2 focus:ring-ivy/20 outline-none transition-all montserrat-regular text-sm"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="montserrat-medium text-xs text-gray-700 ml-1">Email</label>
          <input
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-ivy focus:ring-2 focus:ring-ivy/20 outline-none transition-all montserrat-regular text-sm"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="montserrat-medium text-xs text-gray-700 ml-1">Password</label>
          <input
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-ivy focus:ring-2 focus:ring-ivy/20 outline-none transition-all montserrat-regular text-sm"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        {!isSignIn && (
          <div className="flex flex-col gap-1">
            <label className="montserrat-medium text-xs text-gray-700 ml-1">Profile Image</label>
            <input
              className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-ivy/10 file:text-ivy hover:file:bg-ivy/20 cursor-pointer text-sm text-gray-500 transition-all"
              id="imageUpload"
              accept="image/*"
              onChange={(e) => setUserImage(e.target.files[0])}
              type="file"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full p-3 bg-ivy text-first-frost rounded-xl montserrat-bold shadow-lg shadow-ivy/30 hover:shadow-ivy/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>
      </form>

      {/* Footer Toggle */}
      <div className="mt-6 text-center w-full">
        <p className="montserrat-regular text-sm text-gray-600">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="montserrat-bold text-ivy ml-2 hover:underline decoration-2 underline-offset-4"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setEmail("");
              setPassword("");
              setUsername("");
            }}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default InsertAccount;