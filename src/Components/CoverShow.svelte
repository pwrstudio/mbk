<script>
  // # # # # # # # # # # # # #
  //
  //  COVERSHOW
  //
  // # # # # # # # # # # # # #

  // COMPONENTS
  import Cover from "./Cover.svelte"

  // *** PROPS
  export let issues = []
</script>

<style lang="scss">
  @import "../variables.scss";

  .covershow {
    @include screen-size("small") {
    }
  }
</style>

<div class="covershow">
  {#each issues as issue}
    <Cover {issue} />
  {/each}
</div>
