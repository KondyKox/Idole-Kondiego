import { useEffect, useState } from "react";
import { TierElement, TierNumber, TierProps } from "../types/Tier";
import Tier from "./Tier";

const TierList = () => {
  const [tiers, setTiers] = useState<TierProps[]>([]);
  const [draggedElement, setDraggedElement] = useState<TierElement | null>(
    null
  );
  const [sourceTierNumber, setSourceTierNumber] = useState<TierNumber | null>(
    null
  );

  // Fetch tiers from .json
  useEffect(() => {
    fetch("/data/tiers.json")
      .then((response) => response.json())
      .then((data) => setTiers(data.tiers))
      .catch((error) => console.error("Error fetching tiers:", error));
  }, []);

  // Drop element into new tier
  const handleDropElement = (targetTier: TierNumber) => {
    if (!draggedElement || sourceTierNumber === null) return;

    const updatedTiers = [...tiers]; // copy tiers

    // Delete from source tier
    const sourceIndex = updatedTiers.findIndex(
      (t) => t.tierNumber === sourceTierNumber
    );
    updatedTiers[sourceIndex].elements = updatedTiers[
      sourceIndex
    ].elements.filter((el) => el.name !== draggedElement.name); // Searching by name; Replace with id when MongoDB will be added

    // Add element to a new tier
    const targetIndex = updatedTiers.findIndex(
      (t) => t.tierNumber === targetTier
    );
    updatedTiers[targetIndex].elements.push(draggedElement);

    setTiers(updatedTiers);
    setDraggedElement(null);
    setSourceTierNumber(null);
  };

  return (
    <div className="w-full p-2">
      {tiers.map((tier) => (
        <div key={tier.tierNumber}>
          <Tier
            name={tier.name}
            tierNumber={tier.tierNumber}
            elements={tier.elements}
            setDraggedElement={setDraggedElement}
            onDropElement={handleDropElement}
            setSourceTierNumber={setSourceTierNumber}
          />
        </div>
      ))}
    </div>
  );
};

export default TierList;
