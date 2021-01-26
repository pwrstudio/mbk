<script>
  // # # # # # # # # # # # # #
  //
  //  MENU
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"
  import { loadData } from "../sanity.js"

  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"

  // *** COMPONENTS
  import MenuContent from "./MenuContent.svelte"

  // *** STORES
  import {
    menuActive,
    menuItemActive,
    menuContent,
    tableOfContentsActive,
  } from "../stores.js"

  // *** CONSTANTS
  const queryNews = "*[_type == 'news'] | order(publicationDate desc)"
  const queryAbout = "*[_id == 'about']{...}[0]"
  const queryColophon = "*[_id == 'colophon']{...}[0]"
  const news = loadData(queryNews)
  const about = loadData(queryAbout)
  const colophon = loadData(queryColophon)
  const { activeRoute } = getContext(ROUTER)
  const data = {}

  // *** PROPS
  export let landing = false

  // *** VARIABLES
  let menuOpen = landing
  let pvw = 0
  let vw = 0

  $: {
    // $activeRoute will change on navigation
    // 
    // 
    if ($activeRoute.uri === '/') {
      if (vw < 768) {
        menuOpen = false
      }
    }

    // Switch the menu to off if the vw is mobile size
    // 
    // 
    if (landing) {
      if (pvw >= 768 && vw < 768) {
        menuOpen = false
      } else if (pvw < 768 && vw >= 768) {
        menuOpen = true
      }
    }

    // Set previous vw to current vw
    // 
    // 
    pvw = vw
  }

  news.then(news => {
    data.news = news
    $menuContent = data.news
  })

  about.then(about => {
    data.about = about
  })

  colophon.then(colophon => {
    data.colophon = colophon
  })

  // *** FUNCTIONS
  const updateMenuItem = e => {
    $menuItemActive = e.currentTarget.id
    $menuContent = data[e.currentTarget.id]
  }
</script>

<svelte:window bind:innerWidth={vw}/>

<!--              -->
<!-- DESKTOP MENU -->
<!--              -->

<div class="bar" use:links class:open={menuOpen}>
  {#if vw > 768}
    <MenuContent name={$menuItemActive} content={$menuContent} />
  {/if}

  <ul class="bar-menu">
    <li
      class="bar-menu-item title"
      id="news"
      class:active={$menuItemActive === "news"}
      on:click={updateMenuItem}
    >På IBK</li>
    <li
      class="bar-menu-item title"
      id="about"
      class:active={$menuItemActive === "about"}
      on:click={updateMenuItem}
    >Om IBK</li>
    <li
      class="bar-menu-item title"
      id="colophon"
      class:active={$menuItemActive === "colophon"}
      on:click={updateMenuItem}
    >Kolofon</li>
  </ul>

  <div
    class="bar-button"
    class:disabled={landing && vw > 768}
    on:click={e => {
      if (!landing || vw < 768) {
        menuOpen = !menuOpen
      }
    }}
  >
    <h1 class="title">På IBK</h1>
    <h1 class="title bottom">Info</h1>
    <h1 class="title hamburger">
      <div class="hamburger-cross-icon" class:open={menuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </h1>
  </div>
</div>
<!--                  -->
<!-- END DESKTOP MENU -->
<!--                  -->


      <!-- 
  ***   🐸   ***
  *** styles ***
  ***   🐸   ***
      !-->

<style lang="scss">
  @import "../variables.scss";

  *::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /*
    Shared with Table of Content
  */
  :global(.bar) {
    z-index: 1000;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: $menu-width;
    line-height: $line-height;
    height: 100vh;
    overflow: auto;
    padding: $margin;
    padding-right: $menu_button_width;
    font-family: $sans-stack;
    font-size: $font_size_small;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    transition: transform 0.2s ease-out;
    user-select: none;
    transform: translateX((-1 * $menu-width) + $menu_button_width);

    @include screen-size("phone") {
      transform: translateY(calc(100% - #{$menu_button_width}));
      bottom: 0;
      width: 100vw;
    }
  }

  :global(.bar-button) {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
    padding: $margin 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    letter-spacing: $title_letter_spacing;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    cursor: pointer;
    width: $menu_button_width;

    @include screen-size("phone") {
      padding: 0 $margin;
      width: 100%;
      height: $menu_button_width;
      writing-mode: horizontal-tb;
      text-orientation: upright;
      align-items: flex-start;
    }
  }

  :global(.bar-menu) {
    padding: 0;
    margin: 0;
    list-style-type: none;
    width: 100%;
  }

  :global(.graphic) {
    width: 80px;
    margin: 0 auto 12px;
  }

  :global(.bar-menu-item) {
    margin: 0;
    padding: 16px 0 12px;
    border-top: $border_black;
    cursor: pointer;

    &.active {
      &:before {
        content: "→";
        margin-right: 10px;
      }
    }

    &:last-child {
      border-bottom: $border_black;
    }
  }

  .bar {
    background: $green;

    :global(p.normal) {
      font-size: $font_size_small;
      line-height: $line-height_small;
    }

    .bar-button {
      .title:not(.title.hamburger) {
        display: inline-block;
        justify-self: flex-start;

        @include screen-size("phone") {
          display: none;
        }

        &.bottom {
          margin-bottom: -1 * $title_letter_spacing;
        }
      }
    }

    &.open {
      transform: translate(0, 0);

      @include screen-size("phone") {
        transform: translate(0, 0);
      }
    }
  }

  .hamburger {
    display: none;
    
    @include screen-size("phone") {
      width: 100%;
      color: inherit;
      text-decoration: none;
      font-weight: 900;
      letter-spacing: 0.05em;
      text-align: right;
      display: inline-block;

      &:hover {
        color: $grey_solid;
      }

      &:active {
        color: $grey_solid;
      }
    }

    .hamburger-cross-icon {
      width: 32px;
      margin-top: 2px;
      margin-right: -8px;
      position: relative;
      float: right;
      // margin: 50px auto;
      transform: rotate(0deg);
      transition: .5s ease-in-out;

      span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: $black;
        // border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;

        &:nth-child(1) {
          top: 0px;
          transform-origin: left center;
        }

        &:nth-child(2) {
          top: 9px;
          transform-origin: left center;
        }

        &:nth-child(3) {
          top: 18px;
          transform-origin: left center;
        }
      }

      &.open {
        span:nth-child(1) {
          transform: rotate(45deg);
          // top: 0;
          // left: 0;
        }

        span:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        span:nth-child(3) {
          transform: rotate(-45deg);
          top: 22px;
          left: 0;
        }
      } 
    }

  }
</style>
