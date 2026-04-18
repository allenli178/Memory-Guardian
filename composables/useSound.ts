import { ref } from "vue";

export function useSound() {
  const audioContext = ref<AudioContext | null>(null);

  function initAudioContext() {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  function playSuccessSound() {
    initAudioContext();
    if (!audioContext.value) return;

    const oscillator = audioContext.value.createOscillator();
    const gainNode = audioContext.value.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.value.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.value.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.value.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, audioContext.value.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.value.currentTime + 0.3);

    oscillator.start(audioContext.value.currentTime);
    oscillator.stop(audioContext.value.currentTime + 0.3);
  }

  function playErrorSound() {
    initAudioContext();
    if (!audioContext.value) return;

    const oscillator = audioContext.value.createOscillator();
    const gainNode = audioContext.value.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.value.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.value.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.value.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.2, audioContext.value.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.value.currentTime + 0.2);

    oscillator.start(audioContext.value.currentTime);
    oscillator.stop(audioContext.value.currentTime + 0.2);
  }

  return { playSuccessSound, playErrorSound };
}
