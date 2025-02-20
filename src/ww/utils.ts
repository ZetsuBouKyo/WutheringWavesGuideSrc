type JsonData = Record<string, any>;

export function getNestedValue<T>(obj: Record<string, any>, keyPath: string): T | undefined {
  return keyPath.split(".").reduce((acc, key) => acc && acc[key], obj) as T | undefined;
}

export function mapValueToValue(modules: any, key1: string, key2: string): any {
  return Object.fromEntries(
    Object.entries(modules).map(([_, module]) => [
      getNestedValue(module as { default: JsonData }, key1),
      getNestedValue(module as { default: JsonData }, key2),
    ]),
  );
}

export function toNumberString(number: number): string {
  const s = number.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return s;
}

export function toPercentageString(number: number): string {
  const s = number.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return s;
}

export function jumpToSection(goTo: any, id: string) {
  goTo(id, {
    duration: 400,
    easing: "easeInQuad",
    offset: -180,
  });
}

export function enumToArray(e: any): Array<string> {
  const arr: Array<string> = Object.keys(e)
    .filter((key) => isNaN(Number(key)))
    .map((key) => e[key as keyof typeof e]);
  return arr;
}
