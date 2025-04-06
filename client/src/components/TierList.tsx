import { useEffect, useState } from "react";
import { TierProps } from "../types/Tier";
import Tier from "./Tier";

const TierList = () => {
  const [tiers, setTiers] = useState<TierProps[]>([]);

  useEffect(() => {
    fetch("/data/tiers.json")
      .then((response) => response.json())
      .then((data) => setTiers(data.tiers))
      .catch((error) => console.error("Error fetching tiers:", error));
  }, []);

  return (
    <div className="w-full p-2">
      {tiers.map((tier) => (
        <div key={tier.tierNumber}>
          <Tier
            name={tier.name}
            tierNumber={tier.tierNumber}
            elements={tier.elements}
          />
        </div>
      ))}
    </div>
  );
};

export default TierList;
