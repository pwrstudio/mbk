<script>
  // # # # # # # # # # # # # #
  //
  //  MENU CONTENT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { afterUpdate } from 'svelte'
  import { renderBlockText, urlFor } from '../sanity.js'
  import { formattedDate } from '../global.js'
  import { isArray } from 'lodash' 

  // *** PROPS
  export let name, content

  // *** VARIABLES
  let el

  $: {
    // console.log(name, this)
  }

  afterUpdate(() => {
    console.log('afetr')
    console.log()
    el.parentElement.scrollTo(0,0)
  })

</script>

<style lang="scss">
  @import "../variables.scss";
  @import "../sanity.scss";

  .menu-content {
    padding-bottom: $margin;

    .paragraph {
      // 
    }

    .logo {
      max-height: 80vh;
    }

    .image {
      width: 100%;
      mix-blend-mode: multiply;
    }

    .news-item {
      .header {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        font-size: $font_size_small;
        border-top: $border_black;
        border-bottom: $border_black;
        padding-top: 4px;
        margin-bottom: $line-height;
      }

    }
  }
</style>

<div class="menu-content" bind:this={el}>
  {#if name === 'news' && isArray(content)}
    {#each content as block}
      <div class="news-item">
        <div class="header">
          <span>
            {@html formattedDate(block.publicationDate)}
          </span>
          <span>
            {block.location}
          </span>
        </div>
        <img
          class="image"
          src={urlFor(block.mainImage.asset).width(400).quality(90).auto('format').url()}
        >
        <div class="paragraph">
          {@html renderBlockText(block.content.content)}
        </div>
      </div>
    {/each}
  {:else if name === 'about'}
    <div class="paragraph">
      {@html renderBlockText(content.content.content)} <!-- content content content -->
    </div>
  {:else if name === 'colophon'}
    <div class="paragraph">
      {@html renderBlockText(content.wideColumn.content)}
    </div>
    <img
      class="logo"
      src={urlFor(content.logo.asset).width(400).quality(90).auto('format').url()}
    >
  {/if}
  <!-- {content.content.content} -->
</div>
