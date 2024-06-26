<script>
  // # # # # # # # # # # # # #
  //
  //  MENU CONTENT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS

  import { afterUpdate } from "svelte"
  import { renderBlockText, urlFor } from "../sanity.js"
  import { formattedDate } from "../global.js"
  import { isArray, get, has } from "lodash"

  // *** COMPONENTS
  import ArrowDown from "./Graphics/ArrowDownSmall.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  import Share from "./Share.svelte"

  // *** STORES
  import {
    newsExtended,
    extendedPost,
    tableOfContentsActive,
    menuItemActive,
    menuContent,
  } from "../stores.js"

  // *** PROPS
  export let name, content

  // *** VARIABLES
  let el
  let vh
  let vw

  afterUpdate(() => {
    el.scrollTo(0, 0)
  })

  // !!!!! HACK
  menuItemActive.set("news")

  // $: console.log("menu-content", name, $menuItemActive, content)

  // $: console.log($extendedPost)

  // $: console.log($newsExtended)

  const closeExtendedNews = () => {
    let targetNewsItem = $extendedPost.slug.current
    extendedPost.set({})
    newsExtended.set(false)
    window.setTimeout(() => {
      let targetNewsItemEl = document.querySelector(`#${targetNewsItem}`)
      if (targetNewsItemEl) {
        targetNewsItemEl.scrollIntoView({
          block: "start",
        })
      }
    }, 200)
  }
</script>

<svelte:window bind:innerHeight={vh} bind:innerWidth={vw} />

<div
  class="bar-content menu-content"
  class:extended={$newsExtended}
  bind:this={el}
>
  <!--      -->
  <!-- NEWS -->
  <!--      -->
  {#if $menuItemActive === "news" && isArray($menuContent)}
    <!-- LOGO -->
    {#if $newsExtended}
      <div class="news-item">
        <div class="close-extended" on:click={closeExtendedNews}>
          <ArrowLeft />
        </div>
        <div class="content">
          {#if has($extendedPost, "mainImage.asset")}
            <img
              class="image"
              alt={$extendedPost.title}
              src={urlFor($extendedPost.mainImage.asset)
                .width(400)
                .quality(90)
                .saturation(-100)
                .auto("format")
                .url()}
            />
          {/if}
          <!-- HEADER -->
          <div class="header">
            <!-- TITLE -->
            <span>
              {$extendedPost.title}
            </span>
            <!-- PUBLICATION DATE -->
            <span>
              {#if $extendedPost.publicationDate}
                {@html formattedDate($extendedPost.publicationDate)}
              {/if}
            </span>
          </div>
          <!-- SHARE -->
          <div class="share">
            <!-- SHARING-->
            <Share
              articleTitle={$extendedPost.title}
              articleSlug={$extendedPost.slug.current}
              issueSlug={"nyhed"}
            />
          </div>
          <!-- CONTENT -->
          {#if has($extendedPost, "extendedContent.content") && isArray($extendedPost.extendedContent.content)}
            <div class="paragraph">
              {@html renderBlockText($extendedPost.extendedContent.content)}
            </div>
          {:else if has($extendedPost, "content.content") && isArray($extendedPost.content.content)}
            <div class="paragraph">
              {@html renderBlockText($extendedPost.content.content)}
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div class="kadk-logo">
        <img alt="logo" src="/img/logo.svg" />
      </div>
      {#each content as block, index}
        <div class="news-item" id={block.slug.current}>
          <div
            class="content"
            style="min-height: {vw >= 768 ? vh - 200 + 'px' : 'auto'}"
          >
            {#if has(block, "mainImage.asset")}
              <img
                class="image"
                alt={block.title}
                src={urlFor(block.mainImage.asset)
                  .width(400)
                  .quality(90)
                  .saturation(-100)
                  .auto("format")
                  .url()}
              />
            {/if}
            <!-- HEADER -->
            <div class="header">
              <!-- TITLE -->
              <span>
                {block.title}
              </span>
              <!-- PUBLICATION DATE -->
              <span>
                {#if block.publicationDate}
                  {@html formattedDate(block.publicationDate)}
                {/if}
              </span>
            </div>
            <!-- CONTENT -->
            {#if has(block, "content.content") && isArray(block.content.content)}
              <div class="paragraph">
                {@html renderBlockText(block.content.content)}
              </div>
            {/if}
            <!-- READ-MORE -->
            <!-- {#if block.extendedView} -->
            <div
              class="read-more"
              on:click={e => {
                extendedPost.set(block)
                tableOfContentsActive.set(false)
                newsExtended.set(true)
              }}
            >
              <ArrowRight />
            </div>
            <!-- SCROLL-DOWN -->
            <!-- {:else}
              <div
                class="scroll-down"
                on:click={e => {
                  window.location.replace(
                    "#" + get(content[index + 1], "slug.current", null)
                  )
                }}
              >
                <ArrowDown />
              </div>
            {/if} -->
          </div>
        </div>
      {/each}
    {/if}
    <!--       -->
    <!-- ABOUT -->
    <!--       -->
  {:else if $menuItemActive === "about"}
    {#if has(content, "content.content") && isArray(content.content.content)}
      <div class="paragraph">
        {@html renderBlockText(content.content.content)}
      </div>
    {/if}
    <!--          -->
    <!-- COLOPHON -->
    <!--          -->
  {:else if $menuItemActive === "colophon"}
    <div id="colophon-bottom" class="news-item">
      <div class="content">
        {#if has(content, "wideColumn.content") && isArray(content.wideColumn.content)}
          <div class="paragraph">
            {@html renderBlockText(content.wideColumn.content)}
          </div>
        {/if}
        <div class="narrow-cols">
          {#if has(content, "firstNarrowColumn.content") && isArray(content.firstNarrowColumn.content)}
            <div class="narrow-col">
              {@html renderBlockText(content.firstNarrowColumn.content)}
            </div>
          {/if}
          {#if has(content, "secondNarrowColumn.content") && isArray(content.secondNarrowColumn.content)}
            <div class="narrow-col">
              {@html renderBlockText(content.secondNarrowColumn.content)}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";
  @import "../sanity.scss";

  .menu-content {
    box-sizing: border-box;
    padding-bottom: 0;
    flex-shrink: 1;
    overflow-y: scroll;
    font-size: $font_size_small;
    width: 100%;
    float: right;

    .nav {
      background-color: red;
      height: $margin * 1.5;
      position: sticky;
      bottom: 0;
      margin: 0;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .graphic {
        margin: 0;
      }
    }

    @include screen-size("phone") {
      margin-top: $margin / 4;
    }

    .logo {
      max-height: 80vh;
    }

    .image {
      max-width: 100%;
      mix-blend-mode: multiply;
      max-height: 260px;
    }

    .news-item {
      // width: 100%;
      position: relative;
      min-height: 100%;
      padding-bottom: $margin * 2;

      @include screen-size("medium") {
      }

      .content {
        background: $green;
      }

      .header {
        font-size: $font_size_small;
        border-top: $border_black;
        border-bottom: $border_black;
        padding-top: 4px;
        margin-bottom: $margin_xs;
      }
    }

    &.extended {
      .image {
        mix-blend-mode: unset;
        max-height: 500px;
        width: 100%;
        object-fit: cover;
      }

      .share {
        float: right;
        padding-left: 10px;
      }

      .news-item {
        padding-left: 42px;

        .close-extended {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 42px;
          cursor: pointer;
        }
      }
    }

    .narrow-cols {
      border-top: $border-black;
      margin-top: $margin_xs;
      padding-top: $margin_xs;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;

      :global(p.normal) {
        font-size: 10px;
        line-height: 14px;
      }

      :global(.image) {
        width: 100%;
        margin: 0;
      }

      :global(.image img) {
        height: 16px * 5;
      }

      .narrow-col {
        width: 50%;
      }
    }
  }

  .kadk-logo {
    width: 100%;
    margin-bottom: $margin_xs;
    img {
      display: block;
      width: 100%;
    }
  }

  .read-more {
    width: 20px;
    height: 42px;
    // background: red;
    cursor: pointer;
  }

  .scroll-down {
    width: 42px;
    height: 20px;
    // background: red;
    cursor: pointer;
  }
</style>
