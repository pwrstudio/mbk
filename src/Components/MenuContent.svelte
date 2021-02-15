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
  import { isArray, get, has } from "lodash"

  // *** PROPS
  export let name, content

  // *** VARIABLES
  let el, vh, vw

  afterUpdate(() => {
    el.scrollTo(0, 0)
  })
</script>

<svelte:window bind:innerHeight={vh} bind:innerWidth={vw} />

<div class="bar-content menu-content" bind:this={el}>
  <!--      -->
  <!-- NEWS -->
  <!--      -->
  {#if name === "news" && isArray(content)}
    <!-- LOGO -->
    <div class='kadk-logo'>
      <img src='/img/logo.svg'/>
    </div>
    {#each content as block, index}
      <div class="news-item" id={block.slug.current}>
        <div class="content" style="min-height: {vw >= 768 ? vh - 200 + 'px' : 'auto'}">
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
        </div>
        {#if index < content.length - 1}
          <div class="nav" on:click={() => {
            console.log('click')
            window.location.replace(
              "#" + get(content[index + 1], "slug.current", null)
            )
          }
          }>
            <div class="graphic">
              <ArrowDown />
            </div>
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

    .nav {
      background-color:$green;
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
      width: 100%;
      mix-blend-mode: multiply;
    }

    .news-item {
      width: 100%;
      min-height: 100%;
      padding-bottom: $margin * 2;

      @include screen-size("medium") {
      }

      .header {
        font-size: $font_size_small;
        border-top: $border_black;
        border-bottom: $border_black;
        padding-top: 4px;
        margin-bottom: $margin_xs;
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
</style>
