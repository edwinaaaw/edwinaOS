(() => {
const CASE_IDS = [
  "taiwan",
  "little-ondine",
  "director",
  "keycaps",
  "miaoya",
];

const SAVE_KEY = "edwina-os-v3-save";
const SAVE_VERSION = 1;

function createInitialState() {
  return {
    version: SAVE_VERSION,
    viewedCaseIds: [],
  };
}

function normalizeState(candidate) {
  if (!candidate || !Array.isArray(candidate.viewedCaseIds)) {
    return createInitialState();
  }

  const viewedCaseIds = [
    ...new Set(candidate.viewedCaseIds.filter((id) => CASE_IDS.includes(id))),
  ];

  return {
    version: SAVE_VERSION,
    viewedCaseIds,
  };
}

function markCaseViewed(state, caseId) {
  const normalized = normalizeState(state);
  if (!CASE_IDS.includes(caseId) || normalized.viewedCaseIds.includes(caseId)) {
    return normalized;
  }

  return {
    ...normalized,
    viewedCaseIds: [...normalized.viewedCaseIds, caseId],
  };
}

function getUnlockState(state) {
  const viewedCount = normalizeState(state).viewedCaseIds.length;
  return {
    viewedCount,
    aiNativeUnlocked: viewedCount >= 3,
    conclusionUnlocked: viewedCount >= CASE_IDS.length,
  };
}

function loadState(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(SAVE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : createInitialState();
  } catch {
    return createInitialState();
  }
}

function saveState(storage = globalThis.localStorage, state) {
  const normalized = normalizeState(state);
  storage?.setItem(SAVE_KEY, JSON.stringify(normalized));
  return normalized;
}

function resetState(storage = globalThis.localStorage) {
  storage?.removeItem(SAVE_KEY);
  return createInitialState();
}

globalThis.EDWINA_STATE = Object.freeze({
  CASE_IDS,
  SAVE_KEY,
  createInitialState,
  normalizeState,
  markCaseViewed,
  getUnlockState,
  loadState,
  saveState,
  resetState,
});
})();
