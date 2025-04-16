import { useEffect, useState } from "react";
import { TierElement, TierNumber, TierProps } from "../types/Tier";
import Tier from "./Tier";
import Modal from "./Modal";
import { deleteElement, fetchTiers, moveElement } from "../api/tiers";
import AnimatedText from "./AnimatedText";
import { useAuth } from "../hooks/useAuth";

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
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [showGhost, setShowGhost] = useState<boolean>(false);
  const [deletingSuccessful, setDeletingSuccessful] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const { isAdmin } = useAuth();

  // Fetch tiers from mongoDB
  const getData = async () => {
    try {
      const data: TierProps[] = await fetchTiers();
      const sortedData = data.sort((a, b) => a.tierNumber - b.tierNumber);

      setTiers(sortedData);
    } catch (error) {
      console.error("Error fetching tiers:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Handle drag tier element
  const handleElementDragStart = (
    element: TierElement,
    tierNumber: TierNumber,
    e?: React.TouchEvent
  ) => {
    setDraggedElement(element);
    setSourceTierNumber(tierNumber);

    if (e) {
      const touch = e.touches[0];
      setTouchPos({ x: touch.clientX, y: touch.clientY });
      setShowGhost(true);
    }
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

  // Drop element on mobile
  const handleTouchEnd = (e: React.TouchEvent, element: TierElement) => {
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetId = dropTarget
      ?.closest("[data-drop-target]")
      ?.getAttribute("data-drop-target");

    if (targetId) {
      setDraggedElement(element);
      handleDropElement(targetId); // drop element
      setShowGhost(false);
      setTouchPos(null);
    }
  };

  // Handle click on the element (open modal & select this element)
  const handleElementClick = (el: TierElement) => {
    setIsModalOpen(true);
    setClickedElement(el);
  };

  // Move element on touch on mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!showGhost) return;
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  // Handle delete element from tierlist
  const handleDeleteElement = async (elementId: string) => {
    try {
      await deleteElement(elementId);

      setDeletingSuccessful(true);
    } catch (error) {
      console.error("Cannot delete element:", error);
      setDeletingSuccessful(false);
    }

    getData();
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setIsModalOpen(false);
    }, 2000);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-2 mt-20">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold p-4 text-gradient text-center">
        Tierlista Idoli Kondiego
      </h1>
      <div className="w-full p-2 relative">
        {tiers && tiers.length > 0 ? (
          tiers.map((tier) => (
            <div key={tier.tierNumber}>
              <Tier
                _id={tier._id}
                name={tier.name}
                tierNumber={tier.tierNumber}
                elements={tier.elements}
                onElementClick={handleElementClick}
                onDragStart={handleElementDragStart}
                onTouchMove={handleTouchMove}
                onDrop={handleDropElement}
                onTouchEnd={handleTouchEnd}
                updateTiers={getData}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <span className="font-bold text-2xl text-center">
              Jeszcze nie wczytano danych... No sorry.
            </span>
          </div>
        )}

        {showGhost && touchPos && draggedElement && (
          <div
            className="pointer-events-none absolute z-50 max-w-20 rounded-lg shadow-2xl opacity-80"
            style={{
              top: `${touchPos.y - 100}px`,
              left: `${touchPos.x - 100}px`,
              // transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={`http://localhost:5000/${draggedElement.imageSrc}`}
              alt={draggedElement.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {isModalOpen && clickedElement && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex justify-center items-center flex-col gap-4">
            <h3 className="header text-gradient">{clickedElement.name}</h3>
            <img
              src={`http://localhost:5000/${clickedElement.imageSrc}`}
              alt={clickedElement.name}
              className="rounded-2xl max-w-32 md:max-w-44 lg:max-w-64 shadow-2xl shadow-blue-500"
            />
            {isAdmin && (
              <button
                className="btn w-full font-bold"
                onClick={() => handleDeleteElement(clickedElement._id)}
              >
                Usuń
              </button>
            )}
            <AnimatedText
              animate={animate}
              isSuccessful={deletingSuccessful}
              successfulText="Usunięto Idola!"
              failedText="Nie można usunąć idola"
            />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default TierList;
