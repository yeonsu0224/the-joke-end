import { useEffect, useState } from "react";
import "../../../styles/Balloon.scss";

export function Balloon({ nextBallon, name, soundsEffects }) {
  const [onState, setOnState] = useState(true);


  useEffect(()=> {
      switch(name){
    case "ask":
      return soundsEffects("morphA");
    case "beer":
      return soundsEffects("morphB");
    case "mouse":
      return soundsEffects("morphC");
  }  
  }, [])


  return (
    <div onClick={()=> {setOnState(false); nextBallon()} } className={`Balloon ${name} ${onState ? "on" : "off"}`}>
      {name === "ask" && (


       




<svg id="askSvg" data-name="레이어 2" xmlns="http://www.w3.org/2000/svg" viewBox="-35 0 225 143">

  <g id="_레이어_3" data-name="레이어 3">
    <path className="cls-1" d="M42.2,122.88l-38.1,15.24,5.33-36.57S-29.41,1.27,83.73,3.02s103.87,121.38-6.86,114.61"/>
    <path className="cls-1" d="M62.56,54.75s.31-24.91,16.25-22.9c15.94,2.01,15.47,20.73,15.47,20.73,0,0-14.23,6.34-14.54,26.61"/>
    <path className="cls-1" d="M79.58,86.77s2.44,11.04,2.44,13.17"/>
  </g>
</svg>
      )}

      {name === "beer" && (
        <svg
          id="beerSvg"
          data-name="레이어 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-50 -50 300 350"
        >
  <g id="_레이어_3" data-name="레이어 3">
    <polyline className="cls-1" points="7.57 80.65 151.57 82.93 15.19 24.26 24.63 3.96 173.67 71.5 163 87.88 163 182.49 3 182.49 3 87.88"/>
    <line className="cls-1" x1="22.49" y1="82.49" x2="49.8" y2="110.68"/>
    <line className="cls-1" x1="61.35" y1="83.44" x2="86.11" y2="110.68"/>
    <line className="cls-1" x1="104.97" y1="84.39" x2="123.63" y2="110.68"/>
    <line className="cls-1" x1="161.35" y1="110.68" x2="5.16" y2="110.68"/>
    <line className="cls-1" x1="36.15" y1="33.28" x2="36.15" y2="10.3"/>
    <line className="cls-1" x1="68.02" y1="24.2" x2="71.99" y2="48.7"/>
    <line className="cls-1" x1="112.17" y1="43.63" x2="116.56" y2="67.87"/>
  </g>
        </svg>
      )}

      {name === "mouse" && (
        <svg
          id="mouseSvg"
          data-name="레이어 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 260.26 141.74"
        >
  <g id="_레이어_3" data-name="레이어 3">
    <polyline className="cls-1" points="39.86 7.66 94.35 25.23 114.9 5.99 119.67 33.57 174.76 52.03 174.76 88.66 151.53 93.72 174.76 101.47 197.99 94.32 180.12 90.15"/>
    <polyline className="cls-1" points="39.86 9.15 39.86 46.37 10.37 57.69 39.86 64.24 67.25 57.09 45.81 48.93"/>
    <line className="cls-1" x1="105.67" y1="32.38" x2="104.18" y2="137.2"/>
  </g>
        </svg>
      )}
    </div>
  );
}
