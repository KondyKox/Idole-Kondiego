export type TierProps = {
  _id: string;
  name: string;
  tierNumber: TierNumber;
  elements: TierElement[];
  onElementClick: (el: TierElement) => void;
  onDragStart: (
    el: TierElement,
    tierNumber: TierNumber,
    e?: React.TouchEvent
  ) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onDrop: (targetTierId: string) => void;
  onTouchEnd: (e: React.TouchEvent, element: TierElement) => void;
};

export type TierElement = {
  _id: string;
  name: string;
  imageSrc: string;
};

export type TierNumber = 1 | 2 | 3 | 4 | 5 | 6;
