<script>
  // # # # # # # # # # # # # #
  //
  //  TABLE OF CONTENTS (ISSUE)
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"
  import get from "lodash/get"
  import isArray from "lodash/isArray"

  // *** STORES
  import {
      menuActive,
      tableOfContentsActive,
      hash,
      tableOfContentsActiveHash, // derived from hash
      tableOfContents
    } from "../stores.js"

  // *** VARIABLES
  let tocOpen = false

  $: {
    tableOfContentsActive.set(tocOpen)

    if (isArray($tableOfContents) && $hash === false) {
      goTo($tableOfContents[0])
    }
  }

  const goTo = article => {
    $menuActive = false
    $tableOfContentsActive = false
    $hash = get(article, 'slug.current', '')
    window.location.replace($tableOfContentsActiveHash)
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .toc {
    margin-left: $menu_button_width;
    padding-left: $margin / 2;
    background: $grey_solid;
    z-index: 999;

    .bar-button {
      justify-content: start;

      .title {
        margin-bottom: $title_letter_spacing;
      }
    }

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
      <li
        class="bar-menu-item title link"
        on:click={e => {window.location.replace('/')}}
      >
        TILBAGE TIL FORSIDE
      </li>
      {#each $tableOfContents as article, index}
        <li
          class="bar-menu-item title link"
          on:click={e => {goTo(article)}}
        >
          {`${index + 1}. `} {get(article, 'title', '')}
        </li>
      {/each}
    </ul>

    <div class="bar-button" on:click|self={e => tocOpen = !tocOpen}>
      <h1 class="title">
        <span on:click={e => tocOpen = !tocOpen}>
          INDHOLD
        </span>
      </h1>
      <h1 class="title">
        {#each $tableOfContents as article, index}
          <span
            class="articleNumber"
            class:active={$hash === get(article, 'slug.current', '')}
            on:click={e => {goTo(article)}}
          >
            {index + 1}
          </span>
        {/each}
      </h1>
    </div>
  </div>
{/if}
