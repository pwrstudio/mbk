<script>
  // # # # # # # # # # # # # #
  //
  //  META
  //
  // # # # # # # # # # # # # #

  import Fa from "svelte-fa"
  import { faFacebookSquare, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
  import { faGlobe } from '@fortawesome/free-solid-svg-icons'
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"

  // *** PROPS
  export let title = ''
  export let  articleTitle = ''
  export let byline = ''
  export let links = []

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

    <!-- SOCIAL -->
    <div class="social">
      {#each links as link}
        <a href={link.url} target=_blank>
          {#if link._type == 'facebook'}
              <Fa icon={faFacebookSquare} />
          {/if}
          {#if link._type == 'instagram'}
            <Fa icon={faInstagram} />
          {/if}
          {#if link._type == 'twitter'}
            <Fa icon={faTwitterSquare} />
          {/if}
          {#if link._type == 'other'}
            <Fa icon={faGlobe} />
          {/if}
        </a>
      {/each}
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