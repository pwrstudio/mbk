<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLES
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Swiper, SwiperSlide } from 'swiper/svelte'
  import { fade } from "svelte/transition"

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
      width: 50%;
      padding: $margin $margin / 4;
    }

    .title {
      margin-top: 0;
    }
  }
</style>

{#each $currentArticles as article}
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
    </div>

    <div class="col">
      Right side
    </div>
  </div>
{/each}