import React from "react";
import { X } from "react-feather";
import InsertAccount from "./InsertAccount";
import LogOutAccount from "./logOutAccount";

const Modal = ({ isVisible, onClose }) => {
  const storedUser = sessionStorage.getItem("User");

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-2">
      <div className="w-[600px] flex flex-col gap-1">
        <button className="place-self-end" onClick={() => onClose()}>
          <X color="white" />
        </button>
        <div className="bg-white p-2 rounded">
          {storedUser ? (<><LogOutAccount /></>) : (<><InsertAccount /></>)}  
        </div>
      </div>
    </div>
  );
};

export default Modal;
