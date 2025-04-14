import React, { useState } from "react";
import { TierNumber, TierProps } from "../types/Tier";
import XMark from "./XMark";
import TierColors from "../types/TierColors";
import Modal from "./Modal";
import { addElementToTierlist } from "../services/api";

const addIdolInputs = [
  {
    id: "idol_name",
    inputType: "text",
    labelText: "Imię idola",
    placeholder: "Wpisz nazwę idola...",
  },
  {
    id: "idol_imageSrc",
    inputType: "file",
    labelText: "Zdjęcie idola",
    placeholder: "Dawaj zdjęcie idola",
  },
];

const Tier = ({
  _id,
  name,
  tierNumber,
  elements,
  onElementClick,
  onDragStart,
  onTouchMove,
  onDrop,
  onTouchEnd,
}: TierProps) => {
  const { bg, hover } = TierColors[tierNumber as TierNumber] || {
    bg: "transparent",
    hover: "transparent",
  };

  const [newIdolName, setNewIdolName] = useState<string>("");
  const [newIdolImage, setNewIdolImage] = useState<File | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const [addingSuccessful, setAddingSuccessful] = useState<boolean>(false);

  // Funkcja obsługująca najechanie kursora na element
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // Funkcja obsługująca opuszczenie kursora z elementu
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIdolName(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewIdolImage(e.target.files[0]);
  };

  // Submit add new Idol
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newIdolImage || !newIdolName) {
      console.error("Both name and image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("tierId", _id);
    formData.append("idol_name", newIdolName);
    formData.append("idol_image", newIdolImage);

    try {
      await addElementToTierlist(formData);

      setAddingSuccessful(true);
    } catch (error) {
      setAddingSuccessful(false);
      console.error("Error adding idol:", error);
    }

    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      // setIsModalOpen(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex justify-center items-stretch border-b text-primary">
        <h2
          className={`text-center font-bold min-w-1/3 max-w-1/3 lg:min-w-1/5 lg:max-w-1/5 px-2 py-4 ${bg} relative`}
        >
          {name}
          <div
            className={`flex justify-center items-center border-2 rounded-lg px-6 py-4 cursor-pointer transition-colors duration-300 ease-in-out 
                      ${hover} hover:text-secondary group absolute bottom-4 left-1/2 -translate-x-1/2`}
            onClick={() => toggleModal()}
          >
            <XMark className="group-hover:scale-150 transition-transform duration-300 ease-in-out rotate-45" />
          </div>
        </h2>
        <div
          className="bg-tier-bg w-full px-2 md:px-4 py-2 flex gap-2 flex-wrap items-stretch"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(_id)}
          data-drop-target={_id}
        >
          {elements.map((el, index) => (
            <div
              key={el._id}
              className={`p-2 rounded-lg flex flex-col justify-center items-center gap-2 cursor-pointer transition-colors 
                            duration-300 ease-in-out ${bg} ${hover} relative group overflow-hidden max-w-20 touch-none select-none`}
              style={{
                backgroundColor: hoveredIndex === index ? hover : bg, // Change bg on hover
              }}
              onClick={() => onElementClick(el)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              draggable
              onDragStart={() => onDragStart(el, tierNumber)}
              onTouchStart={(e) => onDragStart(el, tierNumber, e)}
              onTouchMove={(e) => onTouchMove(e)}
              onTouchEnd={(e) => onTouchEnd(e, el)}
            >
              <img
                src={el.imageSrc}
                alt={el.name}
                className="rounded-lg w-full"
                draggable={false}
              />
              <span
                className={`absolute bottom-0 ${bg} transition-all duration-300 ease-in-out translate-y-5
                              group-hover:translate-y-0 w-full text-center`}
              >
                {el.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => toggleModal()}>
          <form
            className="flex flex-col justify-center items-center p-2 gap-8 w-full lg:w-1/2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h3 className="header text-gradient">Dodawanie nowego Idola</h3>
            <div className="flex flex-col justify-center items-center w-full gap-6">
              {addIdolInputs.map((input) => (
                <div
                  key={input.id}
                  className="flex flex-col border-2 rounded-2xl w-full relative"
                >
                  <label
                    htmlFor={input.id}
                    className="absolute -top-3 left-3 bg-secondary px-2 text-xs md:text-sm text-gray-600 rounded-2xl min-w-24"
                  >
                    {input.labelText}
                  </label>
                  <input
                    type={input.inputType}
                    name={input.id}
                    id={input.id}
                    placeholder={input.placeholder}
                    onChange={
                      input.id === "idol_name"
                        ? handleNameChange
                        : handleImageChange
                    }
                    required
                    className="bg-transparent outline-none px-4 py-2 rounded-xl focus:bg-secondary focus:text-primary transition-colors duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <button className="btn w-full font-bold">Dodaj idola</button>
              <span
                className={`${
                  addingSuccessful ? "text-green-500" : "text-red-500"
                } opacity-0 italic text-sm ${animate ? "animate-floatUp" : ""}`}
              >
                {addingSuccessful
                  ? "Dodano nowego Idola!"
                  : "Nie można dodać idola :("}
              </span>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Tier;
