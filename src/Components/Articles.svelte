<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLES
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { navigate } from "svelte-routing"
  import { renderBlockText } from "../sanity.js"
  import ArrowDown from "./Graphics/ArrowDown.svelte"
  import get from "lodash/get"
  import flatMap from "lodash/flatMap"
  import isArray from "lodash/isArray"

  // *** COMPONENTS
  import MetaData from "./MetaData.svelte"
  import Slideshow from "./SlideShow.svelte"
  import Meta from "./Meta.svelte"

  // *** STYLES
  import "swiper/swiper-bundle.css"

  // *** STORES
  import { currentPost, currentArticles, menuActive, currentArticleSlug, currentIssueSlug } from "../stores.js"

  // Extract the footnotes from the currently active article, to list at bottom
  const extractFootnotes = mainContent => {
    let a = flatMap(
      mainContent.filter(c => c._type == "block").map(x => x.markDefs)
    )
    let footnotes = a.filter(x => x._type === "footnote")
    return footnotes
  }

  const closeMenu = () => menuActive.set($menuActive ? false : true)
</script>

<!-- METADATA -->
<MetaData />

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
      {#if get(article, "content.content", false) && extractFootnotes(article.content.content) }
        <div class="footnotes">
          <div class='footnotes-header'>NOTER</div>
          <ol>
            {#each extractFootnotes(article.content.content) as footnote}
              <li id={'note-' + footnote._key}>
                {@html renderBlockText(get(footnote, 'content.content', []))}
                <span class='back-link' on:click={e => {
                  let backLinkTarget = document.querySelector('#' + 'link-' + footnote._key)
                  console.log('backLinkTarget', backLinkTarget)
                  if(backLinkTarget) {
                    backLinkTarget.scrollIntoView({behavior: "smooth"});
                  }
                }}>↩</span>
              </li>
            {/each}
          </ol>
        </div>
      {/if}

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
            navigate('/' + $currentIssueSlug + '/' + get($currentArticles[index + 1], "slug.current", null))
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
      scroll-behavior: smooth;

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

  .article:last-child {
    margin-bottom: $menu_button_width * 2;
  }

  .footnotes {
    font-size: $font_size_small;
    padding-bottom: 4em;
    
    @include screen-size("phone") {
      padding-bottom: 0;
    }

    :global(p) {
      font-size: 16px;
      line-height: 20px;
      display: inline;
      margin-bottom: 0;
    }

    ol {
      li {
        padding-left: 20px;
        margin-bottom: 10px;
        // &:target {
        //   background: $light_green;
        // }
      }
    }
  }

  .footnotes-header {
    margin-left: 1em;
  }

  .back-link {
    cursor: pointer;
    font-size: 12px;
  }
</style>
