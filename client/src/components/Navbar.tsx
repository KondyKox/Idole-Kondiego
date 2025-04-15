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
    <nav className="flex justify-between items-center w-full p-4 fixed top-0 left-0 z-10 md:border-b-2 bg-transparent md:bg-primary">
      {/* Logo */}
      <div className="flex items-center gap-2"></div>

      {/* Mobile button */}
      <button className="md:hidden btn" onClick={toggleMenu}>
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
        <div className="flex flex-col justify-center items-center gap-2 border-b-2 py-2">
          <Link to="/" className="text-xl btn btn-navbar" onClick={toggleMenu}>
            Idole Kondiego
          </Link>
        </div>
        <Link
          to="/auth"
          className="text-xl btn btn-navbar"
          onClick={toggleMenu}
        >
          <User className="w-8 h-8 transition-transform duration-300 ease-in-out hover:scale-125" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
