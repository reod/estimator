<script>
  import { goal } from "./store.js";
  import GoalOverview from "./goal-overview/GoalOverview.svelte";
  import Steps from "./steps/Steps.svelte";

  let newStep = {
    id: null,
    name: null,
    estimate: { value: null, referenceStep: null }
  };

  let currentStep = { ...newStep };
</script>

<div>
  <GoalOverview />

  <p>
    name
    <input bind:value={currentStep.name} />
  </p>
  <p>
    value
    <input bind:value={currentStep.estimate.value} />
  </p>
  <p>
    reference
    <input bind:value={currentStep.estimate.referenceStep} />

  </p>
  <button
    on:click={() => {
      currentStep.id ? goal.updateStep(currentStep) : goal.addStep(currentStep);
      currentStep = { ...newStep };
    }}>
    {currentStep.id ? 'edit' : 'add'} step
  </button>

  <Steps
    onSelectStep={step => {
      goal.selectStep(step);
      currentStep = goal.getSelectedStep();
    }} />

</div>
