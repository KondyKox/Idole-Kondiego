import { TierNumber } from "./Tier";

const TierColors: Record<
  TierNumber,
  { bg: string; hover: string; text: string }
> = {
  1: {
    bg: "bg-tier-1",
    hover: "hover:bg-tier-1-hover",
    text: "text-tier-1",
  },
  2: {
    bg: "bg-tier-2",
    hover: "hover:bg-tier-2-hover",
    text: "text-tier-2",
  },
  3: {
    bg: "bg-tier-3",
    hover: "hover:bg-tier-3-hover",
    text: "text-tier-3",
  },
  4: {
    bg: "bg-tier-4",
    hover: "hover:bg-tier-4-hover",
    text: "text-tier-4",
  },
  5: {
    bg: "bg-tier-5",
    hover: "hover:bg-tier-5-hover",
    text: "text-tier-5",
  },
  6: {
    bg: "bg-tier-6",
    hover: "hover:bg-tier-6-hover",
    text: "text-tier-6",
  },
};

export default TierColors;
