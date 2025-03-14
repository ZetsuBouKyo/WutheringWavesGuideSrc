import Decimal from "decimal.js";
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

export function toNumberString(number: string | number | Decimal | undefined, digits: number = 2): string {
  if (number instanceof Decimal) {
    number = number.toNumber();
  }
  if (!number) {
    return "";
  }
  if (typeof number === "string") {
    number = getNumber(number);
  }
  const s = number.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return s;
}

export function toPercentageString(number: string | number | Decimal | undefined, digits: number = 2): string {
  if (typeof number === "string") {
    number = getNumber(number);
  }
  if (number instanceof Decimal) {
    number = number.toNumber();
  }
  if (number === undefined) {
    number = 0;
  }

  if (digits >= 0) {
    const s = number.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return s;
  } else {
    const d = new Decimal(number).times(new Decimal(100)).toString();
    return `${d}%`;
  }
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

export function saveJson(data: any, fname: string = "data") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 4) as BlobPart], { type: "application/json" }));
  a.download = `${fname}.json`;
  a.click();
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

export function getDecimal(n: any): Decimal {
  if (n instanceof Decimal) {
    return n;
  }
  return new Decimal(getNumber(n));
}
