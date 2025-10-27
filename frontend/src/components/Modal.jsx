import React from "react";
import { X } from "react-feather";
import InsertAccount from "./InsertAccount";

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-2">
      <div className="w-[600px] flex flex-col gap-1">
        <button className="place-self-end" onClick={() => onClose()}>
          <X color="white" />
        </button>
        <div className="bg-white p-2 rounded">
          <InsertAccount />
        </div>
      </div>
    </div>
  );
};

export default Modal;
