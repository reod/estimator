<script>
  import { goal } from "./../store.js";
  export let step;
  export let onSave;
</script>

<style>

</style>

<div>
  <p>
    name
    <input bind:value={step.name} />
  </p>
  <p>
    value
    <input bind:value={step.estimate.value} type="number" />
  </p>
  <p>
    reference
    <input bind:value={step.estimate.referenceStep} type="number" />

  </p>
  <button
    on:click={() => {
      onSave(step);
    }}>
    {step.id ? 'edit' : 'add'} step
  </button>
</div>
