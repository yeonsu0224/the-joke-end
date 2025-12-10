import { useMemo } from "react";
import "../../../../styles/AuroraBackground.scss";




export default function AuroraBackground({
  baseColor = "#4f7dff",
  count = 10,      // 빛줄기 개수
  opacity = 1,
  zIndex = 0,
}) {
  const columns = useMemo(
    () =>
      Array.from({ length: count }).map(() => {
        const left = 20 + Math.random() * 60;      // 20~80%
        const width = 0.05 + Math.random() * 0.1;  // 0.05% ~ 0.15%
        const scaleY = 0.9 + Math.random() * 0.4;  // 0.9 ~ 1.3
        const delay = Math.random() * 10;

        return { left, width, scaleY, delay };
      }),
    [count]
  );

  // 🎯 baseColor가 바뀔 때마다 blob 위치/스케일/딜레이를 새로 뽑기
  const blobConfig = useMemo(() => {
    const left = 30 + Math.random() * 40;   // 30~70% 사이
    const top = 35 + Math.random() * 30;    // 35~65% 사이
    const scale = 0.8 + Math.random() * 0.7; // 0.8~1.5
    const delay = Math.random() * 8;        // 0~8s

    return { left, top, scale, delay };
  }, [baseColor]);

  return (
    <div
      className="aurora-bg"
      style={{
        // 빛줄기/블롭 공통 베이스 색
        "--aurora-base": baseColor,
        "--aurora-opacity": opacity,

        // light-blob용 위치/스케일/딜레이
        "--blob-left": `${blobConfig.left}%`,
        "--blob-top": `${blobConfig.top}%`,
        "--blob-scale": blobConfig.scale,
        "--blob-delay": `${blobConfig.delay}s`,

        zIndex,
      } }
    >
      {/* ✅ React에서는 class 말고 className */}
      <div className="light-blob" />

      {columns.map((col, i) => (
        <div
          key={i}
          className="aurora-column"
          style={{
            "--xpos": `${col.left}%`,
            "--width": `${col.width}%`,
            "--delay": `${col.delay}s`,
            "--scaleY": col.scaleY,
          } }
        />
      ))}
    </div>
  );
}
