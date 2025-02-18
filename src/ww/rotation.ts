import { resonators } from "./resonator";

const ActionIcons: any = {
  普攻: new URL("../assets/actions/left_click.svg", import.meta.url).href,
  普攻xN: new URL("../assets/actions/left_click.svg", import.meta.url).href,
  空中攻擊: new URL("../assets/actions/left_click.svg", import.meta.url).href,
  重擊: new URL("../assets/actions/hold_left_click.svg", import.meta.url).href,
  空中重擊: new URL("../assets/actions/hold_left_click.svg", import.meta.url).href,
  共鳴技能: new URL("../assets/actions/e.svg", import.meta.url).href,
  共鳴解放: new URL("../assets/actions/r.svg", import.meta.url).href,
  聲骸: new URL("../assets/actions/q.svg", import.meta.url).href,
  延奏: new URL("../assets/actions/num.svg", import.meta.url).href,
  變奏: "",
  入場: new URL("../assets/actions/num.svg", import.meta.url).href,
  空中入場: new URL("../assets/actions/num.svg", import.meta.url).href,
  鉤索: new URL("../assets/actions/t.svg", import.meta.url).href,
  協同攻擊: "",
  閃避: new URL("../assets/actions/shift.svg", import.meta.url).href,
  跳: new URL("../assets/actions/space.svg", import.meta.url).href,
  無: "",
};

export enum RotationActionEnum {
  COORDINATED_ATTACK = "協同攻擊",
}

type RotationAction = {
  name: string;
  src: string;
  skillID: string;
  timeStart: string;
  timeEnd: string;
  index0Based: string;
  supIndex?: number;
};

type RotationActionComment = {
  i: number;
  text: any;
};

export interface RotationRow {
  action: string;
  labels: string[];
  resonator_name: string;
  skill_id: string;
  time_start: string;
  time_end: string;
  comment: RotationActionComment | null;
  [key: string]: any;
}

export class ResonatorRotation {
  public resonatorName: string;
  public resonatorSrc: string;
  public actions: RotationAction[] = [];
  public comments: Array<any> = [];

  constructor(resonatorName: string) {
    this.resonatorName = resonatorName;
    this.resonatorSrc = resonators.getIconSrcByName(resonatorName);
  }
}

export function getRotation(rows: Array<RotationRow>): Array<ResonatorRotation> {
  let currentRotation = new ResonatorRotation("");
  const rotation: Array<ResonatorRotation> = [];
  let c = 1;

  rows.forEach((row, i) => {
    const resonatorName = row.resonator_name;
    const actionName = row.action;

    if (!resonatorName || !actionName || actionName === RotationActionEnum.COORDINATED_ATTACK) {
      return;
    }

    if (!currentRotation.resonatorName) {
      currentRotation = new ResonatorRotation(resonatorName);
    } else if (row.resonator_name !== currentRotation.resonatorName) {
      rotation.push(currentRotation);
      currentRotation = new ResonatorRotation(resonatorName);
    }

    const actionSrc = ActionIcons[actionName] || "";
    let supIndex;
    if (row.comment) {
      supIndex = c;
      currentRotation.comments.push({ i: c, text: row.comment });
      c += 1;
    }
    const action: RotationAction = {
      name: actionName,
      src: actionSrc,
      skillID: row.skill_id,
      timeStart: row.time_start,
      timeEnd: row.time_end,
      index0Based: i.toString(),
      supIndex: supIndex,
    };

    currentRotation.actions.push(action);
  });

  rotation.push(currentRotation);

  return rotation;
}
