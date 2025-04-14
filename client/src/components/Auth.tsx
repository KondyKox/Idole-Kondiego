import { JSX, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [formType, setFormType] = useState<"login" | "register">("register");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repPassword, setRepPassword] = useState<string>("");

  const toggleFormType = () => {
    formType === "register" ? setFormType("login") : setFormType("register");
    setShowPassword(false);
  };

  // Render Eye Icon for show / hide password
  const renderEyeIcon = (): JSX.Element => {
    return showPassword ? (
      <EyeOff
        size={20}
        className="absolute top-0 right-2 translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(false)}
      />
    ) : (
      <Eye
        size={20}
        className="absolute top-0 right-2 translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword(true)}
      />
    );
  };

  // Submit form (login or register)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      <form
        className="flex flex-col justify-center items-center gap-8 w-full py-2 px-4 md:py-12 md:px-16 border-2 rounded-2xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="header text-gradient">
          {formType === "register" ? "rejestracja" : "logowanie"}
        </h2>
        {formType === "register" ? (
          <Register
            showPassword={showPassword}
            renderEyeIcon={renderEyeIcon}
            setName={setName}
            setPassword={setPassword}
            setRepPassword={setRepPassword}
          />
        ) : (
          <Login
            showPassword={showPassword}
            renderEyeIcon={renderEyeIcon}
            setName={setName}
            setPassword={setPassword}
          />
        )}
        <button className="btn w-full">
          {formType === "register" ? "Zarejestruj się" : "Zaloguj się"}
        </button>
      </form>
      <button
        className="btn w-full btn-secondary"
        onClick={() => toggleFormType()}
      >
        {formType === "register"
          ? "Masz już konto? Zaloguj się."
          : "Nie masz konta? Tutaj rejestracja."}
      </button>
    </div>
  );
};

export default Auth;
