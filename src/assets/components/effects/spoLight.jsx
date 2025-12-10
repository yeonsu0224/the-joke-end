"use client";
import { useEffect, useRef } from "react";

export function SpotLight({
  radius = 310,
  darkness = 0.6,
  hardness = 0.9,
  color = { r: 255, g: 0, b: 0 },
  intensity = 0.1,
  ease = 0.08,
  jokeStep,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // 현재 조명 위치
  const lightPosRef = useRef({ x: 0, y: 0 });
  // 마우스(목표) 위치
  const targetPosRef = useRef({ x: 0, y: 0 });
  // 애니메이션 프레임 id
  const rafRef = useRef(null);

  // 1. 캔버스 세팅
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 처음엔 화면 중앙에서 시작하도록
      lightPosRef.current.x = window.innerWidth / 2;
      lightPosRef.current.y = window.innerHeight / 2;
      targetPosRef.current.x = window.innerWidth / 2;
      targetPosRef.current.y = window.innerHeight / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 2. 마우스 + 애니메이션 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const edge = Math.max(0, Math.min(1, hardness));

    const handleMove = (e) => {
      targetPosRef.current.x = e.clientX;
      targetPosRef.current.y = e.clientY;
    };

    if (jokeStep === "intro" || jokeStep === "ending") {
      window.addEventListener("mousemove", handleMove);
    } else {
      targetPosRef.current.x = window.innerWidth / 2;
      targetPosRef.current.y = window.innerHeight / 2;
    }

    // 애니메이션 루프
    const draw = () => {
      const { x: tx, y: ty } = targetPosRef.current;
      const pos = lightPosRef.current;

      // lerp로 천천히 따라가기
      const dx = tx - pos.x;
      const dy = ty - pos.y;

      pos.x += dx * ease;
      pos.y += dy * ease;

      const x = pos.x;
      const y = pos.y;
      const w = canvas.width;
      const h = canvas.height;

      // 0) 초기화
      ctx.clearRect(0, 0, w, h);

      // 1) 전체 어둡게 덮기
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
      ctx.fillRect(0, 0, w, h);

      // 2) 구멍 뚫어서 빛 비추기
      ctx.globalCompositeOperation = "destination-out";

      const hole = ctx.createRadialGradient(x, y, 0, x, y, radius);
      hole.addColorStop(0.0, "rgba(255, 255, 255, 1)");
      hole.addColorStop(edge, "rgba(255, 255, 255, 1)");
      hole.addColorStop(1.0, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = hole;
      ctx.fillRect(0, 0, w, h);

      // 3) 컬러 라이트 덧입히기
      ctx.globalCompositeOperation = "overlay";

      const red = ctx.createRadialGradient(x, y, 0, x, y, radius);
      red.addColorStop(
        0.9,
        `rgba(${color.r}, ${color.g}, ${color.b}, ${intensity})`
      );
      red.addColorStop(
        1.0,
        `rgba(${color.r}, ${color.g}, ${color.b}, 0)`
      );

      ctx.fillStyle = red;
      ctx.fillRect(0, 0, w, h);

      // 4) 다음 프레임 예약
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };

    // 루프 시작
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [darkness, radius, hardness, color, intensity, ease, jokeStep]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}


export function QuadShape({
  stageRef, // ✅ 부모(무대)의 ref
  imgType,
  aX, aY,
  bX, bY,
  cX, cY,
  dX, dY,
  color = "rgba(0, 0, 0, 0.5)",
  ease = 0.12,
  influence = 0.15,
  jokeStep,
  designWidth,  // ✅ 원본 디자인 가로
  designHeight, // ✅ 원본 디자인 세로
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const micImgRef = useRef(null);
  const micMainRef = useRef(null);
  

  // ✅ 스케일링된, 현재 화면 크기에 맞는 좌표를 저장할 ref
  const scaledPointsRef = useRef([
    { x: aX, y: aY }, { x: bX, y: bY },
    { x: cX, y: cY }, { x: dX, y: dY },
  ]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  // 1) 캔버스 세팅 및 리사이즈 로직
  useEffect(() => {
    const canvas = canvasRef.current;
    const stageEl = stageRef.current; // 무대 엘리먼트
    if (!canvas || !stageEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const handleResize = () => {
      // 캔버스 크기는 전체 화면
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 무대의 현재 크기와 위치 가져오기
      const stageRect = stageEl.getBoundingClientRect();

      // ✅ 비율 계산
      const scaleX = stageRect.width / designWidth;
      const scaleY = stageRect.height / designHeight;

      // ✅ 원본 좌표를 현재 무대 크기에 맞게 스케일링
      scaledPointsRef.current = [
        { x: stageRect.left + aX * scaleX, y: stageRect.top + aY * scaleY },
        { x: stageRect.left + bX * scaleX, y: stageRect.top + bY * scaleY },
        { x: stageRect.left + cX * scaleX, y: stageRect.top + cY * scaleY },
        { x: stageRect.left + dX * scaleX, y: stageRect.top + dY * scaleY },
      ];

      // 마우스 위치 초기화
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      smoothRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };

    handleResize(); // 처음 한 번 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [stageRef, designWidth, designHeight, aX, aY, bX, bY, cX, cY, dX, dY]);


  // 2) 마우스 이벤트
  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    if (jokeStep === "intro" || jokeStep === "ending") {
      window.addEventListener("mousemove", handleMove, { passive: true });
    } else {
        mouseRef.current.x = window.innerWidth / 2;
        mouseRef.current.y = window.innerHeight / 2;
    }

    return () => window.removeEventListener("mousemove", handleMove);
  }, [jokeStep]);


  // 3) 애니메이션 루프
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    let rafId;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * ease;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * ease;
      const { x: mx, y: my } = smoothRef.current;

      // ✅ 스케일링된 좌표 사용
      const [A0, B0, C0, D0] = scaledPointsRef.current;

      const shadowBaseCenterX = (C0.x + D0.x) / 2;
      const shadowBaseCenterY = (C0.y + D0.y) / 2;

      const dirX = shadowBaseCenterX - mx;
      const dirY = shadowBaseCenterY - my;

      const offsetX = dirX * influence;
      const offsetY = dirY * influence;

      const A = { x: A0.x + offsetX, y: A0.y + offsetY };
      const B = { x: B0.x + offsetX, y: B0.y + offsetY };
      const C = { x: C0.x, y: C0.y };
      const D = { x: D0.x, y: D0.y };

      const micX = A.x;
      const micY = A.y;

      const micEl = micImgRef.current;
      if (micEl) {
        micEl.style.left = `${micX}px`;
        micEl.style.top = `${micY}px`;
      }

      if (micMainRef.current) {
        micMainRef.current.style.left = `${C.x}px`;
        micMainRef.current.style.top = `${C.y}px`;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.lineTo(D.x, D.y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [color, ease, influence]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 5,
          cursor:`${jokeStep==="start" ? "" : "pointer"}`
        }}
      />

      {imgType === "A" && 
      <>
      <img
        ref={micImgRef}
        className="MicImg"
        alt="마이크그림자"
        src="images/micShadowA.png"
        style={{
          position: "fixed",
          left: "0px",
          top: "0px",
          transform: "translate(-25%, -100%)",
          zIndex: 6,
          opacity: 0.4,
          pointerEvents: "none",
        }}

        
      />
    <img
        ref={micMainRef}
        className="MicImg A"
        alt="마이크"
        src="images/micA.png"
          style={{
    position: "fixed",
    transform: "translate(-95%, -70%)",
    zIndex :8,
    cursor:`${jokeStep==="start" ? "" : "pointer"}`
  }}


      />
      
      </>}
      {imgType === "B" && 
      
      <>
      <img
        ref={micImgRef}
        className="MicImg"
        alt="마이크그림자"
        src="images/micShadowB.png"
        style={{
          position: "fixed",
          left: "0px",
          top: "0px",
          transform: "translate(-25%, -100%)",
          zIndex: 6,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      
      
          <img
          ref={micMainRef}
        className="MicImg B"
        alt="마이크"
        src="images/micB.png"
                 style={{
            position: "fixed",
            transform: "translate(-90%, -95%)",
            zIndex :8
  }}
      />
      
      </>}
    </>
  );
}