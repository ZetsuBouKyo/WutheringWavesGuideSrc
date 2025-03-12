import i18n from "@/i18n";

import { AffixPolicyEnum } from "@/types/affix";
import { BuffTypeEnum, ElementBonusEnum, SkillBonusEnum, RowBuffCategoryEnum, RowBuffSourceEnum } from "@/types/buff";
import { EchoNameEnum } from "@/types/echo";
import { SonataEnum } from "@/types/sonata";

import { RowEcho } from "@/ww/row/echo";
import { RowBuff } from "@/ww/row/buff";

import { StatBuff } from "@/ww/buff";

export class RowEchoesSummary {
  public name1: string = "";
  public sonatas: Array<string> = [];
  public total_cost: number = 0;
  public main_affix: StatBuff = new StatBuff();
  public sub_affix: StatBuff = new StatBuff();

  public duplicate(): RowEchoesSummary {
    const s = new RowEchoesSummary();
    s.name1 = this.name1;
    s.sonatas = JSON.parse(JSON.stringify(this.sonatas));
    s.total_cost = this.total_cost;
    s.main_affix = this.main_affix.duplicate();
    s.sub_affix = this.sub_affix.duplicate();
    return s;
  }

  public getRowBuffs(): Array<RowBuff> {
    const mainBuffs = this.main_affix.getRowBuffs(`${RowBuffCategoryEnum.ECHO}-${RowBuffSourceEnum.MAIN_AFFIX}`);
    const subBuffs = this.sub_affix.getRowBuffs(`${RowBuffCategoryEnum.ECHO}-${RowBuffSourceEnum.SUB_AFFIX}`);
    return [...mainBuffs, ...subBuffs];
  }
}

export class RowEchoes {
  public policy: string = "";
  public base_attr: string = "";
  public main_skill_bonus: string = "";
  public echoes: Array<RowEcho> = [];
  public summary: RowEchoesSummary = new RowEchoesSummary();

  constructor() {
    this.echoes = Array.from({ length: 5 }, (_, __) => new RowEcho());
  }

  public duplicate(): RowEchoes {
    const echoes = new RowEchoes();
    echoes.policy = this.policy;
    echoes.base_attr = this.base_attr;
    this.echoes.forEach((echo, i) => {
      echoes.echoes[i] = echo.duplicate();
    });
    echoes.summary = this.summary.duplicate();
    return echoes;
  }

  public getRowBuffs(): Array<RowBuff> {
    return this.summary.getRowBuffs();
  }

  private getPassiveSkillRowBuff(
    source: string,
    type: string,
    element: string,
    skill_bonus_type: string,
    value: string,
  ): RowBuff {
    const buff = new RowBuff();
    buff.category = RowBuffCategoryEnum.ECHO;
    buff.source = source;
    buff.type = type;
    buff.value = value;
    buff.stack = "1";
    buff.element = element;
    buff.skill_bonus_type = skill_bonus_type;
    buff.updateId();
    return buff;
  }

  public getPassiveSkillRowBuffs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];
    const name = this.summary.name1;
    if (!name) {
      return buffs;
    }
    const source: string = `${name}-${RowBuffSourceEnum.MAIN_SLOT}`;
    switch (name) {
      case EchoNameEnum.HECATE:
        buffs.push(
          this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.COORDINATED_ATTACK, "0.4"),
        );
        break;
      case EchoNameEnum.SENTRY_CONSTRUCT:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.GLACIO, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.SKILL, "0.12"));
        break;
      case EchoNameEnum.LORELEI:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.HAVOC, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.BASIC, "0.12"));
        break;
      case EchoNameEnum.NIGHTMARE_INFERNO_RIDER:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.FUSION, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.SKILL, "0.12"));
      case EchoNameEnum.NIGHTMARE_THUNDERING_MEPHIS:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.ELECTRO, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.LIBERATION, "0.12"));
      case EchoNameEnum.NIGHTMARE_TEMPEST_MEPHIS:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.ELECTRO, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.SKILL, "0.12"));
      case EchoNameEnum.DRAGON_OF_DIRGE:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.FUSION, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.BASIC, "0.12"));
      case EchoNameEnum.NIGHTMARE_CROWNLESS:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.HAVOC, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.BASIC, "0.12"));
      case EchoNameEnum.NIGHTMARE_MOURNING_AIX:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.SPECTRO, "", "0.12"));
      case EchoNameEnum.NIGHTMARE_IMPERMANENCE_HERON:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.HAVOC, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.HEAVY, "0.12"));
      case EchoNameEnum.NIGHTMARE_FEILIAN_BERINGAL:
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, ElementBonusEnum.AERO, "", "0.12"));
        buffs.push(this.getPassiveSkillRowBuff(source, BuffTypeEnum.BONUS, "", SkillBonusEnum.HEAVY, "0.12"));
      default:
        return buffs;
    }
    return buffs;
  }

  private getSonataRowBuff(
    sonata: string,
    type: string,
    element: string,
    skill_bonus_type: string,
    value: string,
  ): RowBuff {
    const buff = new RowBuff();
    buff.category = RowBuffCategoryEnum.SONATA;
    buff.source = `${sonata}-2/2`;
    buff.type = type;
    buff.value = value;
    buff.stack = "1";
    buff.element = element;
    buff.skill_bonus_type = skill_bonus_type;
    buff.updateId();
    return buff;
  }

  public getSonataRowBuffs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];
    const counter: any = {
      [SonataEnum.FREEZING_FROST]: 0,
      [SonataEnum.MOLTEN_RIFT]: 0,
      [SonataEnum.VOID_THUNDER]: 0,
      [SonataEnum.SIERRA_GALE]: 0,
      [SonataEnum.CELESTIAL_LIGHT]: 0,
      [SonataEnum.SUN_SINKING_ECLIPSE]: 0,
      [SonataEnum.REJUVENATING_GLOW]: 0,
      [SonataEnum.MOONLIT_CLOUDS]: 0,
      [SonataEnum.LINGERING_TUNES]: 0,
      [SonataEnum.FROSTY_RESOLVE]: 0,
      [SonataEnum.ETERNAL_RADIANCE]: 0,
      [SonataEnum.MIDNIGHT_VEIL]: 0,
      [SonataEnum.EMPYREAN_ANTHEM]: 0,
      [SonataEnum.TIDEBREAKING_COURAGE]: 0,
    };
    this.echoes.forEach((echo: RowEcho) => {
      const sonata = echo.sonata;
      if (!sonata) {
        return;
      }
      counter[sonata] += 1;
    });

    if (counter[SonataEnum.FREEZING_FROST] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.FREEZING_FROST,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.GLACIO,
        "",
        "0.1",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.MOLTEN_RIFT] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.MOLTEN_RIFT,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.FUSION,
        "",
        "0.1",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.VOID_THUNDER] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.VOID_THUNDER,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.ELECTRO,
        "",
        "0.1",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.SIERRA_GALE] >= 2) {
      const buff = this.getSonataRowBuff(SonataEnum.SIERRA_GALE, BuffTypeEnum.BONUS, ElementBonusEnum.AERO, "", "0.1");
      buffs.push(buff);
    }

    if (counter[SonataEnum.CELESTIAL_LIGHT] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.CELESTIAL_LIGHT,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.SPECTRO,
        "",
        "0.1",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.SUN_SINKING_ECLIPSE] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.SUN_SINKING_ECLIPSE,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.HAVOC,
        "",
        "0.1",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.LINGERING_TUNES] >= 2) {
      const buff = this.getSonataRowBuff(SonataEnum.LINGERING_TUNES, BuffTypeEnum.ATK_P, "", "", "0.1");
      buffs.push(buff);
    }

    if (counter[SonataEnum.FROSTY_RESOLVE] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.FROSTY_RESOLVE,
        BuffTypeEnum.BONUS,
        "",
        SkillBonusEnum.SKILL,
        "0.12",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.ETERNAL_RADIANCE] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.ETERNAL_RADIANCE,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.SPECTRO,
        "",
        "0.1",
      );
      buffs.push(buff);
    }

    if (counter[SonataEnum.MIDNIGHT_VEIL] >= 2) {
      const buff = this.getSonataRowBuff(
        SonataEnum.MIDNIGHT_VEIL,
        BuffTypeEnum.BONUS,
        ElementBonusEnum.HAVOC,
        "",
        "0.1",
      );
      buffs.push(buff);
    }
    return buffs;
  }

  public getEchoPolicyItems(): Array<{ title: string; value: string }> {
    return [
      // @ts-ignore
      { title: i18n.global.t(`general.${AffixPolicyEnum.AFFIXES_15_1}`), value: AffixPolicyEnum.AFFIXES_15_1 },
      { title: i18n.global.t(`general.${AffixPolicyEnum.AFFIXES_20_SMALL}`), value: AffixPolicyEnum.AFFIXES_20_SMALL },
      {
        title: i18n.global.t(`general.${AffixPolicyEnum.AFFIXES_20_SKILL_BONUS}`),
        value: AffixPolicyEnum.AFFIXES_20_SKILL_BONUS,
      },
    ];
  }

  public resetPolicy() {
    this.policy = "";
  }

  public resetSummary() {
    this.summary.name1 = "";
    this.summary.sonatas = [];
    this.summary.total_cost = 0;
    this.summary.main_affix = new StatBuff();
    this.summary.sub_affix = new StatBuff();
  }

  public getEcho(i: number): RowEcho {
    return this.echoes[i];
  }

  public updateEchoByCost(i: number, item: string) {
    this.resetPolicy();
    const echo = this.getEcho(i);
    echo.updateByCost(item);
  }

  public updateEchoByEchoItem(i: number, item: { title: string; value: any }) {
    this.resetPolicy();
    const echo = this.getEcho(i);
    echo.updateByEchoItem(item);
  }

  public updateEchoMainAffix(i: number, item: string) {
    this.resetPolicy();
    const echo = this.getEcho(i);
    echo.updateMainAffix(item);
  }

  public updateSummaryByEchoes() {
    this.resetSummary();
    const name = this.echoes[0].name;
    if (name) {
      this.summary.name1 = name;
    }
    this.echoes.forEach((echo: RowEcho) => {
      this.summary.total_cost += parseFloat(echo.cost);
      const sonata = echo.sonata;
      if (sonata) {
        this.summary.sonatas.push(sonata);
      }
      this.summary.main_affix.addStatBuff(echo.main_affix);
      this.summary.sub_affix.addStatBuff(echo.sub_affix);
    });
  }
}
