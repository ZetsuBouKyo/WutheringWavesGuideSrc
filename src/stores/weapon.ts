import { mande } from "mande";
import { defineStore } from "pinia";

import { WeaponInfo } from "@/ww/weapon";
import { getKeyByValue } from "@/ww/utils";

const name2no: { [name: string]: string } = {
  教學長刃: "21010011",
  "原初長刃·朴石": "21010012",
  "暗夜長刃·玄明": "21010013",
  浩境粼光: "21010015",
  蒼鱗千嶂: "21010016",
  "源能長刃·測壹": "21010023",
  異響空靈: "21010024",
  時和歲稔: "21010026",
  "重破刃-41型": "21010034",
  "遠行者長刃·辟路": "21010043",
  永夜長明: "21010044",
  "戍關長刃·定軍": "21010053",
  鈞天正音: "21010063",
  東落: "21010064",
  紋秋: "21010074",
  凋亡頻移: "21010084",
  容赦的沉思錄: "21010094",
  教學迅刀: "21020011",
  "原初迅刀·鳴雨": "21020012",
  "暗夜迅刀·黑閃": "21020013",
  千古洑流: "21020015",
  赫奕流明: "21020016",
  心之錨: "21020017",
  "源能迅刀·測貳": "21020023",
  行進序曲: "21020024",
  裁春: "21020026",
  "瞬斬刀-18型": "21020034",
  不滅航路: "21020036",
  "遠行者迅刀·旅跡": "21020043",
  不歸孤軍: "21020044",
  血誓盟約: "21020046",
  "戍關迅刀·鎮海": "21020053",
  不屈命定之冠: "21020056",
  西升: "21020064",
  飛景: "21020074",
  永續坍縮: "21020084",
  風流的寓言詩: "21020094",
  教學佩槍: "21030011",
  "原初佩槍·穿林": "21030012",
  "暗夜佩槍·暗星": "21030013",
  停駐之煙: "21030015",
  死與舞: "21030016",
  "源能佩槍·測叄": "21030023",
  華彩樂段: "21030024",
  林間的詠嘆調: "21030026",
  "穿擊槍-26型": "21030034",
  "遠行者佩槍·洞察": "21030043",
  無眠烈火: "21030044",
  "戍關佩槍·平雲": "21030053",
  飛逝: "21030064",
  奔雷: "21030074",
  悖論噴流: "21030084",
  敘別的羅曼史: "21030094",
  教學臂鎧: "21040011",
  "原初臂鎧·磐岩": "21040012",
  "暗夜臂鎧·夜芒": "21040013",
  擎淵怒濤: "21040015",
  諸方玄樞: "21040016",
  "源能臂鎧·測肆": "21040023",
  呼嘯重音: "21040024",
  悲喜劇: "21040026",
  "鋼影拳-21丁型": "21040034",
  焰光裁定: "21040036",
  "遠行者臂鎧·破障": "21040043",
  袍澤之固: "21040044",
  "戍關臂鎧·拔山": "21040053",
  駭行: "21040064",
  金掌: "21040074",
  塵雲旋臂: "21040084",
  酩酊的英雄志: "21040094",
  教學音感儀: "21050011",
  "原初音感儀·聽浪": "21050012",
  "暗夜矩陣·暝光": "21050013",
  漪瀾浮錄: "21050015",
  掣傀之手: "21050016",
  淵海回聲: "21050017",
  "源能音感儀·測五": "21050023",
  奇幻變奏: "21050024",
  瓊枝冰綃: "21050026",
  大海的饋贈: "21050027",
  "鳴動儀-25型": "21050034",
  星序協響: "21050036",
  "遠行者矩陣·探幽": "21050043",
  今州守望: "21050044",
  和光回唱: "21050046",
  "戍關音感儀·留光": "21050053",
  異度: "21050064",
  清音: "21050074",
  核熔星盤: "21050084",
  虛飾的華爾茲: "21050094",
};

const nos = Object.values(name2no);

const spoilerNames: Array<string> = [];

export const useWeaponStore = defineStore("weapon", {
  state: () => ({}),
  actions: {
    getNames(spoiler: any = false): Array<string> {
      const names: Array<string> = Object.keys(name2no);
      if (spoiler === true) {
        return names;
      }
      const censoredNames: Array<string> = [];
      names.forEach((name: string) => {
        if (spoilerNames.includes(name)) {
          return;
        }
        censoredNames.push(name);
      });
      return censoredNames;
    },
    getTunes(): Array<string> {
      return new Array("1", "2", "3", "4", "5");
    },
    getNoByName(name: string): string {
      return name2no[name];
    },
    getNameByNo(no: string): string {
      return getKeyByValue(name2no, no);
    },
    async getInfoByNo(no: string): Promise<WeaponInfo | undefined> {
      try {
        const req = mande(`/data/weapons/${no}/info.json`);
        if (nos.includes(no)) {
          const info: any = new WeaponInfo(await req.get());
          return info;
        }
        return undefined;
      } catch (error) {
        throw error;
      }
    },
    async getInfoByName(name: string): Promise<WeaponInfo | undefined> {
      const no = this.getNoByName(name);
      const info = await this.getInfoByNo(no);
      return info;
    },
  },
});
