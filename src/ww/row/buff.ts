import {
  RowBuffCategoryEnum,
  SkillBonusEnum,
  type TSkillBonusEnum,
  type TElementBonusEnum,
  type TBuffTypeEnum,
  type TRowBuffCategoryEnum,
} from "@/types/buff";

import { useResonatorStore } from "@/stores/resonator";
import { useWeaponStore } from "@/stores/weapon";
import { useEchoStore } from "@/stores/echo";
import { getSonataInfo } from "@/stores/sonata";

export class RowBuff {
  public id: string = ""; // TODO: id -> name?
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

  public tooltip: string = "";

  constructor(buff: any = {}) {
    if (!buff || Object.keys(buff).length === 0) {
      return;
    }
    Object.assign(this, buff);
  }

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

  public async getHtmlToolTip(): Promise<string> {
    let store: any;
    let sources: any;
    let info: any;
    switch (this.category) {
      case RowBuffCategoryEnum.RESONATOR:
        store = useResonatorStore();
        sources = this.source.split("-");
        if (sources.length !== 2) {
          return "";
        }
        info = await store.getInfoByName(sources[0]);
        if (!info.name) {
          return "";
        }
        this.tooltip = info.getHtmlInfoBySkillType(sources[1]);
        break;
      case RowBuffCategoryEnum.WEAPON:
        store = useWeaponStore();
        sources = this.source.split("-");
        if (sources.length !== 2) {
          return "";
        }
        info = await store.getInfoByName(sources[0]);
        if (!info.name) {
          return "";
        }
        this.tooltip = info.getHtmlInfo();
        break;
      case RowBuffCategoryEnum.ECHO:
        store = useEchoStore();
        if (!this.source) {
          return "";
        }
        info = store.getInfoByName(this.source);
        this.tooltip = info.getHtmlInfo();
        break;
      case RowBuffCategoryEnum.SONATA:
        if (!this.source) {
          return "";
        }
        info = getSonataInfo(this.source);
        if (!info) {
          return "";
        }
        this.tooltip = info.getHtmlInfo();
        break;
      default:
        break;
    }
    return this.tooltip;
  }

  public updateId() {
    this.id = this.getId();
  }
}

export class RowResonatorBuff extends RowBuff {
  public isName(name: string): boolean {
    const sources = this.source.split("-");
    if (sources[0] && sources[0] === name) {
      return true;
    }
    return false;
  }
}

export class RowWeaponBuff extends RowResonatorBuff {}

export class RowEchoBuff extends RowBuff {
  public isName(name: string): boolean {
    if (this.source === name) {
      return true;
    }
    return false;
  }
}

export class RowSonataBuff extends RowEchoBuff {}
