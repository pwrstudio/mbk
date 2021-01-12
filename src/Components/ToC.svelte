<script>
  // # # # # # # # # # # # # #
  //
  //  TABLE OF CONTENTS (ISSUE)
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"

  // *** STORES
  import { menuActive, tableOfContentActive } from "../stores.js"

  // *** VARIABLES
  let tocOpen = false

  $: {
    tableOfContentActive.set(tocOpen)
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .toc {
    margin-left: $menu_button_width;
    background: $grey_solid;

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

<div class="bar toc" use:links class:open={$tableOfContentActive} class:parentOpen={$menuActive}>
  <div class="bar-content">
    <h1 class="title">
      Hej
    </h1>
    <p>
      <a href="/">
        HOME
      </a>
    </p>
  </div>

  <div class="bar-button" on:click={e => tocOpen = !tocOpen}>
    <h1 class="title">
      INDHOLD
    </h1>
  </div>
</div>
