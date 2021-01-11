<script>
  // # # # # # # # # # # # # #
  //
  //  COVER
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { renderBlockText, urlFor } from "../sanity.js"

  // *** PROPS
  export let issue = {}
</script>

<style lang="scss">
  @import "../variables.scss";

  .cover {
    width: 100%;

    .inner {
      width: 100%;

      .image {
        width: 100%;
      }
    }

    @include screen-size("small") {
    }
  }
</style>

<a class="cover" in:fade href="/">
  <div class="inner">
    <!-- IMAGE -->
    <img
      class="image"
      src={urlFor(issue.mainImage.asset)
        .width(400)
        .quality(90)
        .auto('format')
        .url()}
      alt={issue.mainImage.alt}
      />
  </div>
</a>
