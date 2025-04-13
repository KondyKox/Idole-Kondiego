import { useEffect, useState } from "react";
import { TierElement, TierNumber, TierProps } from "../types/Tier";
import Tier from "./Tier";
import Modal from "./Modal";
import { fetchTiers, moveElement } from "../services/api";

const TierList = () => {
  const [tiers, setTiers] = useState<TierProps[]>([]);
  const [clickedElement, setClickedElement] = useState<TierElement | null>(
    null
  );
  const [draggedElement, setDraggedElement] = useState<TierElement | null>(
    null
  );
  const [sourceTierNumber, setSourceTierNumber] = useState<TierNumber | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch tiers from mongoDB
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTiers();
        setTiers(data);
      } catch (error) {
        console.error("Error fetching tiers:", error);
      }
    };

    getData();
  }, []);

  // Handle drag tier element
  const handleElementDragStart = (
    element: TierElement,
    tierNumber: TierNumber
  ) => {
    setDraggedElement(element);
    setSourceTierNumber(tierNumber);
  };

  // Drop element into new tier
  const handleDropElement = async (targetTierId: string) => {
    if (!draggedElement || sourceTierNumber === null) return;

    const updatedTiers = [...tiers]; // copy tiers

    // Delete from source tier
    const sourceIndex = updatedTiers.findIndex(
      (t) => t.tierNumber === sourceTierNumber
    );
    updatedTiers[sourceIndex].elements = updatedTiers[
      sourceIndex
    ].elements.filter((el) => el._id !== draggedElement._id);

    // Add element to a new tier
    const targetIndex = updatedTiers.findIndex((t) => t._id === targetTierId);
    updatedTiers[targetIndex].elements.push(draggedElement);

    await moveElement(
      draggedElement._id,
      updatedTiers[sourceIndex]._id,
      targetTierId
    );

    setTiers(updatedTiers);
    setDraggedElement(null);
    setSourceTierNumber(null);
  };

  // Handle click on the element (open modal & select this element)
  const handleElementClick = (el: TierElement) => {
    setIsModalOpen(true);
    setClickedElement(el);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full p-2">
        {tiers.map((tier) => (
          <div key={tier.tierNumber}>
            <Tier
              _id={tier._id}
              name={tier.name}
              tierNumber={tier.tierNumber}
              elements={tier.elements}
              handleElementClick={handleElementClick}
              handleElementDragStart={handleElementDragStart}
              onDropElement={handleDropElement}
            />
          </div>
        ))}
      </div>
      {isModalOpen && clickedElement && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex justify-center items-center flex-col gap-2">
            <h3 className="header text-gradient">{clickedElement.name}</h3>
            <img
              src={clickedElement.imageSrc}
              alt={clickedElement.name}
              className="rounded-2xl max-w-32 md:max-w-44 lg:max-w-64 shadow-2xl shadow-blue-500"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default TierList;
