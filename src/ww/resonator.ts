import { SkillBonusEnum } from "@/types/buff";
import { ElementEnum } from "@/types/element";
import { SkillAttrEnum } from "@/types/skill";
import { ResonatorInfoEnum, type TResonatorInfoEnum } from "@/types/resonator";

import { StatBuff } from "./buff";

export class ResonatorModel {
  public resonator_src: string = ""; // TODO: deprecated
  public element: string = "";
  public element_src: string = ""; // TODO: deprecated
  public element_en: string = ""; // TODO: deprecated
  public elementSrc: string = "";
  public name: string = "";
  public chain: string = "";
  public weapon_name: string = "";
  public weapon_rank: string = "";
  public weapon_level: string = "";
  public level: string = "";
  public hp: string = "";
  public attack: string = "";
  public defense: string = "";
  public crit_rate: string = "";
  public crit_dmg: string = "";
  public energy_regen: string = "";
  public resonance_skill_dmg_bonus: string = "";
  public basic_attack_dmg_bonus: string = "";
  public heavy_attack_dmg_bonus: string = "";
  public resonance_liberation_dmg_bonus: string = "";
  public healing_bonus: string = "";
  public physical_dmg_bonus: string = "";
  public glacio_dmg_bonus: string = "";
  public fusion_dmg_bonus: string = "";
  public electro_dmg_bonus: string = "";
  public aero_dmg_bonus: string = "";
  public spectro_dmg_bonus: string = "";
  public havoc_dmg_bonus: string = "";
  public physical_dmg_res: string = "";
  public glacio_dmg_res: string = "";
  public fusion_dmg_res: string = "";
  public electro_dmg_res: string = "";
  public aero_dmg_res: string = "";
  public spectro_dmg_res: string = "";
  public havoc_dmg_res: string = "";
  public normal_attack_lv: string = "";
  public resonance_skill_lv: string = "";
  public resonance_liberation_lv: string = "";
  public forte_circuit_lv: string = "";
  public intro_skill_lv: string = "";
  public inherent_skill_1: string = "";
  public inherent_skill_2: string = "";
  public echo1: string = "";
  public echo_hp: string = "";
  public echo_hp_p: string = "";
  public echo_atk: string = "";
  public echo_atk_p: string = "";
  public echo_def: string = "";
  public echo_def_p: string = "";
  public echo_crit_rate: string = "";
  public echo_crit_dmg: string = "";
  public echo_energy_regen: string = "";
  public echo_sonata_1: string = "";
  public echo_sonata_2: string = "";
  public echo_sonata_3: string = "";
  public echo_sonata_4: string = "";
  public echo_sonata_5: string = "";
  public echo_resonance_skill_dmg_bonus: string = "";
  public echo_basic_attack_dmg_bonus: string = "";
  public echo_heavy_attack_dmg_bonus: string = "";
  public echo_resonance_liberation_dmg_bonus: string = "";
  public echo_echo_dmg_bonus: string = "";
  public echo_healing_bonus: string = "";
  public echo_glacio_dmg_bonus: string = "";
  public echo_fusion_dmg_bonus: string = "";
  public echo_electro_dmg_bonus: string = "";
  public echo_aero_dmg_bonus: string = "";
  public echo_spectro_dmg_bonus: string = "";
  public echo_havoc_dmg_bonus: string = "";

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorModel {
    return new ResonatorModel(JSON.parse(JSON.stringify(this)));
  }

  public getElementSrc(): string {
    switch (this.element) {
      case ElementEnum.GLACIO:
        return "/assets/elements/glacio.png";
      case ElementEnum.FUSION:
        return "/assets/elements/fusion.png";
      case ElementEnum.ELECTRO:
        return "/assets/elements/electro.png";
      case ElementEnum.AERO:
        return "/assets/elements/aero.png";
      case ElementEnum.SPECTRO:
        return "/assets/elements/spectro.png";
      case ElementEnum.HAVOC:
        return "/assets/elements/havoc.png";
      default:
        return "";
    }
  }
}

export class ResonatorModels {
  [resonatorId: string]: ResonatorModel;

  constructor(models: any = {}) {
    if (!models || Object.keys(models).length === 0) {
      return;
    }
    Object.keys(models).forEach((key: string) => {
      this[key] = new ResonatorModel(models[key]);
    });
  }
}

export class ResonatorTagInfo {
  public name: string = "";
  public desc: string = "";
  public icon: string = "";
  public color: string = "";

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorTagInfo {
    return new ResonatorTagInfo(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorStat {
  public life: number = 0;
  public atk: number = 0;
  public def: number = 0;
  public exp: number = 0;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorStat {
    return new ResonatorStat(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorSpecialCook {
  public id: number = 0;
  public name: string = "";
  public desc: string = "";
  public icon: string = "";
  public rarity: number = 0;

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorSpecialCook {
    return new ResonatorSpecialCook(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorCharactorInfo {
  public birth: string = "";
  public sex: string = "";
  public country: string = "";
  public influence: string = "";
  public info: string = "";
  public talentname: string = "";
  public talentdoc: string = "";
  public talentcertification: string = "";
  public cvnamecn: string = "";
  public cvnamejp: string = "";
  public cvnameko: string = "";
  public cvnameen: string = "";

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorCharactorInfo {
    return new ResonatorCharactorInfo(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorStory {
  public title: string = "";
  public content: string = "";

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorStory {
    return new ResonatorStory(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorVoice {
  public type: number | undefined = undefined;
  public title: string = "";
  public content: string = "";

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorVoice {
    return new ResonatorVoice(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorGood {
  public title: string = "";
  public content: string = "";
  public icon: string = "";

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): ResonatorGood {
    return new ResonatorGood(JSON.parse(JSON.stringify(this)));
  }
}

export class ResonatorInfo {
  public id: string = "";
  public no: string = ""; // @deprecated
  public rarity: string = "";
  public rank: string = ""; // @deprecated
  public name: string = "";
  public nick_name: string = "";
  public desc: string = "";
  public tags: Array<ResonatorTagInfo> = [];
  public is_permanent?: boolean = undefined;
  public stat_bonus: StatBuff = new StatBuff();
  public weapon_no: string = "";
  public element_id: string = "";
  public element_zh_tw: string = "";
  public element_en: string = "";

  public attrs: Array<{ lv: string; hp: string; atk: string; def: string }> = [];
  public skills: Array<any> = [];
  public skill_infos: any = {};

  public total_exp: number = 0;
  public stats: { [key: string]: ResonatorStat } = {};
  public special_cook: ResonatorSpecialCook = new ResonatorSpecialCook();
  public chara_info: ResonatorCharactorInfo = new ResonatorCharactorInfo();
  public stories: Array<ResonatorStory> = [];
  public voices: Array<ResonatorVoice> = [];
  public goods: Array<ResonatorGood> = [];

  constructor(info: any = {}) {
    if (!info || Object.keys(info).length === 0) {
      return;
    }
    const { tags, stat_bonus, stats, special_cook, chara_info, stories, voices, goods, ...data } = info;
    Object.assign(this, data);

    if (tags) {
      for (const tag of tags) {
        this.tags.push(new ResonatorTagInfo(tag));
      }
    }

    if (stat_bonus) {
      this.stat_bonus = new StatBuff(stat_bonus);
    }

    if (stats) {
      const levels = Object.keys(stats);
      for (const level of levels) {
        this.stats[level] = new ResonatorStat(stats[level]);
      }
    }

    if (special_cook) {
      this.special_cook = new ResonatorSpecialCook(special_cook);
    }

    if (chara_info) {
      this.chara_info = new ResonatorCharactorInfo(chara_info);
    }

    if (stories) {
      for (const story of stories) {
        this.stories.push(new ResonatorStory(story));
      }
    }

    if (voices) {
      for (const voice of voices) {
        this.voices.push(new ResonatorVoice(voice));
      }
    }

    if (goods) {
      for (const good of goods) {
        this.goods.push(new ResonatorGood(good));
      }
    }
  }

  public duplicate(): ResonatorInfo {
    const info = new ResonatorInfo();
    info.id = this.id;
    info.no = this.no; // @deprecated
    info.rarity = this.rarity;
    info.rank = this.rank; // @deprecated
    info.name = this.name;
    info.nick_name = this.nick_name;
    info.desc = this.desc;

    info.tags = [];
    for (const tag of this.tags) {
      info.tags.push(tag.duplicate());
    }

    info.is_permanent = this.is_permanent;
    if (this.stat_bonus.duplicate !== undefined) {
      info.stat_bonus = this.stat_bonus.duplicate();
    } else {
      info.stat_bonus = JSON.parse(JSON.stringify(this.stat_bonus));
    }
    info.weapon_no = this.weapon_no;
    info.element_id = this.element_id;
    info.element_zh_tw = this.element_zh_tw;
    info.element_en = this.element_en;
    info.attrs = JSON.parse(JSON.stringify(this.attrs));
    info.skills = JSON.parse(JSON.stringify(this.skills));
    info.skill_infos = JSON.parse(JSON.stringify(this.skill_infos));

    info.total_exp = this.total_exp;
    const levels = Object.keys(this.stats);
    for (const level of levels) {
      info.stats[level] = this.stats[level].duplicate();
    }
    info.special_cook = this.special_cook.duplicate();
    info.chara_info = this.chara_info.duplicate();

    for (const story of this.stories) {
      info.stories.push(story.duplicate());
    }
    for (const voice of this.voices) {
      info.voices.push(voice.duplicate());
    }
    for (const good of this.goods) {
      info.goods.push(good.duplicate());
    }

    return info;
  }

  public getHp(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (attr.lv === level) {
        return attr.hp;
      }
    }
    return "";
  }

  public getAtk(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (attr.lv === level) {
        return attr.atk;
      }
    }
    return "";
  }

  public getDef(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (attr.lv === level) {
        return attr.def;
      }
    }
    return "";
  }

  public getHtmlInfoBySkillType(type: TResonatorInfoEnum): string {
    let title: string = "";
    let text: string = "";
    switch (type) {
      case ResonatorInfoEnum.NORMAL_ATTACK:
        title = `【${ResonatorInfoEnum.NORMAL_ATTACK}】${this.skill_infos.normal_attack.name}<br /><br />`;
        text = this.skill_infos.normal_attack.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.RESONANCE_SKILL:
        title = `【${ResonatorInfoEnum.RESONANCE_SKILL}】${this.skill_infos.resonance_skill.name}<br /><br />`;
        text = this.skill_infos.resonance_skill.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.FORTE_CIRCUIT:
        title = `【${ResonatorInfoEnum.FORTE_CIRCUIT}】${this.skill_infos.forte_circuit.name}<br /><br />`;
        text = this.skill_infos.forte_circuit.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.RESONANCE_LIBERATION:
        title = `【${ResonatorInfoEnum.RESONANCE_LIBERATION}】${this.skill_infos.resonance_liberation.name}<br /><br />`;
        text = this.skill_infos.resonance_liberation.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.INTRO_SKILL:
        title = `【${ResonatorInfoEnum.INTRO_SKILL}】${this.skill_infos.intro_skill.name}<br /><br />`;
        text = this.skill_infos.intro_skill.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.OUTRO_SKILL:
        title = `【${ResonatorInfoEnum.OUTRO_SKILL}】${this.skill_infos.outro_skill.name}<br /><br />`;
        text = this.skill_infos.outro_skill.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.INHERENT_SKILL_1:
        title = `【${ResonatorInfoEnum.INHERENT_SKILL_1}】${this.skill_infos.inherent_skill_1.name}<br /><br />`;
        text = this.skill_infos.inherent_skill_1.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.INHERENT_SKILL_2:
        title = `【${ResonatorInfoEnum.INHERENT_SKILL_2}】${this.skill_infos.inherent_skill_2.name}<br /><br />`;
        text = this.skill_infos.inherent_skill_2.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.CHAIN1:
        title = `【${ResonatorInfoEnum.CHAIN1}】${this.skill_infos.chain1.name}<br /><br />`;
        text = this.skill_infos.chain1.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.CHAIN2:
        title = `【${ResonatorInfoEnum.CHAIN2}】${this.skill_infos.chain2.name}<br /><br />`;
        text = this.skill_infos.chain2.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.CHAIN3:
        title = `【${ResonatorInfoEnum.CHAIN3}】${this.skill_infos.chain3.name}<br /><br />`;
        text = this.skill_infos.chain3.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.CHAIN4:
        title = `【${ResonatorInfoEnum.CHAIN4}】${this.skill_infos.chain4.name}<br /><br />`;
        text = this.skill_infos.chain4.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.CHAIN5:
        title = `【${ResonatorInfoEnum.CHAIN5}】${this.skill_infos.chain5.name}<br /><br />`;
        text = this.skill_infos.chain5.description.replace(/\n/g, "<br />");
        break;
      case ResonatorInfoEnum.CHAIN6:
        title = `【${ResonatorInfoEnum.CHAIN6}】${this.skill_infos.chain6.name}<br /><br />`;
        text = this.skill_infos.chain6.description.replace(/\n/g, "<br />");
        break;
      default:
        return "";
    }
    return title + text;
  }

  public getDamageSkillItems(): Array<{ title: string; value: any }> {
    const items: Array<{ title: string; value: any }> = [];
    const skills = this.skills;
    skills.forEach((skill: any) => {
      if (skill.id && skill.type === "Damage") {
        const skillType = skill.skill_type;
        skill.tooltip = this.getHtmlInfoBySkillType(skillType);
        items.push({ title: skill.id, value: skill });
      }
    });
    return items;
  }

  public getDamageSkillItemById(id: string): { title: string; value: any } | undefined {
    const skills = this.skills;
    for (const skill of skills) {
      if (skill.type === "Damage" && skill.id && skill.id === id) {
        const skillType = skill.skill_type;
        skill.tooltip = this.getHtmlInfoBySkillType(skillType);
        return { title: skill.id, value: skill };
      }
    }
  }
}

export function getResonatorBaseAttrs(): Array<string> {
  return Object.values(SkillAttrEnum);
}

export function getResonatorMainSkillBonus(): Array<string> {
  return [SkillBonusEnum.SKILL, SkillBonusEnum.BASIC, SkillBonusEnum.HEAVY, SkillBonusEnum.LIBERATION];
}
