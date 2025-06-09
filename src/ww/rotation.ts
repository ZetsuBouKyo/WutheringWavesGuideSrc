import { useResonatorStore } from "@/stores/resonator";

const ActionIcons: any = {
  普攻: "/assets/actions/left_click.svg",
  // 普攻xN: "/assets/actions/left_click.svg",
  空中攻擊: "/assets/actions/left_click.svg",
  重擊: "/assets/actions/hold_left_click.svg",
  空中重擊: "/assets/actions/hold_left_click.svg",
  共鳴技能: "/assets/actions/e.svg",
  共鳴解放: "/assets/actions/r.svg",
  聲骸: "/assets/actions/q.svg",
  長按共鳴技能: "/assets/actions/hold_e.svg",
  長按共鳴解放: "/assets/actions/hold_r.svg",
  長按聲骸: "/assets/actions/hold_q.svg",
  延奏: "/assets/actions/num.svg",
  變奏: "",
  入場: "/assets/actions/num.svg",
  空中入場: "/assets/actions/num.svg",
  鉤索: "/assets/actions/t.svg",
  協同攻擊: "",
  閃避: "/assets/actions/shift.svg",
  跳: "/assets/actions/space.svg",
  無: "",
};

export enum RotationActionEnum {
  COORDINATED_ATTACK = "協同攻擊",
  SPECTRO_FRAZZLE = "光噪效應",
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

export interface IRotationRow {
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
    const resonatorStore = useResonatorStore();
    this.resonatorName = resonatorName;
    this.resonatorSrc = resonatorStore.getIconSrcByName(resonatorName);
  }
}

export function getRotation(rows: Array<IRotationRow | any>): Array<ResonatorRotation> {
  let currentRotation = new ResonatorRotation("");
  const rotation: Array<ResonatorRotation> = [];
  let c = 1;

  rows.forEach((row, i) => {
    const resonatorName = row.resonator_name;
    const actionName = row.action;

    if (
      !resonatorName ||
      !actionName ||
      actionName === RotationActionEnum.COORDINATED_ATTACK ||
      actionName === RotationActionEnum.SPECTRO_FRAZZLE
    ) {
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

  if (currentRotation.resonatorName && currentRotation.resonatorSrc) {
    rotation.push(currentRotation);
  }

  return rotation;
}

export function getActions(): Array<string> {
  return Object.keys(ActionIcons);
}
