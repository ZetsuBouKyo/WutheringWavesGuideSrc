import sonata_info from "@/assets/data/sonatas.json";

export class SonataInfo {
  public name: string = "";
  public piece_2: string = "";
  public piece_5: string = "";

  public getHtmlInfo(): string {
    let text = "";
    if (this.name) {
      text = `${text}【${this.name}】\n\n`;
    }
    if (this.piece_2) {
      text = `${text}2/2\n${this.piece_2}\n\n`;
    }
    if (this.piece_5) {
      text = `${text}5/5\n${this.piece_5}`;
    }
    text = text.replace(/\n/g, "<br />");
    return text;
  }
}

export function getSonataInfo(name: string): SonataInfo | undefined {
  const data = sonata_info[name as keyof typeof sonata_info];
  if (!data) {
    return;
  }

  const info = new SonataInfo();
  info.name = name;
  info.piece_2 = data["2"] ? data["2"] : "";
  info.piece_5 = data["5"] ? data["5"] : "";
  return info;
}
