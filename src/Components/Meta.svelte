<script>
  // # # # # # # # # # # # # #
  //
  //  META
  //
  // # # # # # # # # # # # # #

  import Fa from "svelte-fa"
  import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"

  export let title, articleTitle, byline

</script>

<div class="block meta" in:fade>
  <div class="header">
    <span> Magasin for Bygningskunst og Kultur </span>
    <span class="right">
      {title}
    </span>
  </div>

  <h1 class="article-title">
    {articleTitle}
  </h1>

  <div class="byline">
    <div class="text">
      {@html renderBlockText(byline)}
    </div>
    <div class="social">
      <Fa icon={faFacebookSquare} />
      <Fa icon={faInstagram} />
    </div>
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
  
    .text {
      flex-grow: 1;
      margin-right: $margin;
    }

    .social {
      white-space: nowrap;
    }

    :global(p) {
      margin: 0;
    }
  }
</style>