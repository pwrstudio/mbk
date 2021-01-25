<script>
  // # # # # # # # # # # # # #
  //
  //  COVERSLIDER
  //
  // # # # # # # # # # # # # #

  // COMPONENTS
  import Cover from "./Cover.svelte"

  // *** PROPS
  export let issues = []
</script>

<div class="covershow">
  {#each issues as issue}
    <Cover {issue} />
  {/each}
</div>

<style lang="scss">
  @import "../variables.scss";

  .covershow {
    width: 100%;
    height: 100%;
    user-select: none;
    @include screen-size("small") {
    }
  }
</style>
