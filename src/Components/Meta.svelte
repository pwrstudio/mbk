<script>
  // # # # # # # # # # # # # #
  //
  //  META
  //
  // # # # # # # # # # # # # #

  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"

  import Share from "./Share.svelte"

  // *** PROPS
  export let title = ""
  export let articleTitle = ""
  export let byline = ""
  export let issueSlug = ""
  export let articleSlug = ""
</script>

<div class="block meta" in:fade>
  <!-- HEADER -->
  <div class="header">
    <span>Magasin for Bygningskunst og Kultur</span>
    <span class="right">
      {title}
    </span>
  </div>

  <!-- TITLE -->
  <h1 class="article-title">
    {articleTitle}
  </h1>

  <!-- BYLINE -->
  <div class="byline">
    <div class="text">
      {@html renderBlockText(byline)}
    </div>

    <!-- SHARING-->
    <Share {articleTitle} {articleSlug} {issueSlug} />
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .header {
    padding-top: $margin_xs;
    padding-bottom: $margin_xs;
    border-top: $border_black;

    .right {
      text-align: right;
    }
  }

  .article-title {
    font-family: $display-stack;
    font-size: $font_size_larger;
    line-height: $line_height_larger;
    font-weight: normal;
    margin: 0 0 $margin_xs;
  }

  .byline {
    border-bottom: $border_black;
    margin-bottom: $margin_xs;
    padding-bottom: $margin_xs;
    display: flex;
    align-items: flex-end;

    @include screen-size("small") {
      flex-direction: column;
    }

    .text {
      flex-grow: 1;
      margin-right: $margin;

      @include screen-size("small") {
        margin-right: 0;
      }
    }

    :global(p) {
      margin: 0;
    }
  }
</style>
