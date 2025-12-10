import { useEffect, useState } from "react";
import "../../../../styles/beer.scss";

export function BeerObject({nextSubTitle, nextJoke, setEffectSounds, audienceSound}) {
    const [cheers, setCheers] = useState(false)
    const [cheersing, setCheersing] = useState(false)
    const [beerPartDone, setBeerPartDone] = useState(false)


    useEffect(()=> {
        setCheersing(true)
        

        setTimeout(()=>{
            setCheersing(false)
        }, 3000)
    }, [cheers])

    useEffect(()=>{
    setEffectSounds("morphBeer")
    },[])




  return (
    <div className="beer" onClick={()=>
    
    {
        
        if(!cheers){
        setCheers(true)
        nextSubTitle("beer_intro_3")
        
        setTimeout(()=> {
setEffectSounds("cheers")
        }, 2400)
}
        if(cheers && !cheersing){
            setBeerPartDone(true)
            nextSubTitle("beer_truth_2")
            setEffectSounds("object_A")
            setTimeout(()=> {
              nextJoke("dark-joke")
            }, 4000)
            

        }

    }
    }>
      <svg
        
        className={`main-glass ${cheers ? "cheers": ""} ${beerPartDone ? "done" : ""}`}
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 216.27 700.58"
      >
        <defs>
          <linearGradient
            id="_무제_그라디언트_213"
            data-name="무제 그라디언트 213"
            x1="0"
            y1="350.29"
            x2="216.27"
            y2="350.29"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#ffea00" />
            <stop offset="1" stop-color="#aa94ae" />
          </linearGradient>
        </defs>
        <g id="_맥주잔" data-name="맥주잔">
          <path
            d="M71.92,390.81c120.25-1.65,72.49,15.75,72.49,15.75-10.83,5.03-28.13,10.25-53.28,10.25-53.08,0-73.83-19.43-73.83-19.43,0,0,14.98-20.83,15.24-95.49S12.48,168.05,6.64,111.92C.79,55.79,12.48,7.03,12.48,7.03c0,0,35.22,15.81,72.68,15.81s78.6-15.81,78.6-15.81c0,0,11.68,48.76,5.84,104.89-5.84,56.13-26.16,115.3-25.9,189.97.14,41.75,4.89,66.67,9.05,80.52,0,0,36.22,149.66,39.08,160.52s20,117.71,19.43,152.57"
            fill="none"
            stroke="url(#_무제_그라디언트_213)"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="10"
            pathLength={1}
          />
        </g>
      </svg>

      <svg
        className={`beer ${cheers ? "cheers": ""} ${beerPartDone ? "done" : ""}`}
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 145.52 1045.44"
      >
        <defs>
          <linearGradient
            id="_무제_그라디언트_169"
            data-name="무제 그라디언트 169"
            x1="0"
            y1="522.72"
            x2="145.52"
            y2="522.72"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#fff" />
            <stop offset="1" stop-color="#ffea00" />
          </linearGradient>
        </defs>
        <g id="_맥주잔" data-name="맥주잔">
          <path
            d="M119.79,5.45C196.37,812.31,34.65,709.58,54.08,803.29s83.43,238.29,33.71,237.14c-49.71-1.14-66.86-.57-64.57-10.29s12-4.57,36-34.86,56.57-17.85,50.29-85.5-93.71,50.64-81.71,75.21,35.43,49.14,50.86,38.29c15.43-10.86-9.71-60-21.71-88s-50.29-68.57-51.43-109.71,0-49.71,0-49.71"
            fill="none"
            stroke="url(#_무제_그라디언트_169)"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="10"
            pathLength={1}
          />
        </g>
      </svg>

        {   cheers && 
              <svg
        className={`sub-glass`}
        data-name="레이어 2"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 216.27 700.58"
      >
        <defs>
          <linearGradient
            id="_무제_그라디언트_213"
            data-name="무제 그라디언트 213"
            x1="0"
            y1="350.29"
            x2="216.27"
            y2="350.29"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#ffea00" />
            <stop offset="1" stop-color="#aa94ae" />
          </linearGradient>
        </defs>
        <g id="_맥주잔" data-name="맥주잔">
          <path
            d="M71.92,390.81c120.25-1.65,72.49,15.75,72.49,15.75-10.83,5.03-28.13,10.25-53.28,10.25-53.08,0-73.83-19.43-73.83-19.43,0,0,14.98-20.83,15.24-95.49S12.48,168.05,6.64,111.92C.79,55.79,12.48,7.03,12.48,7.03c0,0,35.22,15.81,72.68,15.81s78.6-15.81,78.6-15.81c0,0,11.68,48.76,5.84,104.89-5.84,56.13-26.16,115.3-25.9,189.97.14,41.75,4.89,66.67,9.05,80.52,0,0,36.22,149.66,39.08,160.52s20,117.71,19.43,152.57"
            fill="none"
            stroke="url(#_무제_그라디언트_213)"
            stroke-linecap="square"
            stroke-miterlimit="10"
            stroke-width="10"
            pathLength={1}
          />
        </g>
      </svg>



        }

    </div>
  );
}
