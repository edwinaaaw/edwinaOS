const { CASES, AI_PROJECTS, COPY, getCopy } = globalThis.EDWINA_CONTENT;
const {
  loadState,
  saveState,
  resetState,
  markCaseViewed,
  getUnlockState,
} = globalThis.EDWINA_STATE;
const desktopArt = globalThis.EDWINA_DESKTOP_ART.createController(
  document.querySelector("#desktop-art-master"),
);

const copyMode = "visitor";
const storage = (() => {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
})();
let state = loadState(storage);
let currentCase = null;
let returnFocus = null;
let desktopReturnFocus = null;
let activeDesktopApp = null;
let storyState = "boot";
let mailIntroStarted = false;

const osDesktop = document.querySelector("#os-desktop");
const wall = document.querySelector("#case-wall");
const board = document.querySelector(".investigation-board");
const nodeMount = document.querySelector("#case-nodes");
const guide = document.querySelector("#edwina-guide");
const guideSprite = guide.querySelector(".guide-sprite");
const guideBubble = document.querySelector("#guide-bubble");
const guideCopy = document.querySelector("#guide-copy");
const toolbarProgress = document.querySelector("#toolbar-progress");
const desktopStatus = document.querySelector("#desktop-status");
const aiGate = document.querySelector("#ai-gate");
const aiGateCopy = document.querySelector("#ai-gate-copy");
const conclusionFile = document.querySelector("#conclusion-file");
const conclusionState = document.querySelector("#conclusion-state");
const bootScreen = document.querySelector("#boot-screen");
const bootCopy = document.querySelector("#boot-copy");
const bootProgressFill = document.querySelector("#boot-progress-fill");
const startButton = document.querySelector("#start-button");
const startMenu = document.querySelector("#start-menu");
const memoryFilesWindow = document.querySelector("#memory-files-window");
const mailWindow = document.querySelector("#mail-window");
const mailEnvelope = document.querySelector(".mail-envelope-art");
const mailIcon = document.querySelector("#mail-icon");
const beforeAiIcon = document.querySelector("#before-ai-icon");
const aiLabIcon = document.querySelector("#ai-lab-icon");
const observationsIcon = document.querySelector("#observations-icon");

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const guideController = globalThis.EDWINA_GUIDE_MOTION.createController({
  guide,
  sprite: guideSprite,
  bubble: guideBubble,
  desktop: osDesktop,
  reduceMotion: () => reduceMotionQuery.matches,
});

const caseDialog = document.querySelector("#case-dialog");
const quickDialog = document.querySelector("#quick-dialog");
const chapterDialog = document.querySelector("#chapter-dialog");
const artPanel = document.querySelector("#art-panel");
const evidencePanel = document.querySelector("#evidence-panel");
const artTab = document.querySelector("#art-tab");
const evidenceTab = document.querySelector("#evidence-tab");

function text(id, replacements = {}) {
  let value = getCopy(id, copyMode);
  for (const [key, replacement] of Object.entries(replacements)) {
    value = value.replaceAll(`{${key}}`, String(replacement));
  }
  return value;
}

function bindCopy(element, id, replacements = {}) {
  if (!element) return element;
  element.textContent = text(id, replacements);
  element.dataset.copyId = id;
  element.dataset.copyStatus = COPY[id]?.status ?? "missing";
  element.removeAttribute("title");
  return element;
}

function makeCopy(tag, id, className = "", replacements = {}) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return bindCopy(element, id, replacements);
}

function createEvidenceMedia(media, variant = "archive") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `evidence-media evidence-media-${media.orientation} evidence-media-${variant}`;
  button.setAttribute("aria-pressed", "false");
  button.setAttribute(
    "aria-label",
    `${text(media.altId)}。 ${text("media.toggleOriginal")}`,
  );

  const frame = document.createElement("span");
  frame.className = "evidence-media-frame";

  const pixelImage = document.createElement("img");
  pixelImage.className = "evidence-image evidence-image-pixel";
  pixelImage.src = media.pixelSrc;
  pixelImage.alt = "";
  pixelImage.width = media.width;
  pixelImage.height = media.height;
  pixelImage.loading = "lazy";
  pixelImage.decoding = "async";
  pixelImage.setAttribute("aria-hidden", "true");

  const originalImage = document.createElement("img");
  originalImage.className = "evidence-image evidence-image-original";
  originalImage.src = media.originalSrc;
  originalImage.alt = text(media.altId);
  originalImage.width = media.width;
  originalImage.height = media.height;
  originalImage.loading = "lazy";
  originalImage.decoding = "async";

  const scan = document.createElement("span");
  scan.className = "evidence-scan";
  scan.setAttribute("aria-hidden", "true");
  frame.append(pixelImage, originalImage, scan);

  const caption = makeCopy("span", media.captionId, "evidence-media-caption");
  const stateLabel = document.createElement("span");
  stateLabel.className = "evidence-media-state";
  stateLabel.append(
    makeCopy("span", "media.pixelView", "state-pixel"),
    makeCopy("span", "media.originalView", "state-original"),
  );

  button.append(frame, caption, stateLabel);
  button.addEventListener("click", () => {
    const showingOriginal = button.classList.toggle("is-original");
    button.setAttribute("aria-pressed", String(showingOriginal));
  });
  return button;
}

function applyStaticCopy() {
  document.querySelectorAll("[data-copy]").forEach((element) => {
    bindCopy(element, element.dataset.copy);
  });
  document.querySelectorAll("[data-copy-aria]").forEach((element) => {
    element.setAttribute("aria-label", text(element.dataset.copyAria));
  });
  document.title = text("app.title");
}

function setStartMenu(open) {
  startMenu.hidden = !open;
  startButton.setAttribute("aria-expanded", String(open));
}

function placeGuideAtStart() {
  const desktopBox = osDesktop.getBoundingClientRect();
  guideController.setPosition({
    x: desktopBox.width * 0.145,
    y: desktopBox.height * 0.77,
  });
  guideController.playAnimation("idle");
}

function startMailIntro() {
  if (mailIntroStarted) return;
  mailIntroStarted = true;
  storyState = "mail";
  mailIcon.classList.add("mail-is-arriving");
  window.setTimeout(() => {
    mailIcon.classList.remove("mail-is-arriving");
  }, reduceMotionQuery.matches ? 0 : 1200);
  guideController.moveTo(mailIcon, text("guide.mailIntro"));
}

function finishBoot() {
  bindCopy(bootCopy, "boot.ready");
  bootProgressFill.style.width = "100%";
  bootScreen.classList.add("is-finished");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => {
    bootScreen.hidden = true;
    startMailIntro();
  }, reduceMotion ? 0 : 280);
}

function openDesktopApp(appId, trigger = null, options = {}) {
  setStartMenu(false);
  desktopReturnFocus = trigger ?? document.querySelector(`[data-desktop-app="${appId}"]`);

  if (appId === "before-ai" && storyState === "mail" && !options.preview) {
    guideController.moveTo(mailIcon, text("guide.mailIntro"));
    mailIcon.focus();
    return;
  }

  if (appId === "ai-lab") {
    if (!getUnlockState(state).aiNativeUnlocked) {
      bindCopy(desktopStatus, "desktop.locked");
      guideController.moveTo(aiLabIcon, text("desktop.locked"));
      return;
    }
    returnFocus = desktopReturnFocus ?? aiLabIcon;
    openChapter("ai");
    return;
  }

  if (appId === "observations") {
    bindCopy(desktopStatus, "desktop.observationsLocked");
    guideController.moveTo(
      observationsIcon,
      text("desktop.observationsLocked"),
    );
    return;
  }

  const windowElement = appId === "before-ai" ? memoryFilesWindow : mailWindow;
  if (!windowElement) return;
  for (const item of [memoryFilesWindow, mailWindow]) {
    if (item !== windowElement) {
      item.hidden = true;
      item.classList.remove("is-open");
    }
  }
  if (appId === "before-ai") {
    desktopArt.showMemoryFiles();
  } else {
    desktopArt.showClosed();
  }
  activeDesktopApp = appId;
  if (appId === "mail" && !options.preview) {
    storyState = "mail-open";
    guideController.hideMessage();
  }
  if (appId === "mail") {
    mailWindow.classList.add("mail-is-opening");
    mailEnvelope.classList.add("mail-envelope-is-open");
    window.setTimeout(() => {
      mailWindow.classList.remove("mail-is-opening");
    }, reduceMotionQuery.matches ? 0 : 520);
  }
  windowElement.hidden = false;
  windowElement.classList.add("is-open");
  bindCopy(desktopStatus, appId === "before-ai" ? "desktop.beforeAiOpen" : "mail.title");
  (appId === "before-ai" ? wall : windowElement).focus?.();
}

function closeDesktopApp(appId) {
  const windowElement = appId === "before-ai" ? memoryFilesWindow : mailWindow;
  if (!windowElement || windowElement.hidden) return;
  windowElement.hidden = true;
  windowElement.classList.remove("is-open");
  if (appId === "before-ai") desktopArt.showClosed();
  activeDesktopApp = null;
  bindCopy(desktopStatus, "desktop.ready");
  desktopReturnFocus?.focus();
}

function syncDesktopUnlocks(unlocks) {
  const unlocked = unlocks.aiNativeUnlocked;
  aiLabIcon.setAttribute("aria-disabled", String(!unlocked));
  const startAi = startMenu.querySelector('[data-desktop-app="ai-lab"]');
  startAi?.setAttribute("aria-disabled", String(!unlocked));
  aiLabIcon.classList.toggle("is-unlocked", unlocked);
}

function createNodeVisual(caseId) {
  const visual = document.createElement("span");
  visual.className = `node-visual node-visual-${caseId}`;
  visual.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 7; index += 1) {
    visual.append(document.createElement("i"));
  }
  return visual;
}

function renderCaseNodes() {
  nodeMount.replaceChildren(
    ...CASES.map((caseData, index) => {
      const viewed = state.viewedCaseIds.includes(caseData.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `case-node node-${index + 1}${viewed ? " is-viewed" : " is-unseen"}`;
      button.dataset.caseId = caseData.id;
      button.setAttribute("aria-describedby", `case-state-${caseData.id}`);

      const pin = document.createElement("span");
      pin.className = "case-pin";
      pin.setAttribute("aria-hidden", "true");

      const label = makeCopy("strong", caseData.copyIds.node, "node-label");
      const caseState = makeCopy(
        "span",
        viewed ? "wall.viewed" : "wall.unseen",
        "node-state",
      );
      caseState.id = `case-state-${caseData.id}`;

      button.append(pin, createNodeVisual(caseData.id), label, caseState);
      button.addEventListener("click", () => visitCase(caseData, button));
      return button;
    }),
  );
}

function updateProgress() {
  const unlocks = getUnlockState(state);
  document.querySelectorAll(".thread-lines span").forEach((line, index) => {
    line.classList.toggle("is-connected", state.viewedCaseIds.includes(CASES[index].id));
  });
  const progressLabel = `${text("wall.progress")} ${unlocks.viewedCount}/5`;
  toolbarProgress.textContent = progressLabel;
  toolbarProgress.dataset.copyId = "wall.progress";
  if (activeDesktopApp === "before-ai") desktopStatus.textContent = progressLabel;
  syncDesktopUnlocks(unlocks);

  aiGate.disabled = !unlocks.aiNativeUnlocked;
  bindCopy(
    aiGate,
    unlocks.aiNativeUnlocked ? "wall.aiUnlocked" : "wall.aiLocked",
  );
  if (unlocks.aiNativeUnlocked) {
    bindCopy(aiGateCopy, "guide.three");
  } else {
    bindCopy(aiGateCopy, "ai.locked", {
      count: Math.max(0, 3 - unlocks.viewedCount),
    });
  }

  conclusionFile.disabled = !unlocks.conclusionUnlocked;
  bindCopy(
    conclusionState,
    unlocks.conclusionUnlocked
      ? "wall.conclusionUnlocked"
      : "wall.conclusionLocked",
  );

  board.dataset.viewedCount = String(unlocks.viewedCount);
  if (unlocks.conclusionUnlocked) {
    bindCopy(guideCopy, "guide.complete");
  } else if (unlocks.viewedCount === 3) {
    bindCopy(guideCopy, "guide.three");
  }
}

function renderWall() {
  renderCaseNodes();
  updateProgress();
}

async function visitCase(caseData, opener) {
  returnFocus = opener;
  document.querySelectorAll(".case-node.is-current").forEach((node) => {
    node.classList.remove("is-current");
  });
  opener.classList.add("is-current");
  bindCopy(guideCopy, "guide.moving");
  await guideController.moveTo(opener);
  openCase(caseData, { track: true });
}

function makeArtWorld(caseData) {
  const world = document.createElement("div");
  world.className = `art-world world-${caseData.id}${caseData.media?.length ? " has-media" : ""}`;

  const scenery = document.createElement("div");
  scenery.className = "world-scenery";
  scenery.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 12; index += 1) {
    scenery.append(document.createElement("span"));
  }
  world.append(scenery);

  if (caseData.media?.length) {
    const mediaDeck = document.createElement("div");
    mediaDeck.className = `world-media-deck world-media-deck-${caseData.id}`;
    for (const media of caseData.media) {
      mediaDeck.append(createEvidenceMedia(media, "art"));
    }
    world.append(mediaDeck);
  }

  if (caseData.copyIds.facts.length) {
    const facts = document.createElement("div");
    facts.className = "world-facts";
    for (const factId of caseData.copyIds.facts) {
      facts.append(makeCopy("span", factId));
    }
    world.append(facts);
  }

  return world;
}

function renderArtPanel(caseData) {
  const layout = document.createElement("div");
  layout.className = `case-layout case-layout-${caseData.id}`;

  const visualColumn = document.createElement("div");
  visualColumn.className = "case-visual-column";
  visualColumn.append(makeArtWorld(caseData));

  const narrative = document.createElement("div");
  narrative.className = "case-narrative";
  narrative.append(
    makeCopy("h2", caseData.copyIds.title),
    makeCopy("p", caseData.copyIds.summary, "case-summary"),
    makeCopy("h3", "case.decision"),
    makeCopy("p", caseData.copyIds.decision),
    makeCopy("h3", "case.result"),
    makeCopy("p", caseData.copyIds.result),
  );

  layout.append(visualColumn, narrative);
  artPanel.replaceChildren(layout);
}

function renderEvidencePanel(caseData) {
  const wrap = document.createElement("div");
  wrap.className = `evidence-wrap evidence-wrap-${caseData.id}`;

  if (!caseData.media?.length) {
    evidencePanel.replaceChildren();
    return;
  }

  const gallery = document.createElement("div");
  gallery.className = "evidence-media-grid";
  for (const media of caseData.media) {
    gallery.append(createEvidenceMedia(media, "archive"));
  }
  wrap.append(gallery);
  evidencePanel.replaceChildren(wrap);
}

function configureCaseTabs(caseData) {
  const hasMedia = Boolean(caseData.media?.length);
  evidenceTab.hidden = !hasMedia;
  evidenceTab.disabled = !hasMedia;
  evidencePanel.hidden = true;
  artTab.hidden = false;
}

function selectTab(name, moveFocus = false) {
  if (name === "evidence" && evidenceTab.hidden) return;
  const showArt = name === "art";
  artPanel.hidden = !showArt;
  evidencePanel.hidden = showArt;
  artTab.setAttribute("aria-selected", String(showArt));
  evidenceTab.setAttribute("aria-selected", String(!showArt));
  artTab.tabIndex = showArt ? 0 : -1;
  evidenceTab.tabIndex = showArt ? -1 : 0;
  if (moveFocus) (showArt ? artTab : evidenceTab).focus();
}

function openCase(caseData, options = { track: true }) {
  currentCase = caseData;
  bindCopy(document.querySelector("#case-dialog-title"), caseData.copyIds.node);
  renderArtPanel(caseData);
  renderEvidencePanel(caseData);
  configureCaseTabs(caseData);
  selectTab("art");

  if (options.track) {
    const wasViewed = state.viewedCaseIds.includes(caseData.id);
    state = markCaseViewed(state, caseData.id);
    saveState(storage, state);
    renderWall();
    returnFocus = document.querySelector(`[data-case-id="${caseData.id}"]`);
    returnFocus?.classList.add("is-current");
    if (!wasViewed) {
      returnFocus?.classList.add("has-just-connected");
      window.setTimeout(() => {
        returnFocus?.classList.remove("has-just-connected");
      }, 700);
    }
    const unlocks = getUnlockState(state);
    if (unlocks.conclusionUnlocked) {
      bindCopy(guideCopy, "guide.complete");
    } else if (unlocks.viewedCount === 3) {
      bindCopy(guideCopy, "guide.three");
    } else {
      bindCopy(guideCopy, "guide.viewed");
    }
  }

  if (!caseDialog.open) {
    caseDialog.showModal();
  }
}

function renderQuickBrowse() {
  const mount = document.querySelector("#quick-case-list");
  mount.replaceChildren(
    ...CASES.map((caseData) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quick-case-button";
      button.append(
        createNodeVisual(caseData.id),
        makeCopy("strong", caseData.copyIds.node),
        makeCopy("span", caseData.copyIds.summary),
      );
      button.addEventListener("click", () => {
        quickDialog.close();
        returnFocus = document.querySelector("#quick-browse");
        openCase(caseData, { track: false });
      });
      return button;
    }),
  );
}

function renderAiProjects() {
  const mount = document.querySelector("#ai-project-list");
  mount.replaceChildren(...AI_PROJECTS.map((project, index) => {
    const card = document.createElement("article");
    card.className = "ai-project-card";
    card.dataset.project = project.id;
    const number = document.createElement("span");
    number.className = "ai-project-number";
    number.textContent = String(index + 1).padStart(2, "0");
    number.setAttribute("aria-hidden", "true");
    const heading = makeCopy("h3", project.copyIds.title);
    heading.id = `ai-project-${project.id}`;
    card.setAttribute("aria-labelledby", heading.id);
    const details = document.createElement("div");
    details.className = "ai-project-details";
    const actions = document.createElement("div");
    actions.className = "ai-project-actions";
    const launch = makeCopy("button", project.actionId, "os-button ai-project-primary");
    launch.type = "button";
    launch.dataset.launchProject = project.id;
    launch.addEventListener("click", () => openAiProject(project));
    actions.append(launch);
    const source = document.createElement("details");
    source.className = "ai-project-source";
    const repo = makeCopy("a", "ai.repo", "ai-project-repo");
    repo.href = project.repoUrl;
    repo.target = "_blank";
    repo.rel = "noopener noreferrer";
    repo.setAttribute("aria-label", `${text(project.copyIds.title)}：${text("ai.repo")}（新标签页）`);
    source.append(makeCopy("summary", "ai.source"), repo);
    details.append(makeCopy("span", project.copyIds.kind, "ai-project-kind"), heading,
      makeCopy("p", project.copyIds.summary), actions, source);
    card.append(number, details);
    return card;
  }));
}

let activeAiProjectId = null;

function closeAiProject({ restoreFocus = true } = {}) {
  const previousId = activeAiProjectId;
  activeAiProjectId = null;
  document.querySelector("#ai-project-content").replaceChildren();
  document.querySelector("#ai-project-view").hidden = true;
  delete chapterDialog.dataset.projectOpen;
  document.querySelector("#ai-project-list").hidden = chapterDialog.dataset.chapter !== "ai";
  if (restoreFocus && previousId) document.querySelector(`[data-launch-project="${previousId}"]`)?.focus();
}

function openAiProject(project) {
  activeAiProjectId = project.id;
  const content = document.querySelector("#ai-project-content");
  content.replaceChildren();
  bindCopy(document.querySelector("#ai-project-view-title"), project.copyIds.title);
  document.querySelector("#ai-project-list").hidden = true;
  document.querySelector("#ai-project-view").hidden = false;
  chapterDialog.dataset.projectOpen = "true";
  if (project.id === "brain-starter") {
    const guide = document.createElement("div");
    guide.className = "ai-skill-guide";
    guide.append(...["ai.brainIntro", "ai.brainStep1", "ai.brainStep2", "ai.brainStep3"].map(id => makeCopy("p", id)));
    const repo = makeCopy("a", "ai.repo", "ai-project-repo");
    repo.href = project.url;
    repo.target = "_blank";
    repo.rel = "noopener noreferrer";
    guide.append(repo);
    content.append(guide);
  } else {
    const frame = document.createElement("iframe");
    frame.className = "ai-project-frame";
    frame.title = text(project.copyIds.title);
    frame.src = project.url;
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-downloads");
    frame.referrerPolicy = "no-referrer";
    content.append(frame, makeCopy("p", "ai.network", "ai-project-network"));
  }
  chapterDialog.scrollTop = 0;
  document.querySelector("#ai-project-view-title").focus();
}

function openChapter(kind, bypass = false) {
  const unlocks = getUnlockState(state);
  if (kind === "ai" && !unlocks.aiNativeUnlocked && !bypass) return;
  if (kind === "conclusion" && !unlocks.conclusionUnlocked) return;

  closeAiProject({ restoreFocus: false });
  const titleId = kind === "conclusion" ? "conclusion.title" : "ai.title";
  const copyId = kind === "conclusion" ? "conclusion.body" : "ai.preview";
  bindCopy(document.querySelector("#chapter-title"), titleId);
  bindCopy(document.querySelector("#chapter-copy"), copyId);

  document.querySelector("#ai-project-list").hidden = kind !== "ai";
  chapterDialog.dataset.chapter = kind;
  chapterDialog.showModal();
}

function closeDialog(button) {
  const dialog = document.querySelector(`#${button.dataset.close}`);
  dialog?.close();
}

document.querySelector("#ai-project-back").addEventListener("click", () => closeAiProject());
chapterDialog.addEventListener("close", () => closeAiProject({ restoreFocus: false }));

applyStaticCopy();
renderWall();
renderQuickBrowse();
renderAiProjects();
placeGuideAtStart();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) {
  window.requestAnimationFrame(finishBoot);
} else {
  const bootSteps = [20, 42, 67, 84, 100];
  bootSteps.forEach((value, index) => {
    window.setTimeout(() => {
      bootProgressFill.style.width = `${value}%`;
      if (value === 100) window.setTimeout(finishBoot, 180);
    }, 260 + index * 300);
  });
}

const updateClock = () => {
  const clock = document.querySelector("#desktop-clock");
  clock.textContent = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
};
updateClock();
window.setInterval(updateClock, 30000);

document.querySelectorAll("[data-desktop-app]").forEach((button) => {
  button.addEventListener("click", () => openDesktopApp(button.dataset.desktopApp, button));
});

document.querySelectorAll("[data-close-desktop-app]").forEach((button) => {
  button.addEventListener("click", () => closeDesktopApp(button.dataset.closeDesktopApp));
});

startButton.addEventListener("click", () => setStartMenu(startMenu.hidden));
document.querySelector("#mail-open-before").addEventListener("click", async () => {
  closeDesktopApp("mail");
  storyState = "before-ai";
  await guideController.moveTo(beforeAiIcon, text("desktop.guide"));
  openDesktopApp("before-ai", document.querySelector("#before-ai-icon"));
});
document.querySelector("#mail-quick-browse").addEventListener("click", () => {
  closeDesktopApp("mail");
  returnFocus = mailIcon;
  quickDialog.showModal();
});
document.querySelector("#start-quick-browse").addEventListener("click", () => {
  setStartMenu(false);
  returnFocus = startButton;
  quickDialog.showModal();
});
document.querySelector("#quick-browse").addEventListener("click", () => {
  returnFocus = document.querySelector("#quick-browse");
  quickDialog.showModal();
});
document.querySelector("#quick-ai").addEventListener("click", () => {
  quickDialog.close();
  openChapter("ai", true);
});
document.querySelector("#reset-investigation").addEventListener("click", () => {
  if (!window.confirm(text("reset.prompt"))) return;
  state = resetState(storage);
  placeGuideAtStart();
  mailIntroStarted = false;
  storyState = "boot";
  bindCopy(guideCopy, "guide.start");
  renderWall();
  startMailIntro();
  mailIcon.focus();
});
aiGate.addEventListener("click", () => openChapter("ai"));
conclusionFile.addEventListener("click", () => openChapter("conclusion"));
artTab.addEventListener("click", () => selectTab("art"));
evidenceTab.addEventListener("click", () => selectTab("evidence"));

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button));
});

for (const dialog of [caseDialog, quickDialog, chapterDialog]) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (dialog === caseDialog) {
      document.querySelectorAll(".case-node.is-current").forEach((node) => {
        node.classList.remove("is-current");
      });
      currentCase = null;
    }
    returnFocus?.focus();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (caseDialog.open) return;
    if (quickDialog.open || chapterDialog.open) return;
    if (activeDesktopApp === "before-ai") {
      closeDesktopApp("before-ai");
      return;
    }
    if (activeDesktopApp === "mail") {
      closeDesktopApp("mail");
      return;
    }
    if (!startMenu.hidden) setStartMenu(false);
    return;
  }
  if (!caseDialog.open || !["ArrowLeft", "ArrowRight"].includes(event.key)) {
    return;
  }
  if (![artTab, evidenceTab].includes(document.activeElement)) return;
  event.preventDefault();
  selectTab(event.key === "ArrowLeft" ? "art" : "evidence", true);
});

window.addEventListener("resize", () => {
  if (!currentCase) return;
  const node = document.querySelector(`[data-case-id="${currentCase.id}"]`);
  if (node) guideController.moveTo(node);
});
