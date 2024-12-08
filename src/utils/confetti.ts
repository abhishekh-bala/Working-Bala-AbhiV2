import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  const duration = 5000;
  const end = Date.now() + duration;
  const colors = ['#FF69B4', '#4B0082', '#9400D3'];

  const fireConfetti = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: colors,
      startVelocity: 30,
      gravity: 0.8,
      shapes: ['circle', 'square'],
      ticks: 200
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: colors,
      startVelocity: 30,
      gravity: 0.8,
      shapes: ['circle', 'square'],
      ticks: 200
    });
  };

  const frame = () => {
    fireConfetti();
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};