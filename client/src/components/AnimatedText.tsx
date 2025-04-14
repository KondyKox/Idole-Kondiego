// Component with animated text

interface AnimatedTextProps {
  animate: boolean;
  isSuccessful: boolean;
  successfulText: string;
  failedText: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  animate,
  isSuccessful,
  successfulText,
  failedText,
}) => {
  return (
    <span
      className={`${
        isSuccessful ? "text-green-500" : "text-red-500"
      } opacity-0 italic text-sm ${animate ? "animate-floatUp" : ""}`}
    >
      {isSuccessful ? successfulText : failedText}
    </span>
  );
};

export default AnimatedText;
