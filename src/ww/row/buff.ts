import {
  SkillBonusEnum,
  type TSkillBonusEnum,
  type TElementBonusEnum,
  type TBuffTypeEnum,
  type TRowBuffCategoryEnum,
} from "@/types/buff";

export class RowBuff {
  public id: string = "";
  public category: TRowBuffCategoryEnum = "";
  public source: string = ""; // e.g. "漂泊者·衍射(男)-固有技能1", "擎淵怒濤-1諧振", "鳴鐘之龜", "凝夜白霜"
  public suffix: string = "";
  public type: TBuffTypeEnum = "";
  public value: string = "";
  public stack: string = "";
  public duration: string = "";
  public target: string = "";
  public element: TElementBonusEnum = "";
  public skill_bonus_type: TSkillBonusEnum = "";

  public getId(): string {
    let finalType = this.type;
    if (finalType) {
      if (!this.element) {
        if (!this.skill_bonus_type) {
          finalType = this.type;
        } else {
          finalType = this.skill_bonus_type;
        }
      } else if (!this.skill_bonus_type) {
        finalType = this.element;
      } else {
        finalType = SkillBonusEnum.NONE;
      }
    } else {
      finalType = SkillBonusEnum.NONE;
    }

    let id: string;
    if (this.target) {
      id = `[${finalType}-${this.target}]`;
    } else {
      id = `[${finalType}]`;
    }

    if (this.source) {
      id = `${id}${this.source}`;
    }

    if (this.suffix) {
      id = `${id}-${this.suffix}`;
    }
    return id;
  }

  public updateId() {
    this.id = this.getId();
  }
}
