export type TierProps = {
  _id: string;
  name: string;
  tierNumber: TierNumber;
  elements: TierElement[];
  handleElementClick: (el: TierElement) => void;
  handleElementDragStart: (el: TierElement, tierNumber: TierNumber) => void;
  onDropElement: (targetTierId: string) => void;
};

export type TierElement = {
  _id: string;
  name: string;
  imageSrc: string;
};

export type TierNumber = 1 | 2 | 3 | 4 | 5 | 6;
