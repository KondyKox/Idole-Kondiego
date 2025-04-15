import { User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import XMark from "./XMark";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center w-full py-4 px-4 md:px-12 fixed top-0 left-0 z-10 md:border-b-2 bg-transparent md:bg-primary">
      {/* Logo */}
      <div className="hidden md:flex items-center gap-2">
        <Link
          to={"/"}
          className="transition-colors duration-300 ease-in-out hover:drop-shadow-blue-500"
        >
          <img src="/logo.svg" alt="Logo" className="w-12" />
        </Link>
      </div>

      {/* Mobile button */}
      <button
        className="md:hidden btn absolute right-4 top-4"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Links to pages */}
      <div className="hidden md:flex items-center gap-2">
        <Link to={"/"} className="btn btn-navbar">
          Idole Kondiego
        </Link>
      </div>

      {/* Link to /auth */}
      <Link
        to={"/auth"}
        className="hidden md:flex justify-center items-center gap-4"
      >
        <User className="w-8 h-8 transition-transform duration-300 ease-in-out hover:scale-125" />
      </Link>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-0 left-0 w-full h-screen bg-primary bg-opacity-90 z-20 p-8 flex flex-col items-center justify-center space-y-4`}
      >
        <button
          onClick={toggleMenu}
          className="btn btn-xmark absolute top-4 right-4"
        >
          <XMark />
        </button>
        <Link
          to={"/"}
          className="border-b-2 w-full flex justify-center items-center pb-4"
        >
          <img src="/logo.svg" alt="Logo" className="w-24" />
        </Link>

        <div className="flex flex-col justify-center items-center gap-2 border-b-2 pb-4 w-full">
          <Link to="/" className="text-xl btn btn-navbar" onClick={toggleMenu}>
            Idole Kondiego
          </Link>
        </div>
        <Link
          to="/auth"
          className="text-xl btn btn-navbar"
          onClick={toggleMenu}
        >
          <User className="w-12 h-12 transition-transform duration-300 ease-in-out hover:scale-125" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
