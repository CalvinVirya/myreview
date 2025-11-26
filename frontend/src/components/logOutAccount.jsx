import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const LogOutAccount = () => {
  const [user, setUser] = useState(null);

  // pindahin ke lib bikin jadi function
  useEffect(() => {
    async function loadUser() {
      const token = sessionStorage.getItem("User");  // <--- FIX DI SINI
      if (!token) return;

      // Decode token → dapat _id user
      const decoded = jwtDecode(token);
      const userId = decoded._id;

      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.log("Failed to fetch user", err);
      }
    }

    loadUser();
  }, []);

  return (
    <section className="flex flex-col gap-4 p-5 items-center">

      {user && (
        <div>
          <img
            src={user.userImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p>{user.email}</p>
          <p className="text-gray-500 text-sm">
            Joined: {new Date(user.joinDate).toLocaleDateString()}
          </p>
        </div>
      )}

      <button
        onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
        className="px-6 py-3 bg-ivy rounded-2xl text-first-frost mt-5"
      >
        Log Out
      </button>
    </section>
  );
};

export default LogOutAccount;
