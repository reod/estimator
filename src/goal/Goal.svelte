<script>
  import { goal } from "./store.js";
  import GoalOverview from "./goal-overview/GoalOverview.svelte";
  import Steps from "./steps/Steps.svelte";
  import StepEditor from "./step-editor/StepEditor.svelte";

  let newStep = {
    id: null,
    name: null,
    estimate: { value: null, referenceStep: null }
  };

  let currentStep = { ...newStep };

  const handleStepSave = () => {
    currentStep.id ? goal.updateStep(currentStep) : goal.addStep(currentStep);
    currentStep = { ...newStep };
  };

  goal.subscribe(v => {
      localStorage.setItem('goal', JSON.stringify(v));
  });
</script>

<div>
  <GoalOverview />

  <StepEditor step={currentStep} onSave={handleStepSave} />

  <Steps
    onSelectStep={step => {
      goal.selectStep(step);
      currentStep = goal.getSelectedStep();
    }} />

</div>
