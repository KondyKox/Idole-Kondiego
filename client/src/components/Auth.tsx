import { JSX, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Eye, EyeOff } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Auth = () => {
  const [formType, setFormType] = useState<"login" | "register">("register");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repPassword, setRepPassword] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [successfulText, setSuccessfulText] = useState<string>("");
  const [failedText, setFailedText] = useState<string>("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

  // Animate feedback from form
  const animateFeedback = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
  };

  // Submit form (login or register)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password) {
      console.log("All fields are required!");
      setFailedText("Wszystkie pola są wymagane!");
      animateFeedback();
      return;
    }

    try {
      let token: string, user: any;

      if (formType === "register") {
        if (password !== repPassword) {
          setFailedText("Hasła się nie zgadzają.");
          animateFeedback();
          return;
        }

        await registerUser(name, password);

        const loginResult = await loginUser(name, password);
        token = loginResult.token;
        user = loginResult.user;

        setSuccessfulText("Rejestracja zakończona sukcesem!");
      } else {
        const loginResult = await loginUser(name, password);
        token = loginResult.token;
        user = loginResult.user;

        setSuccessfulText("Zalogowano pomyślnie!");
      }

      localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
      localStorage.setItem(import.meta.env.VITE_USER_KEY, user);
      setSuccessful(true);

      setTimeout(() => navigate("/"), 2500);
    } catch (err: any) {
      setFailedText(err.message || "Wystąpił błąd.");
      setSuccessful(false);
    }

    animateFeedback();
  };

  if (isAuthenticated) navigate("/"); // redirect user to main page when logged in

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 mt-22">
      <form
        className="flex flex-col justify-center items-center gap-8 w-full py-2 px-4 md:py-12 md:px-16 lg:px-28 border-2 rounded-2xl"
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
        <AnimatedText
          animate={animate}
          isSuccessful={successful}
          successfulText={successfulText}
          failedText={failedText}
        />
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
