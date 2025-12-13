import React, { useEffect, useState } from "react";
import { LogOut, Calendar, Mail } from "react-feather";
import { fetchActiveUser } from "../lib/userController";

const LogOutAccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const token = sessionStorage.getItem("User");
      if (!token) return;

      try {
        const data = await fetchActiveUser()
        setUser(data);
      } catch (err) {
        console.log("Failed to fetch user", err);
      }
    }

    loadUser();
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-6">
      {user ? (
        <div className="flex flex-col items-center w-full">
          {/* Avatar Section */}
          <div className="relative mb-5 group">
            <div className="w-28 h-28 p-1.5 bg-white rounded-full shadow-sm border border-gray-100">
              <img
                src={user.userImage}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>
          
          {/* Info Section */}
          <div className="text-center w-full mb-8">
            <h2 className="text-2xl montserrat-bold text-gray-800 mb-1">
              {user.name}
            </h2>
            
            <div className="flex items-center justify-center gap-1.5 text-gray-500 text-sm mb-4 font-medium">
                <Mail size={14} />
                <span>{user.email}</span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:bg-gray-100">
                <Calendar size={14} className="text-ivy" />
                <span className="text-xs text-gray-600 font-medium">
                    Member since {new Date(user.joinDate).toLocaleDateString("id-ID", { month: 'long', year: 'numeric' })}
                </span>
            </div>
          </div>
        </div>
      ) : (
        /* Loading Skeleton */
        <div className="animate-pulse flex flex-col items-center w-full mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
        className="w-full py-3.5 px-6 bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-xl montserrat-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
        Sign Out
      </button>
    </div>
  );
};

export default LogOutAccount;