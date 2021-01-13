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

  let goTo = article => {
    window.location.replace('#' + article.slug.current)
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

    .articleNumber {
      display: inline-block;
      height: $font_size_normal;
      width: auto;
      margin-bottom: $title_letter_spacing;

      &.active {
        border-bottom: $border_black;
      }
    }

  }
</style>

{#if $tableOfContents}
  <div class="bar toc" use:links class:open={$tableOfContentsActive} class:parentOpen={$menuActive}>

      <ul class="bar-menu">
        {#each $tableOfContents as article, index}
          <li
            class="bar-menu-item title link"
            on:click={e => {goTo(article)}}
          >
            {index === 0 ? "" : `${index}. `} {article.title}
          </li>
        {/each}
      </ul>

    <div class="bar-button" on:click={e => tocOpen = !tocOpen}>
      <h1 class="title">
        INDHOLD
        {#each $tableOfContents as article, index}
          {#if index > 0}
            <span
              class="articleNumber"
              class:active={window.location.href.includes(article.slug.current)}
              on:click={e => {goTo(article)}}
            >
              {index}
            </span>
          {/if}
        {/each}
      </h1>
    </div>
  </div>
{/if}
