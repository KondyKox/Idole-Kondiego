import { ReactNode } from "react";

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
          className="btn text-red-500 hover:bg-red-500 hover:text-secondary absolute top-4 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
