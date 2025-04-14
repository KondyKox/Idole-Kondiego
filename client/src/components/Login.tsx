import FormProps from "../types/FormProps";

const Login = ({
  showPassword,
  renderEyeIcon,
  setName,
  setPassword,
}: FormProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 pb-4">
      <div className="flex flex-col border-2 rounded-2xl w-full relative">
        <label htmlFor="name" className="label">
          Nazwa
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Wpisz tu nazwę..."
          required
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>
      <div className="flex flex-col border-2 rounded-2xl w-full relative">
        <label htmlFor="password" className="label">
          Hasło
        </label>
        <input
          type={`${showPassword ? "text" : "password"}`}
          id="password"
          name="password"
          placeholder="Podaj swoje hasło..."
          required
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {renderEyeIcon()}
      </div>
    </div>
  );
};

export default Login;
