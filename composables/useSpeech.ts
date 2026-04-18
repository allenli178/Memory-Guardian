export function useSpeech() {
  function speak(text: string) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8; // 语速放慢，适合老年人
    window.speechSynthesis.speak(utterance);
  }

  return { speak };
}
