<script>
  import { goal } from "./store.js";

  let newStep = {
    id: null,
    name: null,
    estimate: { value: null, referenceStep: null }
  };

  let currentStep = { ...newStep };

  const getWeight = step => {
    return {
      value: calculateStepWeigth(step),
      text: calculateStepWeigthText(step)
    };
  };

  const calculateStepWeigth = step => {
    let stepValue;

    if (step.estimate.referenceStep === null) {
      stepValue = step.estimate.value;
    } else {
      const ref = goal.getStepById(step.estimate.referenceStep);
      stepValue = step.estimate.value * ref.estimate.value;
    }

    return stepValue;
  };

  const calculateStepWeigthText = step => {
    let text;

    if (step.estimate.referenceStep === null) {
      text = "";
    } else {
      const ref = goal.getStepById(step.estimate.referenceStep);
      text = `${step.estimate.value} times as ${ref.name}`;
    }

    return text;
  };

  const sumWeight = () =>
    $goal.reduce((all, next) => all + calculateStepWeigth(next), 0);
</script>

<style>
  .steps {
    display: flex;
    width: 800px;
  }

  .start,
  .end {
    color: azure;
    background: green;
  }

  .step {
    cursor: pointer;
    flex: 1;
    border: 1px solid green;
    padding: 10px;
    margin-right: 5px;
    flex-shrink: 1;
    font-size: 12px;
  }

  .selected {
    border-width: 3px;
  }
</style>

<div>
  <h1>goal</h1>

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

  <div class="steps">
    <div class="step start">start</div>
    {#each $goal as step}
      <div
        style="flex-grow: {getWeight(step).value}"
        class="step"
        class:selected={step.selected}
        on:click={() => {
          currentStep = step;
          goal.selectStep(step);
        }}>
        <div class="name">
          {step.name}
          <span>({step.id})</span>
        </div>

        <div class="weight">
          weight {getWeight(step).value} {getWeight(step).text ? `(${getWeight(step).text})` : ''}
        </div>

      </div>
    {/each}
    <div class="step end">end</div>

  </div>
  <p>all {sumWeight()}</p>
</div>
