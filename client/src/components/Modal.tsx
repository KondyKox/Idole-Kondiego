import { ReactNode } from "react";
import XMark from "./XMark";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return;

  return (
    <div className="w-full inset-0 fixed top-0 left-0 flex justify-center items-center z-50 bg-modal-bg p-4">
      <div className="relative w-full md:w-2/3 lg:w-1/2 p-8 flex justify-center items-center flex-col border-4 rounded-2xl bg-modal-bg-secondary">
        <button
          onClick={onClose}
          className="btn btn-xmark absolute top-4 right-4"
        >
          <XMark />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
