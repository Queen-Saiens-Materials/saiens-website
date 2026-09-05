/**
 * 人造石英石表面示意圖（原手工 PNG 的向量重製）。
 * 大圓 = 石英顆粒（90–93%），圓與圓之間的縫隙 = 樹酯（7–10%）。
 * 髒污只卡在縫隙表層，不會滲入石材；清潔粉顆粒比縫隙更細，能帶走髒污。
 * 純 SVG，配色沿用 .wr token（graphite / 淺灰），文字用 HTML 疊在外面。
 */
export default function QuartzDiagram() {
  const grains = [
    { cx: 60, cy: 92, r: 42 },
    { cx: 150, cy: 70, r: 50 },
    { cx: 245, cy: 96, r: 44 },
    { cx: 335, cy: 66, r: 52 },
    { cx: 428, cy: 92, r: 46 },
    { cx: 515, cy: 68, r: 40 },
    { cx: 105, cy: 165, r: 30 },
    { cx: 200, cy: 170, r: 36 },
    { cx: 292, cy: 168, r: 30 },
    { cx: 385, cy: 172, r: 38 },
    { cx: 478, cy: 166, r: 32 },
    { cx: 560, cy: 150, r: 26 },
  ];
  return (
    <svg
      viewBox="0 0 600 220"
      role="img"
      aria-label="石英顆粒之間的縫隙是樹酯，髒污卡在縫隙表層而非滲入石材"
      className="quartz-diagram"
    >
      {/* 樹酯基底 */}
      <rect x="0" y="0" width="600" height="220" rx="16" fill="var(--bg-alt)" />
      {/* 石英顆粒 */}
      {grains.map((g, i) => (
        <circle key={i} cx={g.cx} cy={g.cy} r={g.r} fill="#ffffff" stroke="var(--line)" strokeWidth="1.5" />
      ))}
      {/* 卡在縫隙表層的髒污：金屬碳粉 / 油污 / 色素 */}
      <g fill="var(--text-primary)">
        <circle cx="104" cy="52" r="3" />
        <circle cx="112" cy="58" r="2.5" />
        <circle cx="98" cy="60" r="2" />
      </g>
      <path d="M288 54 q10 -14 22 0 q-11 4 -22 0z" fill="#b8a98a" opacity="0.9" />
      <path d="M470 52 q12 -14 26 0 q-13 5 -26 0z" fill="#6b5a4a" opacity="0.9" />
      {/* 表面線：髒污只在表層 */}
      <path
        d="M20 48 C 90 22, 120 22, 150 20 S 260 40, 335 14 S 430 44, 515 28"
        fill="none"
        stroke="var(--text-tertiary)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
    </svg>
  );
}
