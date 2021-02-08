<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onDestroy } from "svelte"
  import { loadData } from "../sanity.js"
  import { links } from "svelte-routing"

  // *** COMPONENTS
  import CoverSlider from "../Components/CoverSlider.svelte"
  import Menu from "../Components/Menu.svelte"

  // *** STORES
  import { currentPost, menuActive, tableOfContentsActive } from "../stores.js"

  // *** PROP
  export let location

  // *** CONSTANTS
  const query = "*[_type == 'issue'] | order(publicationDate)"
  const issues = loadData(query)

  currentPost.set(false)

  onDestroy (() => {
    menuActive.set(false)
    tableOfContentsActive.set(false)
  })
</script>

{#await issues then issues}
  <div class="menus">
    <Menu landing={true} />
  </div>

  <div class="landing" use:links>
    <CoverSlider {issues} />
  </div>
{/await}

<style lang="scss">
  @import "../variables.scss";

  :local(body) {
    background-color: $grey_solid;
  }

  :global(.title) {
    text-transform: uppercase;
    font-weight: normal;
    font-size: inherit;
  }

  .landing {
    background: $grey_solid;
    width: calc(100% - #{$menu_width});
    height: 100%;
    position: relative;
    float: right;
    transition: width 0.2s ease-out;

    @include screen-size("phone") {
      height: calc(100% - #{$menu_button_width});
      width: 100vw;
      overflow: hidden;
    }
  }

  .menus {
    position: fixed;
    top: 0;
    transform: translateX(0);
    transition: transform 0.8s ease;
    z-index: 10000000000;

    &.hide {
      transform: translateX(-2 * $menu_button_width);
    }
  }
</style>
