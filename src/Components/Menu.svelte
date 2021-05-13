<script>
  // # # # # # # # # # # # # #
  //
  //  MENU
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"
  import { loadData } from "../sanity.js"

  import { getContext, onMount, afterUpdate } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"

  // *** COMPONENTS
  import MenuContent from "./MenuContent.svelte"
  import MailingListForm from "./MailingListForm.svelte"

  // *** STORES
  import {
    menuActive,
    menuItemActive,
    menuContent,
    tableOfContentsActive,
    newsExtended,
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
  let title = ""
  let pvw = 0
  let vw = window.innerWidth
  let ih = window.innerHeight

  $: {
    if (landing) {
      if (vw > 768 && !$menuActive) {
        menuActive.set(true)
        menuItemActive.set("news")
      }
    }

    if ($menuItemActive) {
      let currentData = data[$menuItemActive]

      if (currentData) {
        if (currentData.title) {
          title = currentData.title
        } else {
          title = "KORT NYT"
        }
      }
    }
  }

  const toggleMenu = () => {
    console.log("TOGGLE")
    menuActive.set(!$menuActive)
    newsExtended.set(false)

    if (vw < 768 && $tableOfContentsActive && $menuActive) {
      tableOfContentsActive.set(false)
    }

    if ($menuActive && vw >= 768) {
      if (!$menuItemActive) {
        menuItemActive.set("news")
      }
    }

    if (!$menuActive) {
      menuItemActive.set(null)
    }
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

  afterUpdate(() => {
    if (pvw < 768 && vw >= 768) {
      menuActive.set(true)
    }
    pvw = vw
  })

  onMount(() => {
    // $activeRoute will change on navigation
    //
    //
    if ($activeRoute.uri === "/") {
      if (vw < 768) {
        menuActive.set(false)
      }
    }

    // Switch the menu to off if the vw is mobile size
    //
    //
    if (landing) {
      if (pvw >= 768 && vw < 768) {
        menuActive.set(false)
      } else if (pvw < 768 && vw >= 768) {
        menuActive.set(true)
      }
    }

    // Set previous vw to current vw
    //
    //
    pvw = vw
  })
</script>

<!--                 -->
<!-- WINDOW BINDINGS -->
<!--                 -->

<svelte:window bind:innerWidth={vw} bind:innerHeight={ih} />

<div
  class="bar"
  class:open={$menuActive}
  class:peek={!$menuItemActive && vw < 768}
  class:single={!landing}
  class:extended={$newsExtended}
  style="height: {ih + 'px'};"
  use:links
>
  <!--              -->
  <!-- DESKTOP MENU -->
  <!--              -->

  {#if vw > 768}
    <!-- CONTENT -->
    <MenuContent name={$menuItemActive} content={$menuContent} />
    <!-- BUTTON -->
    <div
      class="bar-button"
      class:disabled={landing && vw > 768}
      on:click={e => {
        if ($newsExtended) {
          newsExtended.set(false)
        } else if (landing === false && vw > 768) {
          toggleMenu()
        }
      }}
    >
      <h1 class="title">Kort nyt</h1>
      <h1 class="title bottom">Info</h1>
    </div>
  {/if}

  <!--        -->
  <!-- SHARED -->
  <!--        -->

  {#if !$newsExtended}
    <ul class="bar-menu" class:hidden={$menuItemActive !== null && vw <= 768}>
      <li
        class="bar-menu-item title"
        id="news"
        class:active={$menuItemActive === "news"}
        on:click={updateMenuItem}
      >
        På Instituttet
      </li>
      <li
        class="bar-menu-item title"
        id="about"
        class:active={$menuItemActive === "about"}
        on:click={updateMenuItem}
      >
        Om magasinet
      </li>
      <li
        class="bar-menu-item title"
        id="colophon"
        class:active={$menuItemActive === "colophon"}
        on:click={updateMenuItem}
      >
        Kolofon
      </li>
    </ul>

    <div class="newsletter-signup">
      <MailingListForm />
    </div>
  {/if}

  <!--             -->
  <!-- MOBILE MENU -->
  <!--             -->

  {#if vw <= 768}
    <!-- CONTENT -->
    <div class="mobile-content">
      <!-- ACTUAL CONTENT -->
      <MenuContent name={$menuItemActive} content={$menuContent} />
      <!-- TITLE -->
      <div
        on:click|preventDefault={() => {
          menuItemActive.set(null)
        }}
        class="ticker"
      >
        <div class="title">
          {title}
        </div>
      </div>
    </div>
    <!-- BUTTON -->
    <div class="bar-button" on:click|preventDefault={toggleMenu}>
      <h1 class="title hamburger">
        <div class="hamburger-cross-icon" class:open={$menuActive}>
          <span />
          <span />
          <span />
        </div>
      </h1>
    </div>
  {/if}
</div>

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
    width: $extended-menu_width;
    line-height: $line-height;
    overflow: auto;
    padding: $margin;
    padding-right: $menu_button_width;
    padding-left: calc(#{$menu-difference} + 42px);
    padding-bottom: 32px;
    font-family: $sans-stack;
    font-size: $font_size_small;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    transition: transform 0.2s ease-out;
    user-select: none;
    transform: translateX((-1 * $extended-menu-width) + $menu_button_width);

    @include screen-size("phone") {
      bottom: 0;
      transform: translateY(calc(100% - #{$menu_button_width}));
      width: 100vw;
      padding: $menu_button_width $margin / 4 0;
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
    width: $menu_button_width;
    cursor: pointer;

    @include screen-size("phone") {
      padding: 0 $margin / 4;
      width: 100%;
      height: $menu_button_width;
      writing-mode: horizontal-tb;
      text-orientation: upright;
      align-items: flex-start;
    }
  }

  :global(.bar-button .title) {
    cursor: pointer;
  }

  :global(.bar-menu) {
    padding: 0;
    margin: 0;
    list-style-type: none;
    // width: $menu_width;
    z-index: 10;
    // padding-bottom: 42px;
  }

  :global(.bar-menu:not(.t-o-c)) {
    box-shadow: 0px -20px 20px $green;
    @include screen-size("phone") {
      box-shadow: unset;
    }
  }

  :global(.bar-menu.hidden) {
    display: none;
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

    .bar-menu-item {
      &:last-child {
        @include screen-size("small") {
          border-bottom: none;
        }
      }
    }

    .mobile-content {
      max-height: 100%;
      display: flex;
      flex-flow: row;
      margin-right: -1 * $margin_xs; // hacky

      .ticker {
        min-width: $margin;
        position: relative;

        .title {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, 0);
          display: block;
          margin: 0 auto;
          padding: $margin 0;
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: $title_letter_spacing;
        }
      }
    }

    &.open {
      transform: translate(-$menu-difference, 0);

      &.peek {
        transform: translate(0, calc(100% - #{$menu_items_height})) !important;
      }

      @include screen-size("phone") {
        transform: translate(0, 0);
      }

      &.single {
        @include screen-size("phone") {
          transform: translate(0, $menu_button_width);
        }
      }
    }

    &.extended {
      transform: translate(0, 0);
      padding-left: 42px;
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
      position: relative;
      float: right;
      transform: rotate(0deg);
      // transition: 0.5s ease-in-out;

      span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: $black;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        // transition: 0.25s ease-in-out;

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
        transform: translateX(8px);

        span:nth-child(1) {
          transform: rotate(45deg);
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

  .newsletter-signup {
    margin: 0;
    padding-top: 3px;
    border-top: $border_black;
    // width: $menu_width;
  }
</style>
