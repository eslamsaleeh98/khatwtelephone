/**
 * Custom smooth scroll utility providing a deliberate, perceptible
 * gliding animation with ease-in-out curve and target section highlight.
 */

export function smoothScrollTo(targetY: number, duration = 600): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const difference = targetY - startY;
    const startTime = performance.now();

    if (Math.abs(difference) < 8) {
      resolve();
      return;
    }

    // Smooth cubic easing
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);

      window.scrollTo(0, startY + difference * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

export function scrollToElement(elementId: string, duration = 600, offset = 70): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = Math.max(0, elementPosition - offset);

  smoothScrollTo(targetPosition, duration).then(() => {
    element.classList.remove('section-scroll-highlight');
    // Force DOM reflow to re-trigger pulse
    void element.offsetWidth;
    element.classList.add('section-scroll-highlight');
    setTimeout(() => {
      element.classList.remove('section-scroll-highlight');
    }, 2200);
  });
}
