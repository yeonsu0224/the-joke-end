import { useEffect, useState } from "react";
import "../../../../styles/game.scss";

export function GameObject({ nextSubTitle, nextJoke, setEffectSounds, audienceSound }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [gamePartDone, setGamePartDone] = useState(false);

  const handleClick = () => {
    if (isDrawing) return; // 한 번만 그려지게 하고 싶으면 유지

    setIsDrawing(true);
    setEffectSounds?.("gameing"); // 효과음 쓰고 싶으면
    nextSubTitle('game_escape_1')
  };
  useEffect(()=> {
    nextSubTitle("game_intro_1")
    
    setEffectSounds?.("morphGame");
    setTimeout(()=> {
        audienceSound("Small-laughA")
    }, 3000)
    
  }, [])
  

  return (
    <div
      className={`gameObjectBox ${isDrawing ? "is-drawing" : ""} ${gamePartDone ? "off" : ""}`}
      onClick={()=> {
        handleClick();

        if(isDrawing){
            setGamePartDone(true)
            nextSubTitle("game_world_1")
            setEffectSounds("object_A")
            setTimeout(()=> {
                nextJoke("end-truth")
                nextSubTitle("end_truth_1")
            
            }, 12000)

            
            
        }
    
    }}
    >
      {/* 메인 라인 */}
      <svg
      className="mouse"
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 202.92 935.39"
      >
        <defs>
          <style>{`
            .game-main-1 {
              fill: none;
              stroke: url(#_무제_그라디언트_372);
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 7px;
            }
          `}</style>
          <linearGradient
            id="_무제_그라디언트_372"
            data-name="무제 그라디언트 372"
            x1="0"
            y1="467.69"
            x2="202.92"
            y2="467.69"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#7400df" />
          </linearGradient>
        </defs>
        <g data-name="게이밍">
          <path
            className="game-main-1 draw-line"
            pathLength="1"
            d="M33.08,4.39s-61.71,196.57-6.86,390.86c54.86,194.29,104,187.43,99.43,293.71-26.48,4.38-82.48,69.9-68.76,164.38,13.71,94.48,84.19,77.33,84.19,77.33,0,0,51.05-2.29,57.52-79.24,6.48-76.95-26.43-172.19-60.07-157.33-33.64,14.86-15.36,123.05-15.36,124.19s71.24-3.05,71.24-3.05"
          />
        </g>
      </svg>

      {/* keyCap-A */}
      <svg
        id="keyCap-A"
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 181.21 172.56"
      >
        <defs>
          <style>{`
            .game-keyA-1 {
              fill: none;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 10px;
              stroke: url(#_무제_그라디언트_372);
            }
            .game-keyA-2 {
              fill: none;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 10px;
              stroke: url(#_무제_그라디언트_372-2);
            }
          `}</style>
          <linearGradient
            id="_무제_그라디언트_372"
            data-name="무제 그라디언트 372"
            x1="52.19"
            y1="83.61"
            x2="233.12"
            y2="83.61"
            gradientTransform="translate(18.93 -62) rotate(35.85)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#7400df" />
          </linearGradient>
          <linearGradient
            id="_무제_그라디언트_372-2"
            data-name="무제 그라디언트 372"
            x1="64.14"
            y1="29.95"
            x2="141.48"
            y2="85.84"
            gradientTransform="matrix(1,0,0,1,0,0)"
            xlinkHref="#_무제_그라디언트_372"
          />
        </defs>
        <g data-name="게이밍">
          <path
            className="game-keyA-1 draw-line"
            pathLength="1"
            d="M32.69,40.69s35.69,57.28,57.12,66.65,76.92-32.31,84.45-24.51c7.53,7.79-9.09,41.84-9.09,41.84l-103.64,41.67L5.4,74.55s8.45-30.56,16.09-42.43S101.63,5.44,101.63,5.44l56.88,57.55"
          />
          <path
            className="game-keyA-2 draw-line"
            pathLength="1"
            d="M96.51,29.73c-4.76-.19-44.38-2.48-28.57,20.57,15.81,23.05,37.52,36.76,43.24,34.48,5.71-2.29,22.48-11.62,11.62-32.19-10.86-20.57-20.32-1.71-20.32-1.71l42.6,20"
          />
        </g>
      </svg>

      {/* keyCap-B */}
      <svg
        id="keyCap-B"
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 180.93 165.53"
      >
        <defs>
          <style>{`
            .game-keyB-1 {
              fill: none;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 10px;
              stroke: url(#_무제_그라디언트_372);
            }
            .game-keyB-2 {
              fill: none;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 10px;
              stroke: url(#_무제_그라디언트_372-2);
            }
          `}</style>
          <linearGradient
            id="_무제_그라디언트_372"
            data-name="무제 그라디언트 372"
            x1="0"
            y1="82.76"
            x2="180.93"
            y2="82.76"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#7400df" />
          </linearGradient>
          <linearGradient
            id="_무제_그라디언트_372-2"
            data-name="무제 그라디언트 372"
            x1="57.47"
            y1="49.53"
            x2="120.33"
            y2="49.53"
            xlinkHref="#_무제_그라디언트_372"
          />
        </defs>
        <g data-name="게이밍">
          <path
            className="game-keyB-1 draw-line"
            pathLength="1"
            d="M19.1,74.33s62.48,25.52,85.33,20.57c22.86-4.95,43.43-71.24,54.1-69.33,10.67,1.9,17.14,39.24,17.14,39.24l-59.6,94.48L16.82,117.76s-11.05-29.71-11.81-43.81S54.34,5.38,54.34,5.38l79.81,13.33"
          />
          <polyline
            className="game-keyB-2 draw-line"
            pathLength="1"
            points="62.47 29.82 62.47 60.04 89.39 42.27 89.39 62.08 113.26 37.95"
          />
        </g>
      </svg>

      {/* keyCap-C */}
      <svg
        id="keyCap-C"
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 120.39 110.22"
      >
        <defs>
          <style>{`
            .game-keyC-1 {
              fill: none;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 7px;
              stroke: url(#_무제_그라디언트_372);
            }
            .game-keyC-2 {
              fill: none;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 7px;
              stroke: url(#_무제_그라디언트_372-2);
            }
          `}</style>
          <linearGradient
            id="_무제_그라디언트_372"
            data-name="무제 그라디언트 372"
            x1="57.65"
            y1="55.11"
            x2="178.03"
            y2="55.11"
            gradientTransform="translate(178.03) rotate(-180) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#7400df" />
          </linearGradient>
          <linearGradient
            id="_무제_그라디언트_372-2"
            data-name="무제 그라디언트 372"
            x1="47.48"
            y1="32.73"
            x2="88"
            y2="32.73"
            gradientTransform="matrix(1,0,0,1,0,0)"
            xlinkHref="#_무제_그라디언트_372"
          />
        </defs>
        <g data-name="게이밍">
          <path
            className="game-keyC-1 draw-line"
            pathLength="1"
            d="M107.53,49.5s-41.44,16.93-56.6,13.64S22.12,15.89,15.05,17.16c-7.08,1.26-11.37,26.03-11.37,26.03l39.53,62.66,65.84-27.54s7.33-19.71,7.83-29.06S84.16,3.76,84.16,3.76L31.22,12.61"
          />
          <path
            className="game-keyC-2 draw-line"
            pathLength="1"
            d="M72.21,16.16s-26.03,5.59-20.44,13.59,23.62-5.33,27.43-1.14,15.87,11.94-17.14,20.57"
          />
        </g>
      </svg>
    </div>
  );
}
