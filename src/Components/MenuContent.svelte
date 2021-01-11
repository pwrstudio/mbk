<script>
  // # # # # # # # # # # # # #
  //
  //  MENU CONTENT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { renderBlockText, urlFor } from '../sanity.js'
  import { formattedDate } from '../global.js'
  import { isArray } from 'lodash' 

  // *** PROPS
  export let name, content

  $: {
    console.log(content)
  }

</script>

<style lang="scss">
  @import "../variables.scss";

  .menu-content {
    padding-right: $margin / 2;

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

<div class="menu-content">
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
        {@html renderBlockText(block.content.content)}
      </div>
    {/each}
  {:else if name === 'about'}
    about
  {:else if name === 'colophon'}
    colo
  {/if}
  <!-- {content.content.content} -->
</div>
