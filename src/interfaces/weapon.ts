import { type IStatBuff } from "./buff";

export interface RowWeaponT {
  no: string;
  name: string;
  star: string;
  type: string;
  level: string;
  tune: string;
  atk: string;
  stat_bonus: IStatBuff;
  passive_stat_bonus: IStatBuff;
}
