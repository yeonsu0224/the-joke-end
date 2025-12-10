import { useState, useEffect, useRef, useMemo } from "react";
import BackGround from "./assets/components/backGround";
import { SUBTITLES } from "./util/subTitle";
import { HelpText } from "./util/helpText";
import "./App.scss";
import { SpotLight } from "./assets/components/effects/spoLight";
import AuroraBackground from "./assets/components/effects/aurora";
import { useAutoDialogue } from "./util/useAutoDialogue";
import { Balloon } from "./assets/components/balloon";
import { BeerObject } from "./assets/components/lineObject/Beer";
import { JokeObject } from "./assets/components/lineObject/joke";
import { GameObject } from "./assets/components/lineObject/game";






export function EffectSoundPlayer({ src, loop = false, volume = 1 }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    if (!src) return;

    audio.src = `/audios/effects/${src}.mp3`;
    audio.loop = loop;
    audio.volume = volume;
    audio.currentTime = 0;

    const play = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Effect play blocked:", err);
      }
    };

    play();

    return () => {
      if (!loop) audio.pause();
    };
  }, [src, loop, volume]);

  return null;
}
function VoicePlayer({ src, audioRef, onDurationChange, hasUserInteracted }) {
  // duration 측정
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => {
      onDurationChange(audio.duration || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [src, audioRef, onDurationChange]);

  // src 바뀔 때 재생 (interaction 이후부터)
  useEffect(() => {
    if (!hasUserInteracted) return;

    const audio = audioRef.current;
    if (!audio) return;

    const play = async () => {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch (err) {
        console.log("Audio play blocked:", err);
      }
    };

    play();
  }, [src, audioRef, hasUserInteracted]);

  return <audio ref={audioRef} src={`/audios/voices/${src}.mp3`} />;
}

const AUTO_FLOW = {
  intro_dark_3: "intro_dark_4",
  intro_light_1: "intro_light_2",
  intro_light_2: "intro_light_3",
  intro_light_3: "intro_life_1",
  beer_intro_1: "beer_intro_2",
  satire_balloon1_1: "satire_balloon1_2",
  satire_balloon2_1: "satire_balloon2_2",
  satire_balloon3_1: "satire_balloon3_2",
  game_intro_1: "game_intro_2",
  game_escape_1: "game_escape_2",
  game_world_1: "game_world_2",
  end_truth_1: "end_stage_1",
  end_stage_1: "end_stage_2",
  end_stage_2: "end_stage_3",
  ending_1: "ending_2",
  ending_2: "ending_3",
  ending_3: "restart_1",
  restart_1: 'restart_2'


};

function App() {
  const [jokeStep, setJokeStep] = useState("intro");
  const [darkness, setDarkness] = useState(0.6);

  const [dialogueKey, setDialogueKey] = useState("intro"); // 처음엔 자막/오디오 없음
  const [subtitleState, setSubtitleState] = useState(false);
  const [dialogueDuration, setDialogueDuration] = useState(0);
  const [effectSounds, setEffectSounds] = useState("")
  const [audienceSound, setAudienceSound] = useState("")

  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [balloon, setBalloon] = useState("");
  const audioRef = useRef(null);
const isHelpText = dialogueKey in HelpText;
const loopSoundEffect = ["ambiant"].includes(effectSounds)
 




    const SoundEffectVolume =useMemo(()=>{
    switch(effectSounds){
      case"ambiant":
      return 1;

      case "lightOff":
      case "Small-laughA":
        return 0.5;

      case "startBgm":

        return 0.5;
      case "ask":
        case "beer":
          case "mouse":
        return 0.05;

      default
        : 1;
    }
  }) 


  //그 뭐여 자막 자동 넘기는 챕터를 위한 함수
  useAutoDialogue({
    dialogueKey,
    setDialogueKey,
    dialogueDuration,
    map: AUTO_FLOW,
    extraDelay: 600,
  });

  // 자막 온/오프 타이밍
  function subtitleTransition(delay) {
    setSubtitleState(true);
    return setTimeout(() => {
      setSubtitleState(false);
    }, delay * 1000 + 500);
  }

  useEffect(() => {
    if (dialogueDuration <= 0) return;
    const timeoutId = subtitleTransition(dialogueDuration);
    return () => clearTimeout(timeoutId);
  }, [dialogueDuration]);
useEffect(() => {
  const animate = (from, to, duration) => {
    let startTime;

    const loop = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = Math.min(progress / duration, 1);

      // ✔ 공통 보간식 (start→end)
      const value = from + (to - from) * t;
      setDarkness(value);

      if (t < 1) requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  };

  if (jokeStep === "start") {
    animate(0.6, 0.98, 1000);   // 밝기 → 어두움
  }

  if (jokeStep === "ending") {
    animate(0.98, 0.6, 1000);   // 어두움 → 밝기
  }
}, [jokeStep]);

  // 오로라 색/투명도
  const baseColor = useMemo(() => {
    switch (jokeStep) {
      case "intro":
        return "";
      case "dark":
        return "#ffea00";
      case "dark-beer":
        return "#ffea00";
      case "dark-joke":
        return "#ff5300";
      case "dark-game":
        return "#7400df";
      case "climax":
        return 40;
      default:
        return 220;
    }
  }, [jokeStep]);

  const opacity = useMemo(() => {
    switch (jokeStep) {
      case "intro":
      case "start":
        return 0;

      case "dark":
        return 0.8;
      case "dark-beer":
      case "dark-joke":
      case "dark-game":
        return 100;
      case "climax":
        return 40;
      default:
        return 0;
    }
  }, [jokeStep]);



  // 🔊 "오디오를 키려면 클릭하세요" 버튼 역할
  //    클릭 → 권한 획득 → 조명 start → 3번 대사 → 4번 대사
  const handleStart = () => {
    setHasUserInteracted(true);

    // 브라우저 자동재생 허용용 더미 play/pause
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
    }
    document.querySelector(".startBtn").classList.add("off");
    setDialogueKey("intro_dark_3");
    setEffectSounds("ambiant");
  };

  return (
    <>
      {isHelpText && (
        <p
          className={`subTitle helpText ${isHelpText ? "on" : "off"}`}
        >
          {HelpText[dialogueKey]}
        </p>
      )}

      <p className={`subTitle ${subtitleState ? "on" : "off"}`}>
        {SUBTITLES[dialogueKey]}
      </p>

      <p className={`title ${jokeStep === "start" ? "on" : ""}`}>
        Running on
        <br />
        Alcohol, <br />
        sarcasm,
        <br /> and late-night games.
      </p>
      <p className={`endTitle ${jokeStep ==="ending" ? "on" : "off"}`}>THE END</p>
      <div className="startBtn" onClick={handleStart}></div>
      {/* 이게 곧 "오디오를 키려면 클릭하세요" 버튼 역할 */}

      {["intro", "start","firstJoke", "end-truth", "ending"].includes(jokeStep) &&
            <>
            <BackGround
        nextStep={() => {
          if (jokeStep === "intro") {
            setJokeStep("start");
            setEffectSounds("startBgm")
            setTimeout(() => {
              setDialogueKey("intro_light_1");
              setJokeStep("firstJoke");
            }, 8000);

            setTimeout(() => {
              setBalloon("ask");
            }, 22900);
          }else if(jokeStep === "end-truth") {
        
              setJokeStep("ending")
              setDialogueKey("ending_1");
              setAudienceSound("ambiant")
              setEffectSounds("endBgm")

              setTimeout(()=>{
                setJokeStep("intro")
                
              }, 20000)

            
          }
          
        }}
        jokeStep={jokeStep}
      />
      <SpotLight darkness={darkness} jokeStep={jokeStep} />
</>
      }


      {balloon === "ask" && (
        <Balloon
          soundsEffects={setEffectSounds}
          nextBallon={() => {
            setTimeout(()=>{
            setBalloon("beer");
            setDialogueKey("intro_life_2");
            }, 2500)
            setEffectSounds("object_B");
          }}
          name={"ask"}
        />
      )}

      {balloon === "beer" && (
        <Balloon
        soundsEffects={setEffectSounds}
          nextBallon={() => {
            setEffectSounds("object_A");
            setTimeout(()=>{
              setBalloon("mouse");
            setDialogueKey("intro_life_3");
                   setTimeout(()=>{
              setAudienceSound("Small-laughA")
            }, 2000)
            }, 2500)
            
          }}
          name={"beer"}
        />
      )}

      {balloon === "mouse" && (
        <Balloon
          soundsEffects={setEffectSounds}
          nextBallon={() => {

            
            setBalloon("");
            setDialogueKey("intro_life_4");
            setEffectSounds("object_C");
            setTimeout(()=>{
              setJokeStep("Title")
              setEffectSounds("lightOff")
              
            }, 5000)

            setTimeout(()=>{
              setDialogueKey("title_1")
              
            setTimeout(()=>{
              setAudienceSound("Small-laughA")
            }, 5000)
            }, 5500)

            setTimeout(()=>{
              setJokeStep("dark")
              
            }, 6000)


            setTimeout(()=>{
              setJokeStep("dark-beer")
              setDialogueKey("beer_intro_1")
              setAudienceSound("")
            }, 11000)
          }}
          name={"mouse"}
        />
      )}

      {jokeStep ==="dark-beer"&&
      <BeerObject nextSubTitle={setDialogueKey} setEffectSounds={setEffectSounds} nextJoke={setJokeStep} />
      }

      {jokeStep ==="dark-joke" && 
      
      <JokeObject nextSubTitle={setDialogueKey} setEffectSounds={setEffectSounds} nextJoke={setJokeStep}/>
}

      {jokeStep ==="dark-game" && 
      
      <GameObject nextSubTitle={setDialogueKey} setEffectSounds={setEffectSounds} nextJoke={setJokeStep}/>
        }
      
      
      <VoicePlayer
        src={dialogueKey}
        audioRef={audioRef}
        onDurationChange={setDialogueDuration}
        hasUserInteracted={hasUserInteracted}
      />

      <EffectSoundPlayer
      src={effectSounds}
      loop={loopSoundEffect}
      volume={SoundEffectVolume}
      />
      <EffectSoundPlayer
      src={audienceSound}
      loop={loopSoundEffect}
      volume={SoundEffectVolume}
      />

      {/* <AuroraBackground opacity={opacity} baseColor={baseColor} zIndex={10} /> */}
    </>
  );
}

export default App;
