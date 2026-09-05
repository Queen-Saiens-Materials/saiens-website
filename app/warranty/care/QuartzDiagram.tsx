/**
 * 兩張示意圖的向量重製（依原手工圖逐項對照）。
 *
 * SurfaceDiagram：人造石英石表面示意。
 *   - 白色大圓＝石英顆粒（90–93%），大小不一、緊密相靠。
 *   - 深灰色只填在顆粒之間的縫隙＝樹酯（7–10%），不是背景。
 *   - 表面高低不平，三種髒污卡在表面的凹處：金屬碳粉（黑點）、油污（淺褐）、色素（深褐）。
 *
 * PowderDiagram：去污原理。
 *   - 兩顆相靠的石英顆粒，中間 V 形縫隙。
 *   - 縫隙上方一團淺灰的清潔粉，內含極細的清潔粉顆粒（小點）與被包住的髒污顆粒（大黑點）。
 *   - 左側圖例：清潔粉顆粒（很多小點）／髒污顆粒（少數大點）。
 *
 * 文字用 SVG <text>，字型與顏色繼承 .wr token。
 */

const INK = "var(--text-primary)";
const RESIN = "#5a554f";
const LINE = "#6b655f";

export function SurfaceDiagram() {
  // 上排大顆粒相切排列；下排小顆粒相切排列，錯位半格。樹酯是兩排之間與顆粒之間露出的深灰。
  const topR = [58, 64, 52, 60, 56, 70, 54, 62, 50, 58];
  const botR = [40, 46, 42, 48, 40, 46, 44, 40, 46, 42, 40];
  const pack = (radii: number[], startX: number, cy: number) => {
    let x = startX;
    return radii.map((r, i) => {
      if (i > 0) x += radii[i - 1] + r - 2;
      return { cx: x, cy, r };
    });
  };
  const top = pack(topR, 68, 150);
  const bot = pack(botR, 108, 234);
  const resinX0 = top[0].cx;
  const resinX1 = top[top.length - 1].cx;
  const stainsAt = (i: number) => (top[i].cx + top[i + 1].cx) / 2; // 兩顆之間的凹處
  const xMetal = stainsAt(0);
  const xOil = stainsAt(3);
  const xPigment = stainsAt(6);
  return (
    <svg viewBox="0 0 1060 340" role="img" aria-label="人造石英石表面示意：石英顆粒緊密排列，樹酯填在縫隙，髒污卡在表面凹處" className="quartz-diagram">
      {/* 樹酯：填在顆粒之間；矩形會被相切的顆粒蓋住，只剩縫隙露出 */}
      <rect x={resinX0} y="118" width={resinX1 - resinX0} height="120" fill={RESIN} />
      {/* 三種髒污，卡在表面的凹處（畫在顆粒之下，讓顆粒邊緣壓住） */}
      <g fill={INK}>
        {[[-10, -4], [2, -12], [12, -2], [-2, 8], [10, 10], [-14, 8]].map(([dx, dy], i) => (
          <circle key={i} cx={xMetal + dx} cy={104 + dy} r="4.5" />
        ))}
      </g>
      <path d={`M${xOil - 34} 122 C ${xOil - 24} 92, ${xOil + 18} 88, ${xOil + 34} 120 C ${xOil + 14} 128, ${xOil - 14} 128, ${xOil - 34} 122 Z`} fill="#cdb48a" />
      <path d={`M${xPigment - 38} 122 C ${xPigment - 26} 88, ${xPigment + 22} 84, ${xPigment + 38} 120 C ${xPigment + 16} 130, ${xPigment - 16} 130, ${xPigment - 38} 122 Z`} fill="#8a7563" />
      {/* 石英顆粒 */}
      {[...top, ...bot].map((g, i) => (
        <circle key={i} cx={g.cx} cy={g.cy} r={g.r} fill="#ffffff" stroke={LINE} strokeWidth="2.5" />
      ))}
      {/* 標註：文字 + 向下指的短箭頭 */}
      {[
        { x: xMetal, label: "金屬｜刀、鐵鍋之刮傷" },
        { x: xOil, label: "油污" },
        { x: xPigment, label: "色素｜紅酒、醬油、咖啡" },
      ].map((a) => (
        <g key={a.label}>
          <text x={a.x} y="34" fill={INK} fontSize="22" fontWeight="500" textAnchor="middle">
            {a.label}
          </text>
          <line x1={a.x} y1="46" x2={a.x} y2="86" stroke={LINE} strokeWidth="1.5" />
          <polyline points={`${a.x - 6},78 ${a.x},88 ${a.x + 6},78`} fill="none" stroke={LINE} strokeWidth="1.5" />
        </g>
      ))}
      <text x="530" y="326" fill="var(--text-secondary)" fontSize="20" textAnchor="middle">
        90–93% 石英石顆粒、7–10% 樹酯
      </text>
    </svg>
  );
}

export function PowderDiagram() {
  return (
    <svg viewBox="0 0 1060 480" role="img" aria-label="去污原理：清潔粉的細顆粒深入石英顆粒之間，把較大的髒污顆粒帶走" className="quartz-diagram">
      <text x="640" y="56" fill={INK} fontSize="30" fontWeight="600" textAnchor="middle">
        Saiens 清潔粉帶走髒污
      </text>

      {/* 圖例：清潔粉顆粒 */}
      <circle cx="120" cy="130" r="62" fill="var(--bg-alt)" />
      <g fill={INK}>
        {[[-30,-20],[-12,-34],[8,-28],[26,-14],[-38,4],[-20,-4],[0,-8],[18,2],[36,8],[-28,20],[-8,16],[12,24],[30,26],[-14,34],[6,38],[-36,-32],[40,-30]].map(([dx,dy],i)=>(
          <circle key={i} cx={120+dx} cy={130+dy} r="3" />
        ))}
      </g>
      <text x="120" y="228" fill={INK} fontSize="22" fontWeight="500" textAnchor="middle">清潔粉顆粒</text>

      {/* 圖例：髒污顆粒 */}
      <circle cx="120" cy="330" r="62" fill="var(--bg-alt)" />
      <g fill={INK}>
        {[[-26,-18],[10,-30],[26,-6],[-6,0],[-30,18],[18,20],[-4,30]].map(([dx,dy],i)=>(
          <circle key={i} cx={120+dx} cy={330+dy} r="8" />
        ))}
      </g>
      <text x="120" y="428" fill={INK} fontSize="22" fontWeight="500" textAnchor="middle">髒污顆粒</text>

      {/* 清潔粉雲（落在兩顆粒之間的縫隙上方） */}
      <path
        d="M520 190 C 545 130, 620 120, 655 150 C 690 120, 760 125, 780 175 C 760 200, 730 210, 700 235 C 670 260, 640 265, 618 240 C 590 220, 555 215, 520 190 Z"
        fill="var(--bg-alt)"
      />
      {/* 兩顆石英顆粒 */}
      <circle cx="520" cy="330" r="130" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <circle cx="780" cy="330" r="130" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <text x="520" y="340" fill={INK} fontSize="30" fontWeight="500" textAnchor="middle">石英顆粒</text>
      <text x="780" y="340" fill={INK} fontSize="30" fontWeight="500" textAnchor="middle">石英顆粒</text>

      {/* 縫隙裡：被清潔粉包住的髒污顆粒（大點）與清潔粉顆粒（小點） */}
      <g fill={INK}>
        <circle cx="630" cy="220" r="14" />
        <circle cx="668" cy="206" r="15" />
        <circle cx="650" cy="250" r="13" />
        <circle cx="690" cy="238" r="12" />
        <circle cx="705" cy="212" r="10" />
        {[[560,170],[585,158],[612,150],[640,146],[672,150],[700,160],[730,172],[755,186],[600,190],[720,200],[608,232],[676,262],[640,278]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

export default SurfaceDiagram;
