import { Dispatch, JSX, SetStateAction } from "react";

interface FormProps {
  showPassword: boolean;
  renderEyeIcon: () => JSX.Element;
  setName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setRepPassword?: Dispatch<SetStateAction<string>>;
}

export default FormProps;
