<script>
  import { goal } from "./../store.js";

  export let onSelect;
  export let step;

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
</script>

<style>
  .step {
    cursor: pointer;
    flex: 1;
    border: 1px solid green;
    padding: 10px;
    font-size: 12px;
  }

  .selected {
    border-width: 3px;
  }
</style>

<div
  style="flex-grow: {getWeight(step).value}"
  class="step"
  class:selected={step.selected}
  on:click={() => onSelect(step)}>
  <div class="name">
    {step.name}
    <span>({step.id})</span>
  </div>

  <div class="weight">
    weight {getWeight(step).value} {getWeight(step).text ? `(${getWeight(step).text})` : ''}
  </div>

</div>
