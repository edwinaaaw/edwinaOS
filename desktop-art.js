(() => {
  const SOURCES = Object.freeze({
    closed: "./desktop-closed-v2.png",
    "memory-files": "./desktop-memory-files-v2.png",
  });

  function createController(image) {
    if (!image) throw new TypeError("A desktop art image is required");
    let state = "closed";

    function show(nextState) {
      if (!Object.hasOwn(SOURCES, nextState)) {
        throw new RangeError(`Unknown desktop art state: ${nextState}`);
      }
      state = nextState;
      image.src = SOURCES[nextState];
      image.dataset.artState = nextState;
    }

    show("closed");
    return Object.freeze({
      getState: () => state,
      showClosed: () => show("closed"),
      showMemoryFiles: () => show("memory-files"),
    });
  }

  globalThis.EDWINA_DESKTOP_ART = Object.freeze({ createController });
})();
