import "../../../styles/Stage.scss";
import { QuadShape } from "./effects/spoLight";
import { useRef } from "react";           // ✅ 이거 추가

export default function BackGround({ nextStep, jokeStep }) {
  const stageRef = useRef(null);          // ✅ 무대 ref

  return (
    <div className="introInterFace">
      <div
        className="BgImagePlaceholder"
        ref={stageRef}                    // ✅ 무대에 ref 달기
        onClick={nextStep}
      >


        
<QuadShape
  stageRef={stageRef}
  imgType="A"
  aX={805}
  aY={750}   
  bX={920}
  bY={750}   
  cX={950}
  cY={850}   
  dX={830}
  dY={870}   
  color="rgba(0, 0, 0, 0.4)"
  jokeStep={jokeStep}
  designWidth={1920}
  designHeight={1080}
/>


<QuadShape
  stageRef={stageRef}
  imgType="B"
  aX={1000}
  aY={750}    
  bX={1093}
  bY={750}    
  cX={1142}
  cY={850}    
  dX={1035}
  dY={850}    
  color="rgba(0, 0, 0, 0.4)"
  jokeStep={jokeStep}
  designWidth={1920}
  designHeight={1080}
/>


        <img className={`stageImg ${(jokeStep==="intro" || jokeStep==="start"|| jokeStep==="end-truth" || jokeStep==="ending") ? "":"up" }`} alt="무대 일러스트" src="/images/Stage.png" />
      </div>
    </div>
  );
}
