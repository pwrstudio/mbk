<script>
  // # # # # # # # # # # # # #
  //
  //  ZOOM-META
  //
  // # # # # # # # # # # # # #

  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"

  // *** COMPONENTS
  import Share from "./Share.svelte"

  // *** PROPS
  export let title = ""
  export let articleTitle = ""
  export let byline = ""
  export let issueSlug = ""
  export let articleSlug = ""
  export let mainText = ""
</script>

<div class="zoom-header-container">
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

  <div class="block main-text" in:fade>
    {@html renderBlockText(mainText)}
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .block {
    box-sizing: border-box;
  }

  .zoom-header-container {
    width: calc(100% - 10px);
  }

  .meta {
    width: 50%;
    float: left;

    @include screen-size("small") {
      width: 100%;
    }

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
  }

  .main-text {
    padding-top: 4px !important;
    padding-bottom: $margin;
    border-top: $border_black;
    width: 50%;
    float: right;

    @include screen-size("small") {
      width: 100%;
      border-top: unset;
      border-bottom: $border_black;
    }
  }
</style>
