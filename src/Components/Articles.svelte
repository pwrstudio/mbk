<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLES
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { fade } from "svelte/transition"
  import { renderBlockText, urlFor } from "../sanity.js"
  import ArrowDown from "../Components/Graphics/ArrowDown.svelte"

  import "swiper/swiper-bundle.css"

  // *** STORES
  import { currentPost, currentArticles } from '../stores.js'

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

    .header {
      padding-top: 8px;
      padding-bottom: 8px;
      border-top: $border_black;
    }

    .article-title {
      font-family: $display-stack;
      font-size: $font_size_larger;
      line-height: $line_height_larger;
      font-weight: normal;
      margin: 0;
    }

    .col {
      box-sizing: border-box;
      width: 50%;
      padding: $margin $margin / 4;
      height: 100%;
      overflow-y: scroll;

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
    <div class="col">
      <!-- META -->
      <div class="meta" in:fade>
        <div class="header">
          <span>Magasin for Bygningskunst og Kultur</span>
          <span>{$currentPost.title}</span>
        </div>
        <!-- TITLE -->
        <h1 class="article-title">{article.title}</h1>
        <!-- BYLINE -->
        <div class="byline">
          <!-- {@html renderBlockText(post.byline.content)} -->
        </div>
      </div>

      <div class="block">
        {@html renderBlockText(article.content.content) }
      </div>

      {#if index < $currentArticles.length - 1}
        <div
          class="link"
          on:click|preventDefault={e => { window.location.replace('#' + $currentArticles[index + 1].slug.current) }}>
          <h2 class="title next">
            Næste: {$currentArticles[index + 1].title}
          </h2>
          <ArrowDown />
        </div>
      {/if}
    </div>

    <div class="col" class:slideshow={article.slideshow}>
      {#if article.slideshow}
        <Swiper>
          {#each article.slideshow as slide}
            <SwiperSlide>
              <img
                src={urlFor(slide.asset).quality(80).height(window.innerHeight).url()}
                alt={slide.asset.alt}
              >
            </SwiperSlide>
          {/each}
        </Swiper>
      {/if}
    </div>
  </div>
{/each}