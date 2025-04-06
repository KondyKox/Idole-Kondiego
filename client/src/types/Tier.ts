export type TierProps = {
  name: string;
  tierNumber: number;
  elements: TierElement[];
};

export type TierElement = {
  name: string;
  imageSrc: string;
};

export type TierNumber = 1 | 2 | 3 | 4 | 5 | 6;
