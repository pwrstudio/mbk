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
  import {
    currentPost,
    menuActive,
    tableOfContentsActive,
    newsExtended,
    extendedPost,
  } from "../stores.js"

  // *** PROPS
  export let location
  export let params = false
  export let singleNews = false

  // *** CONSTANTS
  const query = "*[_type == 'issue'] | order(publicationDate)"
  const issues = loadData(query)

  currentPost.set(false)

  let vw = window.innerWidth

  onDestroy(() => {
    menuActive.set(false)
    tableOfContentsActive.set(false)
    newsExtended.set(false)
    extendedPost.set({})
  })

  const closeMenu = () => {
    if ($menuActive) {
      menuActive.set(false)
    }
  }
</script>

<svelte:window bind:innerWidth={vw} />

{#await issues then issues}
  <div class="menus">
    <Menu
      landing={true}
      singleNews={singleNews && params["*"] ? params["*"] : false}
    />
  </div>

  {#if vw < 768 && $menuActive}
    <div class="pseudo" on:click|preventDefault={closeMenu} />
  {/if}

  <div class="landing" use:links>
    <CoverSlider issues={issues.reverse()} />
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

  .pseudo {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    top: 0;
    left: 0;
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
