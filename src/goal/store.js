import { writable, get } from "svelte/store";

const goalTemplate = {
  id: 1,
  name: "paint a room",
  unit: "min",
  steps: [],
};

function createGoal(initialGoal) {
  initialGoal = initialGoal || goalTemplate;

  const goalStore = writable({
    ...initialGoal,
  });

  const { subscribe, set, update } = goalStore;

  const lastStep = initialGoal.steps[initialGoal.steps.length - 1];
  let id = lastStep ? lastStep.id : 1;

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

export const goal = createGoal(JSON.parse(localStorage.getItem("goal")));
