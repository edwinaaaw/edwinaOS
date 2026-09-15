(() => {
  const ANIMATIONS = Object.freeze({
    idle: { row: 0, frames: 4, fps: 6, loop: true },
    "walk-left": { row: 1, frames: 6, fps: 10, loop: true },
    "walk-right": { row: 2, frames: 6, fps: 10, loop: true },
    "camera-shoot": { row: 3, frames: 8, fps: 8, loop: false },
    "camera-review": { row: 4, frames: 6, fps: 6, loop: false },
  });

  const clamp = (value, minimum, maximum) =>
    Math.min(Math.max(value, minimum), maximum);

  function createController({
    guide,
    sprite,
    bubble,
    desktop,
    reduceMotion = () => false,
    sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
    schedule = setTimeout,
    cancel = clearTimeout,
  }) {
    if (!guide || !sprite || !bubble || !desktop) {
      throw new TypeError("The guide, sprite, bubble, and desktop are required");
    }

    let position = { x: 0, y: 0 };
    let animation = "idle";
    let bubbleTimer = null;

    function setPosition(nextPosition) {
      position = {
        x: Math.round(nextPosition.x),
        y: Math.round(nextPosition.y),
      };
      guide.style.setProperty("--guide-x", `${position.x}px`);
      guide.style.setProperty("--guide-y", `${position.y}px`);
    }

    function playAnimation(name) {
      const next = ANIMATIONS[name] ?? ANIMATIONS.idle;
      animation = Object.hasOwn(ANIMATIONS, name) ? name : "idle";
      sprite.style.backgroundPositionY = `${-next.row * 64}px`;
      sprite.style.setProperty?.("--guide-frames", String(next.frames));
      sprite.style.setProperty?.("--guide-duration", `${next.frames / next.fps}s`);
      sprite.style.animationIterationCount = next.loop ? "infinite" : "1";
      sprite.style.animationName = "none";
      void sprite.offsetWidth;
      sprite.style.animationName = "guide-sprite-x";
    }

    function hideMessage() {
      if (bubbleTimer !== null) cancel(bubbleTimer);
      bubbleTimer = null;
      bubble.classList.remove("is-visible");
    }

    function showMessage(message, duration = 3200) {
      if (bubbleTimer !== null) cancel(bubbleTimer);
      bubble.textContent = message;
      bubble.classList.add("is-visible");
      bubbleTimer = schedule(() => {
        bubble.classList.remove("is-visible");
        bubbleTimer = null;
      }, duration);
    }

    function targetPosition(target) {
      const desktopBox = desktop.getBoundingClientRect();
      const targetBox = target.getBoundingClientRect();
      return {
        x: clamp(
          targetBox.left - desktopBox.left + targetBox.width / 2 - 46,
          4,
          desktopBox.width - 100,
        ),
        y: clamp(
          targetBox.bottom - desktopBox.top + 3,
          28,
          desktopBox.height - 100,
        ),
      };
    }

    async function moveTo(target, message = "") {
      const nextPosition = targetPosition(target);
      const distance = Math.hypot(
        nextPosition.x - position.x,
        nextPosition.y - position.y,
      );
      const duration = reduceMotion() ? 0 : clamp(distance * 2.2, 420, 1050);
      hideMessage();
      playAnimation(nextPosition.x < position.x ? "walk-left" : "walk-right");
      guide.style.transitionDuration = `${Math.round(duration)}ms`;
      setPosition(nextPosition);
      await sleep(duration);
      playAnimation("idle");
      if (message) showMessage(message);
    }

    return Object.freeze({
      setPosition,
      playAnimation,
      moveTo,
      showMessage,
      hideMessage,
      getState: () => ({ position: { ...position }, animation }),
    });
  }

  globalThis.EDWINA_GUIDE_MOTION = Object.freeze({ createController });
})();
