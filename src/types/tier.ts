export const TierEnum = {
  T01: "t01",
  T11: "t11",
  T21: "t21",
  T31: "t31",
  T41: "t41",
  T51: "t51",
  T61: "t61",
  T65: "t65",
} as const;

export type TTierEnum = (typeof TierEnum)[keyof typeof TierEnum] | string;
