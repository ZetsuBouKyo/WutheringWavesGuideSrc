import { StatBuffEnum } from "@/interfaces/buff";

export class Echo {
  public name: string = "";
  public [StatBuffEnum.HP_P]: string = "";

  constructor(echo: any = {}) {
    Object.assign(this, echo);
  }
}

export class RowEcho {
  public echo_name_1: string = "";
  public echo_name_2: string = "";
  public echo_name_3: string = "";
  public echo_name_4: string = "";
  public echo_name_5: string = "";

  constructor(distribution: any) {
    Object.assign(this, distribution);
  }
}
