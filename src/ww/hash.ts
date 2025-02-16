export async function sha256(source: any, n: number = 8) {
  const sourceBytes = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest("SHA-256", sourceBytes);
  const resultBytes = [...new Uint8Array(digest)];
  const s = resultBytes.map((x) => x.toString(16).padStart(2, "0")).join("");
  return s.slice(0, n);
}
