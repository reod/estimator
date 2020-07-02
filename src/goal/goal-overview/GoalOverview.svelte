<script>
  import { goal } from "./../store.js";
</script>

<style>
  .name {
    font-weight: bold;
    font-size: 20px;
    line-height: 2.5;
  }
  .goal-props {
    max-width: 200px;
    display: grid;
    grid-template-columns: 33% 66%;
  }
</style>

<div class="goal">
  <div class="name">Your goal</div>
  <div class="goal-props">
    <label for="#goal_name">Name</label>
    <input
      type="text"
      placeholder="what to achieve"
      id="goal_name"
      bind:value={$goal.name} />

    <!-- <label for="#goal_name">Unit</label>
    <input
      type="text"
      placeholder="time/story points/whatever"
      bind:value={$goal.unit} /> -->
  </div>
</div>
