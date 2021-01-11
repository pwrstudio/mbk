<script>
  // # # # # # # # # # # # # #
  //
  //  MENU CONTENT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { renderBlockText } from '../sanity.js'
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
  }
</style>

<div class="menu-content">
  {#if name === 'news' && isArray(content)}
    {#each content as block}
      {block.location}
      {block.publicationDate}
      {@html renderBlockText(block.content.content)}
    {/each}
  {:else if name === 'about'}
    about
  {:else if name === 'colophon'}
    colo
  {/if}
  <!-- {content.content.content} -->
</div>
