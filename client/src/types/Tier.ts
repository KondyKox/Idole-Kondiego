import { Dispatch, SetStateAction } from "react";

export type TierProps = {
  name: string;
  tierNumber: TierNumber;
  elements: TierElement[];
  setDraggedElement: Dispatch<SetStateAction<TierElement | null>>;
  onDropElement: (targetTier: TierNumber) => void;
  setSourceTierNumber: Dispatch<SetStateAction<TierNumber | null>>;
};

export type TierElement = {
  id: string;
  name: string;
  imageSrc: string;
};

export type TierNumber = 1 | 2 | 3 | 4 | 5 | 6;
