<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { renderBlockText, urlFor } from "../sanity.js"

  // *** PROPS
  export let images = []
</script>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    @include screen-size("small") {
    }
  }
</style>

<div class="slideshow">
  {#each images as image}
    <!-- IMAGE -->
    <img
      src={urlFor(image.asset).width(400).quality(90).auto('format').url()} />
  {/each}
</div>
