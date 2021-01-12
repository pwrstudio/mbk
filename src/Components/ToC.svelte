<script>
  // # # # # # # # # # # # # #
  //
  //  TABLE OF CONTENTS (ISSUE)
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"

  // *** STORES
  import { menuActive, tableOfContentsActive, tableOfContents } from "../stores.js"

  // *** VARIABLES
  let tocOpen = false

  $: {
    tableOfContentsActive.set(tocOpen)
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .toc {
    margin-left: $menu_button_width;
    padding-left: $margin / 2;
    background: $grey_solid;
    z-index: 999;

    &.open {
      transform: translateX(0);
    }

    &.parentOpen {
      transform: translateX(0);

      &.open {
        transform: translateX($menu_width - $menu_button_width);        
      }
    }

  }
</style>

<div class="bar toc" use:links class:open={$tableOfContentsActive} class:parentOpen={$menuActive}>

  {#if $tableOfContents}
    <ul class="bar-menu">
      {#each $tableOfContents as article}
        <li
          class="bar-menu-item title"
        >
          <a href={'#' + article.slug.current} on:click={e => { window.location.replace(e.target.href) }}>
            {article.title}
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  <a href="#no">
    Test
  </a>

  <div class="bar-button" on:click={e => tocOpen = !tocOpen}>
    <h1 class="title">
      INDHOLD
    </h1>
  </div>
</div>
