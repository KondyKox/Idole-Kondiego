import { Dispatch, SetStateAction } from "react";

export type TierProps = {
  name: string;
  tierNumber: TierNumber;
  elements: TierElement[];
  setClickedElement: Dispatch<SetStateAction<TierElement | null>>;
  setDraggedElement: Dispatch<SetStateAction<TierElement | null>>;
  onDropElement: (targetTier: TierNumber) => void;
  setSourceTierNumber: Dispatch<SetStateAction<TierNumber | null>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type TierElement = {
  _id: string;
  name: string;
  imageSrc: string;
};

export type TierNumber = 1 | 2 | 3 | 4 | 5 | 6;
