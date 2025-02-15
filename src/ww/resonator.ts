export class Resonator {
  name: string
  constructor(name: string) {
    this.name = name
  }

  public getElementEn(): string {
    return ""
  }

  public getElementSrc(): string {
    const element = this.getElementEn()
    return new URL(`../assets/elements/${element}.png`, import.meta.url).href
  }
}