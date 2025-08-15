import sonata_info from "@/assets/data/sonatas.json";

export class SonataInfo {
  public id: number | "" = "";
  public name: string = "";
  public icon: string = "";
  public color: string = "";
  public set: { [key: string]: { desc: string; description: string; param: Array<string> } } = {};

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): SonataInfo {
    return new SonataInfo(JSON.parse(JSON.stringify(this)));
  }

  public getHtmlInfo(): string {
    let text = "";
    if (this.name) {
      text = `${text}【${this.name}】\n\n`;
    }
    for (const key of Object.keys(this.set)) {
      text = `${text}${key}/${key}\n${this.set[key].description}\n\n`;
    }
    text = text.replace(/\n/g, "<br />");
    return text;
  }
}

const name2info: { [name: string]: SonataInfo } = {};
for (const _info of sonata_info) {
  name2info[_info.name] = new SonataInfo(_info);
}

export function getSonataInfoByName(name: string): SonataInfo | undefined {
  return name2info[name];
}

export function getSonataNames(): Array<string> {
  return Object.keys(name2info);
}

export function getSonataInfos(): Array<SonataInfo> {
  return Object.values(name2info);
}
