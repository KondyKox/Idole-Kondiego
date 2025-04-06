import { useState } from "react";
import { TierNumber, TierProps } from "../types/Tier";

const tierColors: Record<TierNumber, { bg: string; hover: string }> = {
  1: { bg: "bg-tier-1", hover: "hover:bg-tier-1-hover" },
  2: { bg: "bg-tier-2", hover: "hover:bg-tier-2-hover" },
  3: { bg: "bg-tier-3", hover: "hover:bg-tier-3-hover" },
  4: { bg: "bg-tier-4", hover: "hover:bg-tier-4-hover" },
  5: { bg: "bg-tier-5", hover: "hover:bg-tier-5-hover" },
  6: { bg: "bg-tier-6", hover: "hover:bg-tier-6-hover" },
};

const Tier = ({ name, tierNumber, elements }: TierProps) => {
  const { bg, hover } = tierColors[tierNumber as TierNumber] || {
    bg: "transparent",
    hover: "transparent",
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Funkcja obsługująca najechanie kursora na element
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // Funkcja obsługująca opuszczenie kursora z elementu
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="flex justify-center items-stretch border-b text-primary">
      <h2
        className={`text-center font-bold min-w-1/3 max-w-1/3 lg:min-w-1/5 lg:max-w-1/5 px-2 py-4 ${bg}`}
      >
        {name}
      </h2>
      <div className="bg-tier-bg w-full px-2 md:px-4 py-2 flex gap-2 flex-wrap">
        {elements.map((el, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg flex flex-col justify-center items-center gap-2 cursor-pointer w-20 md:w-24 transition-colors 
                        duration-300 ease-in-out ${bg} ${hover}`}
            style={{
              backgroundColor: hoveredIndex === index ? hover : bg, // Change bg on hover
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {el.name}
            <img src={el.imageSrc} alt={el.name} className="rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tier;
