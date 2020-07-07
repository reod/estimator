<script>
  import { goal } from "./../store.js";
  import Step from "./Step.svelte";

  export let onSelectStep;
</script>

<style>
  .steps {
    display: flex;
  }

  .steps > :global(*) {
    margin-right: 5px;
  }

  .start,
  .end {
    width: 100px;
    color: azure;
    background: green;
  }
</style>

<div class="steps">
  <div class="start">start</div>
  {#each $goal.steps as step}
    <Step {step} onSelect={() => onSelectStep(step)} />
  {/each}
  <div class="end">{$goal.name}</div>
</div>
