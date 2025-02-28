import domtoimage from "dom-to-image-more";
import MD5 from "crypto-js/md5";

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
  if (!number) {
    return "";
  }
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

export function getKeyByValue(object: any, value: any): any {
  return Object.keys(object).find((key) => object[key] === value);
}

export function md5(obj: any, n: number = 8): string {
  const s = MD5(obj).toString();
  return s.slice(0, n);
}

export function removeEmptyStrings(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(removeEmptyStrings);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => [key, removeEmptyStrings(value)])
        .filter(([_, value]) => value !== ""),
    );
  }
  return obj;
}

export async function saveDomToImage(ref: any, fname: string) {
  const dom = ref.value;
  if (!dom) return;

  try {
    const dataUrl = await domtoimage.toPng(dom);

    // Create a download link
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fname}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error capturing image:", error);
  }
}

export function getNumber(a: any): number {
  let n: number = 0;
  if (!a) {
    return n;
  }
  switch (typeof a) {
    case "string":
      a = a.replace(/,/g, "");
      if (a.includes("%")) {
        n = parseFloat(a) / 100;
      } else {
        n = Number(a);
        if (!n) {
          n = parseFloat(a);
          if (!n) {
            return 0;
          }
        }
      }
      break;
    case "number":
    default:
      n = Number(a);
      if (!n) {
        n = 0;
      }
      break;
  }
  n = Number(n.toFixed(6).toString());
  return n;
}
