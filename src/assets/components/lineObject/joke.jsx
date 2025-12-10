import { useEffect, useState } from "react";
import "../../../../styles/joke.scss";

export function JokeObject({ nextSubTitle, nextJoke, setEffectSounds, audienceSound }) {
  const [jokePartDone, setJokePartDone] = useState(false);
  const [laugh, setLaugh] = useState(false);


  useEffect(()=>{   
    nextSubTitle("satire_balloon1_1");
  }, [])
  // 🔊 효과음 초기화는 마운트될 때 한 번만
  useEffect(() => {
    if (setEffectSounds) {
      setEffectSounds("morphSarcasmA");
    }
  }, [setEffectSounds]);

  // (선 그리기 애니메이션이 끝나면 호출할 핸들러) - 기존 그대로
  function handleDrawEnd() {
    if (jokePartDone) return; // 중복 방지

    // setJokePartDone(true);
    
    // nextJoke?.();  // 필요하면 다시 살리기
  }

  // 👉 오브젝트 클릭 시 laugh 라인 애니메이션 시작
  const handleClick = () => {
    setLaugh(true);
    setEffectSounds?.("laugh"); // 효과음 쓰고 싶으면 키 맞춰서
    nextSubTitle("satire_balloon2_1")
    setEffectSounds("morphC");
    setTimeout(()=> {
        audienceSound("Small-laughA")
    }, 1000)
    
    console.log(laugh)
  };



  return (
    <div className={`jokeObjectBox ${jokePartDone ? "off" : "on"}`} onClick={()=>
        
    {
    handleClick();
    if(laugh){
        setJokePartDone(true)
        nextSubTitle("satire_balloon3_1")
        setEffectSounds("object_C");
        setTimeout(()=>{
            nextJoke("dark-game");
        }, 12000)
        
    }
}

        }>
      {/* 기존 joke SVG */}
      <svg
        className={`jokeSVG ${jokePartDone ? "off" : "on"}`}
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 609.26 1194.29"
      >
        <defs>
          <linearGradient
            id="_무제_그라디언트_446"
            data-name="무제 그라디언트 446"
            x1="0"
            y1="906.13"
            x2="609.26"
            y2="906.13"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#faf6fe" />
            <stop offset="1" stopColor="#ff0" />
          </linearGradient>
          <linearGradient
            id="_무제_그라디언트_446-2"
            data-name="무제 그라디언트 446"
            x1="160.53"
            y1="867.32"
            x2="367.97"
            y2="867.32"
            xlinkHref="#_무제_그라디언트_446"
          />
        </defs>

        <g
          id="joke"
          data-name="비꼬기"
          className="joke-line-group"
          onAnimationEnd={handleDrawEnd}
        >
          <g id="_비꼬기" data-name="비꼬기">
            <path
              pathLength="1"
              className="joke-line-main"
              d="M400.08,3.38S-111.92,561.03,29.79,775.92c141.71,214.89,518.17,105.34,494.86-21.68-16.57-90.29-57.53,19.67-245.71,14.86-178.86-4.57-306.38-4.26-245.71,59.43,411.1,431.59,400.55,1030.23,341.92,975.2"
            />
            <path
              pathLength="1"
              className="joke-line-sub"
              d="M167.05,880.83s-14.29-43.43,44.57-32c58.86,11.43,48,22.29,48,22.29,0,0,14.29-21.14,66.86-14.29s32.87,32.89,32.87,32.89"
            />
          </g>
        </g>
      </svg>

      {/* ✅ 새 laugh SVG : 클릭하면 선이 그려졌다가 뒤에서부터 지워짐 */}
      <svg
        className={`laugh ${laugh ? "on" : ""}`}
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 93.73 86.89"
      >
        <defs>
          <linearGradient
            id="_무제_그라디언트_213"
            data-name="무제 그라디언트 213"
            x1="46.8"
            y1="60.55"
            x2="89.77"
            y2="60.55"
            gradientTransform="translate(12.16 -11.42) rotate(10.49)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffea00" />
            <stop offset="1" stopColor="#aa94ae" />
          </linearGradient>
          <linearGradient
            id="_무제_그라디언트_213-2"
            data-name="무제 그라디언트 213"
            x1="14.06"
            y1="38.27"
            x2="57.03"
            y2="38.27"
            gradientTransform="translate(-13.1 19.26) rotate(-25.77)"
            xlinkHref="#_무제_그라디언트_213"
          />
          <linearGradient
            id="_무제_그라디언트_213-3"
            data-name="무제 그라디언트 213"
            x1="-8.72"
            y1="19.77"
            x2="34.25"
            y2="19.77"
            gradientTransform="translate(-15.65 23.06) rotate(-35.36)"
            xlinkHref="#_무제_그라디언트_213"
          />
        </defs>

        <g id="_맥주잔" data-name="맥주잔">
          <line
            pathLength="1"
            className="laugh-line laugh-line-1"
            x1="49.91"
            y1="79.82"
            x2="86.66"
            y2="41.29"
          />
          <line
            pathLength="1"
            className="laugh-line laugh-line-2"
            x1="32.11"
            y1="64.67"
            x2="38.97"
            y2="11.87"
          />
          <line
            pathLength="1"
            className="laugh-line laugh-line-3"
            x1="7.23"
            y1="58.39"
            x2="5.19"
            y2="5.19"
          />
        </g>
      </svg>
    </div>
  );
}
