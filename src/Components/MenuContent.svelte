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
  <!--      -->
  <!-- NEWS -->
  <!--      -->
  {#if name === "news" && isArray(content)}
    {#each content as block, index}
      <div class="news-item">
        <div class="header">
          <span>
            {#if block.publicationDate}
              {@html formattedDate(block.publicationDate)}
            {/if}
          </span>
          <span>
            {#if block.location}
              {block.location}
            {/if}
          </span>
        </div>
        {#if has(block, "mainImage.asset")}
          <img
            class="image"
            src={urlFor(block.mainImage.asset)
              .width(400)
              .quality(90)
              .saturation(-100)
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
  <!--       -->
  <!-- ABOUT -->
  <!--       -->
  {:else if name === "about"}
    {#if has(content, "content.content") && isArray(content.content.content)}
      <div class="paragraph">
        {@html renderBlockText(content.content.content)}
      </div>
    {/if}
  <!--          -->
  <!-- COLOPHON -->
  <!--          -->
  {:else if name === "colophon"}
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

    @include screen-size("phone") {
      margin-top: $margin / 4;
    }

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

    .narrow-cols {
      border-top: $border-black;
      margin-top: $margin_xs;
      padding-top: $margin_xs;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;

      :global(p.normal) {
        font-size: 10px;
        line-height: 16px;
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
</style>
