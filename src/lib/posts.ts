/**
 * 纸上生活 · 工具函数
 * 排序、按年分组、罗马数字、日期格式化
 */

type WithDate = { data: { date: Date } };
type WithCategory = { data: { category: string } };

const ROMAN = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
  "xiii",
  "xiv",
  "xv",
  "xvi",
  "xvii",
  "xviii",
  "xix",
  "xx",
];

/** 1-based 小写罗马数字，带尾点。i. ii. iii. … */
export function toRoman(n: number): string {
  return (ROMAN[n - 1] ?? String(n)) + ".";
}

export function sortByDateDesc<T extends WithDate>(arr: T[]): T[] {
  return [...arr].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/** 2026 · 06 · 12 */
export function fmtFull(d: Date): string {
  return `${d.getFullYear()} · ${pad2(d.getMonth() + 1)} · ${pad2(d.getDate())}`;
}

/** 06 · 12 */
export function fmtMonthDay(d: Date): string {
  return `${pad2(d.getMonth() + 1)} · ${pad2(d.getDate())}`;
}

/** 按年份倒序分组 */
export function groupByYear<T extends WithDate>(arr: T[]): [number, T[]][] {
  const map = new Map<number, T[]>();
  for (const item of arr) {
    const y = item.data.date.getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(item);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

/** 各分类计数 */
export function countByCat<T extends WithCategory>(
  arr: T[],
): Record<string, number> {
  return arr.reduce<Record<string, number>>((m, p) => {
    m[p.data.category] = (m[p.data.category] || 0) + 1;
    return m;
  }, {});
}

/** 中文数字 "六篇" "十二篇" 等 */
const CN_NUM = [
  "零",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
];
export function cnPieceCount(n: number): string {
  if (n <= 10) return `${CN_NUM[n]}篇`;
  if (n < 20) return `十${CN_NUM[n - 10]}篇`;
  return `${n} 篇`;
}

/**
 * 给内部路径拼接 base 前缀，自动避免双斜杠。
 * `withBase('/about/')` → `/on-paper/about/`（当 base = /on-paper/）
 * `withBase('about/')`  → `/on-paper/about/`
 * `withBase('/')`       → `/on-paper/`
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // 形如 "/on-paper/" 或 "/"
  const baseTrim = base.endsWith("/") ? base.slice(0, -1) : base;
  const tail = path.startsWith("/") ? path : `/${path}`;
  return `${baseTrim}${tail}`;
}
