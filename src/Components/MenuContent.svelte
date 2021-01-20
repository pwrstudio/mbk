<script>
  // # # # # # # # # # # # # #
  //
  //  MENU CONTENT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import ArrowDown from "./Graphics/ArrowDown.svelte"
  import { afterUpdate } from "svelte"
  import { renderBlockText, urlFor } from "../sanity.js"
  import { formattedDate } from "../global.js"
  import { isArray, has } from "lodash"

  // *** PROPS
  export let name, content

  // *** VARIABLES
  let el

  afterUpdate(() => {
    el.scrollTo(0, 0)
  })
</script>

<div class="bar-content menu-content" bind:this={el}>
  {#if name === "news" && isArray(content)}
    {#each content as block, index}
      <div class="news-item">
        <div class="header">
          <span>
            {@html formattedDate(block.publicationDate)}
          </span>
          <span>
            {block.location}
          </span>
        </div>
        {#if has(block, "mainImage.asset")}
          <img
            class="image"
            src={urlFor(block.mainImage.asset)
              .width(400)
              .quality(90)
              .auto("format")
              .url()}
          />
        {/if}
        {#if has(block, "content.content") && isArray(block.content.content)}
          <div class="paragraph">
            {@html renderBlockText(block.content.content)}
          </div>
        {/if}
        {#if index < content.length - 1}
          <div class="graphic">
            <ArrowDown />
          </div>
        {/if}
      </div>
    {/each}
  {:else if name === "about"}
    {#if has(content, "content.content") && isArray(content.content.content)}
      <div class="paragraph">
        {@html renderBlockText(content.content.content)}
        <!-- content content content -->
      </div>
    {/if}
  {:else if name === "colophon"}
    {#if has(content, "wideColumn.content") && isArray(content.wideColumn.content)}
      <div class="paragraph">
        {@html renderBlockText(content.wideColumn.content)}
      </div>
    {/if}
    {#if has(content, "logo.asset")}
      <img
        class="logo"
        src={urlFor(content.logo.asset)
          .width(400)
          .quality(90)
          .auto("format")
          .url()}
      />
    {/if}
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";
  @import "../sanity.scss";

  .menu-content {
    box-sizing: border-box;
    padding-bottom: $margin;
    flex-shrink: 1;
    overflow-y: scroll;
    scroll-snap-type: y proximity;
    font-size: $font_size_small;

    .logo {
      max-height: 80vh;
    }

    .image {
      width: 100%;
      mix-blend-mode: multiply;
    }

    .news-item {
      min-height: 100%;
      scroll-snap-align: start;

      .header {
        font-size: $font_size_small;
        border-top: $border_black;
        border-bottom: $border_black;
        padding-top: 4px;
        margin-bottom: $line-height;
      }
    }
  }
</style>
