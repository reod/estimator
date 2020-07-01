import { writable, get } from "svelte/store";

function createGoal(initialSteps) {
  const allSteps = writable(initialSteps);

  const { subscribe, set, update } = allSteps;
  let id = initialSteps[initialSteps.length - 1].id;

  return {
    subscribe,
    addStep: (step) =>
      update((steps) => [...steps, { ...step, id: (++id, id) }]),
    updateStep: (step) =>
      update((steps) => steps.map((s) => (s.id === step.id ? { ...step } : s))),
    selectStep: (step) =>
      update((steps) =>
        steps.map((s) => ({ ...s, selected: s.id === step.id }))
      ),
    getSelectedStep: () => get(allSteps).find((s) => s.selected),
    getStepById: (id) => get(allSteps).find((s) => s.id === id),
    reset: () => set([]),
  };
}

export const goal = createGoal([
  {
    id: 1,
    name: "first",
    estimate: { value: 1, referenceStep: null },
  },

  {
    id: 2,
    name: "second",
    estimate: { value: 2, referenceStep: 1 },
  },

  {
    id: 3,
    name: "thrid",
    estimate: { value: 1, referenceStep: 2 },
  },

  {
    id: 4,
    name: "fourth",
    estimate: { value: 3, referenceStep: 2 },
  },
  {
    id: 5,
    name: "fifth",
    estimate: { value: 1, referenceStep: 1 },
  }
]);
