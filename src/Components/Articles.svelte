<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLES
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";
  import { renderBlockText, urlFor } from "../sanity.js";
  import Slideshow from "./SlideShow.svelte";
  import ArrowDown from "./Graphics/ArrowDown.svelte";
  import get from "lodash/get"

  import "swiper/swiper-bundle.css";
  // import "./swipers.css"

  // *** STORES
  import { currentPost, currentArticles } from "../stores.js";
</script>

<style lang="scss">
  @import "../variables.scss";

  .article {
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    font-family: $sans-stack;
    display: flex;
    flex-flow: row nowrap;
    scroll-snap-align: start;

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

      :global(p) {
        margin: 0;
      }
    }

    .col {
      box-sizing: border-box;
      width: 50%;
      padding: $margin $margin / 4;
      height: 100%;
      overflow-y: scroll;

      &.zoomableSlideshowLayout {
        padding: $margin 0;
        width: 100%;
        display: flex;
        flex-flow: row wrap;

        .block {
          padding: 0 $margin / 4;
          width: 50%;
          box-sizing: border-box;

          &.full {
            width: 100%;
          }

          &.main {
            padding-left: $margin_xs;

            .content {
              padding-top: 6px;
              border-top: $border_black;
            }
          }
        }
      }

      .block {
        &.main {
          margin-bottom: $margin;
        }

        &.link {
          text-align: center;
        }
      }

      &.slideshow {
        overflow-y: hidden;
      }
    }

    .title {
      margin-top: 0;
    }
  }
</style>

{#each $currentArticles as article, index}
  <div class="article" id={article.slug.current}>
      <div
        class="col"
        class:zoomableSlideshowLayout={get(article, 'zoomableSlideshowLayout', false)}>
      <!-- META -->
      <div class="block meta" in:fade>
        <div class="header">
          <span>
            Magasin for Bygningskunst og Kultur
          </span>
          <span class="right">
            {$currentPost.title}
          </span>
        </div>

        <h1 class="article-title">
          {article.title}
        </h1>

        <div class="byline">
          {#if article.byline.content}
            {@html renderBlockText(article.byline.content)}
          {/if}
        </div>
      </div>

      <div class="block main">
        {@html renderBlockText(article.content.content)}
      </div>

      {#if get(article, 'zoomableSlideshowLayout', false)}
        <div class="block full">
          <Slideshow
            zoomable
            slides={article.slideshow} />
        </div>
      {/if}

      {#if index < $currentArticles.length - 1}
        <div
          class="block link"
          class:full={get(article, 'zoomableSlideshowLayout', false)}
          on:click|preventDefault={(e) => {
            window.location.replace('#' + $currentArticles[index + 1].slug.current);
          }}>
          <h2 class="title next">Næste: {$currentArticles[index + 1].title}</h2>
          <div class="graphic">
            <ArrowDown />
          </div>
        </div>
      {/if}
    </div>

    {#if !get(article, 'zoomableSlideshowLayout', false)}
      <div
        class="col"
        class:slideshow={article.slideshow}
      >
        {#if article.slideshow}
          <Slideshow slides={article.slideshow} />
        {/if}
      </div>
    {/if}
  </div>
{/each}
