import { useEffect, useRef } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const interactedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleInteraction = () => {
      if (!interactedRef.current) {
        interactedRef.current = true;
        if (audio && !audio.playing) {
          audio.volume = 0.5; // 设置音量 (0 到 1 之间)
          audio.play(); // 开始播放
        }
      }
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      if (audio) {
        audio.pause(); // 组件卸载时暂停播放
      }
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="audio/bgm.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
