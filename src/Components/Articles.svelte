<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLES
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { renderBlockText, urlFor } from "../sanity.js"
  import ArrowDown from "./Graphics/ArrowDown.svelte"
  import get from "lodash/get"

  // *** COMPONENTS
  import MetaData from "./MetaData.svelte"
  import Slideshow from "./SlideShow.svelte"
  import Meta from "./Meta.svelte"

  import "swiper/swiper-bundle.css"

  // *** STORES
  import { currentPost, currentArticles, menuActive } from "../stores.js"

  // *** VARIABLES
  let footnotePosts = []

  // !!! TODO: Extract the footnotes from the currently active article, to list at bottom
  // let a = flatMap(
  //     post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
  //   )
  // footnotePosts = a.filter(x => x._type === "footnote")

  const closeMenu = () => {
    if ($menuActive) {
      menuActive.set(false)
    }
  }
</script>

<!-- METADATA -->
<!-- !!! TODO: pass current active article as 'post' prop to set correct metadata -->
<MetaData/>

{#each $currentArticles as article, index}
  <div on:touchstart={closeMenu} class="article" id={article.slug.current}>
    <div
      class="col"
      class:zoomableSlideshowLayout={get(
        article,
        "zoomableSlideshowLayout",
        false
      )}
    >
      <!-- META -->
      <Meta
        title={get($currentPost, "title", "")}
        articleTitle={get(article, "title", "")}
        byline={get(article, "byline.content", [])}
        links={get(article, "links", [])}
      />

      <div class="block main">
        {@html renderBlockText(get(article, "content.content", []))}
      </div>

      <!-- FOOTNOTES -->
      <div class="footnotes">
        <ol>
          {#each footnotePosts as footnote}
            <li id={'note-' + footnote._key}>
              {#if isArray(get(footnote, 'content.content', false))}
                {@html renderBlockText(footnote.content.content)}
              {/if}
              <span
                on:click={e => {
                  const targetEl = document.querySelector('#link-' + footnote._key)
                  // console.log(targetEl)
                  if (targetEl) {
                    // console.log(targetEl.offsetTop)
                    window.scrollTo({
                      top: targetEl.offsetTop - 100,
                      left: 0,
                      behavior: 'smooth',
                    })
                  }
                }}
                class="back-link">(BACK)</span>
            </li>
          {/each}
        </ol>
      </div>

      {#if get(article, "zoomableSlideshowLayout", false)}
        <div class="block full">
          <Slideshow id={index} zoomable slides={get(article, "slideshow", [])} />
        </div>
      {/if}

      {#if index < $currentArticles.length - 1}
        <div
          class="block link next"
          class:full={get(article, "zoomableSlideshowLayout", false)}
          on:click|preventDefault={e => {
            window.location.replace(
              "#" + get($currentArticles[index + 1], "slug.current", null)
            )
          }}
          on:touchstart|preventDefault={e => {
            window.location.replace(
              "#" + get($currentArticles[index + 1], "slug.current", null)
            )
          }}
        >
          <h2 class="title next">
            Næste: {get($currentArticles[index + 1], "title", "")}
          </h2>
          <div class="graphic">
            <ArrowDown />
          </div>
        </div>
      {/if}
    </div>

    {#if !get(article, "zoomableSlideshowLayout", false)}
      <div class="col" class:slideshow={get(article, "slideshow", [])}>
        {#if get(article, "slideshow", [])}
          <Slideshow id={index} slides={get(article, "slideshow", [])} />
        {/if}
      </div>
    {/if}
  </div>
{/each}

<style lang="scss">
  @import "../variables.scss";

  .article {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-family: $sans-stack;
    display: flex;
    flex-flow: row nowrap;
    scroll-snap-align: start;

    @include screen-size ("phone") {
      height: calc(100vh - #{$menu_button_width});
      flex-flow: column nowrap;
      height: auto;
      overflow-y: auto;
    }

    .col {
      box-sizing: border-box;
      width: 50%;
      padding: $margin $margin / 4;
      height: 100%;
      overflow-y: scroll;

      @include screen-size("phone") {
        width: 100%;
      }

      &.zoomableSlideshowLayout {
        padding: $margin 0;
        width: 100%;
        display: flex;
        flex-flow: row wrap;

        :global(.block) {
          padding: 0 $margin / 4;
        }

        .block {
          width: 50%;
          box-sizing: border-box;

          @include screen-size("phone") {
            width: 100%;
          }

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

        &.next {
          display: block;

          @include screen-size("phone") {
            display: none;
          }
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
