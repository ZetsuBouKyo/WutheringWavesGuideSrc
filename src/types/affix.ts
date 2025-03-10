export const AffixPolicyEnum = {
  AFFIXES_15_1: "affixes_15_1",
  AFFIXES_20_SMALL: "affixes_20_small",
  AFFIXES_20_SKILL_BONUS: "affixes_20_skill_bonus",
} as const;

export type TAffixPolicyEnum = (typeof AffixPolicyEnum)[keyof typeof AffixPolicyEnum] | string;
