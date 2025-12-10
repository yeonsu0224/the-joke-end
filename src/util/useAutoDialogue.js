import { useEffect } from "react";

/**
 * 자동으로 다음 대사로 넘어가는 hook
 * @param {Object} params
 * @param {string} params.dialogueKey 현재 대사 키
 * @param {function} params.setDialogueKey 대사 변경 setter
 * @param {number} params.dialogueDuration 현재 오디오 duration (초)
 * @param {Object} params.map 자동 이동 규칙 { 현재키: 다음키 }
 * @param {number} params.extraDelay 추가 대기 시간 (ms)
 */
export function useAutoDialogue({
  dialogueKey,
  setDialogueKey,
  dialogueDuration,
  map,
  extraDelay = 600,
}) {
  useEffect(() => {
    const next = map[dialogueKey];
    if (!next) return; // 매핑이 없으면 자동전환 없음
    if (!dialogueDuration) return;

    const id = setTimeout(() => {
      setDialogueKey(next);
    }, dialogueDuration * 1000 + extraDelay);

    return () => clearTimeout(id);
  }, [dialogueKey, dialogueDuration, map, setDialogueKey, extraDelay]);
}
