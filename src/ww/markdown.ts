import i18n from "@/i18n";

export class Markdown {
  private docs: any = {};

  constructor() {
    const modules = import.meta.glob("@/docs/**/*.md", { as: "raw", eager: true });
    const paths: Array<string> = Object.keys(modules);
    paths.forEach((path: string) => {
      const newPath = path.replace("/src", "@");
      this.docs[newPath] = modules[path];
    });
  }

  public getDoc(p: string): string {
    const locale = i18n.global.locale.value;
    const path = `@/docs/${locale}/${p}`;
    const doc = this.docs[path];
    console.log(path, doc);
    return doc;
  }
}
