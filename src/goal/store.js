import { writable, get } from "svelte/store";

function createGoal(initialSteps) {
  const initialGoal = {
    id: 1,
    name: "paint a room",
    unit: "min",
    steps: [...initialSteps],
  };

  const goalStore = writable({
    ...initialGoal,
  });

  const { subscribe, set, update } = goalStore;

  let id = initialSteps[initialSteps.length - 1].id;

  return {
    subscribe,
    set,

    addStep: (step) =>
      update((goal) => ({
        ...goal,
        steps: [...goal.steps, { ...step, id: (++id, id) }],
      })),

    updateStep: (step) =>
      update((goal) => ({
        ...goal,
        steps: goal.steps.map((s) => (s.id === step.id ? { ...step } : s)),
      })),

    selectStep: (step) =>
      update((goal) => ({
        ...goal,
        steps: goal.steps.map((s) => ({ ...s, selected: s.id === step.id })),
      })),

    getSelectedStep: () => get(goalStore).steps.find((s) => s.selected),

    getStepById: (id) => get(goalStore).steps.find((s) => s.id === id),

    reset: () => set({ ...initialGoal }),
  };
}

export const goal = createGoal([
  {
    id: 1,
    name: "pick color",
    estimate: { value: 1, referenceStep: null },
  },

  {
    id: 2,
    name: "buy stuff",
    estimate: { value: 2, referenceStep: 1 },
  },

  {
    id: 3,
    name: "change dress",
    estimate: { value: 1, referenceStep: 2 },
  },

  {
    id: 4,
    name: "paint",
    estimate: { value: 3, referenceStep: 2 },
  },
  {
    id: 5,
    name: "clenup",
    estimate: { value: 1, referenceStep: 1 },
  },
]);
