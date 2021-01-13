<script>
  // # # # # # # # # # # # # #
  //
  //  MENU
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from "svelte-routing"
  import { loadData } from "../sanity.js"

  // *** COMPONENTS
  import MenuContent from "./MenuContent.svelte"

  // *** STORES
  import { menuActive, menuItemActive, menuContent, tableOfContentsActive } from "../stores.js"

  // *** CONSTANTS
  const queryNews = "*[_type == 'news'] | order(publicationDate desc)"
  const queryAbout = "*[_id == 'about']{...}[0]"
  const queryColophon = "*[_id == 'colophon']{...}[0]"
  const news = loadData(queryNews)
  const about = loadData(queryAbout)
  const colophon = loadData(queryColophon)

  const data = {}

  // *** VARIABLES
  let menuOpen = false

  $: {
    menuActive.set(menuOpen)
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

<style lang="scss">
  @import "../variables.scss";

  *::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
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
        content: '→';
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
      .title {
        display: inline-block;

        &.bottom {
          margin-bottom: -1 * $title_letter_spacing;
        }
      }
    }

    &.open {
      transform: translate(0,0);

      @include screen-size("small") {
      }
    }
  }

  .hamburger {
    cursor: pointer;
    float: right;
    margin-right: $margin;
    padding-top: $line-height;
    font-family: $display-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.05em;

    @include screen-size("small") {
      display: none;
    }

    &:hover {
      color: $grey_solid;
    }

    &:active {
      color: $grey_solid;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>

<div class="bar" use:links class:open={menuOpen}>

  <MenuContent
    name={$menuItemActive}
    content={$menuContent}
  />

  <ul class="bar-menu">
    <li
      class="bar-menu-item title"
      id="news"
      class:active={$menuItemActive === 'news'}
      on:click={updateMenuItem}
    >
      På IBK
    </li>
    <li
      class="bar-menu-item title"
      id="about"
      class:active={$menuItemActive === 'about'}
      on:click={updateMenuItem}
    >
      Om IBK
    </li>
    <li
      class="bar-menu-item title"
      id="colophon"
      class:active={$menuItemActive === 'colophon'}
      on:click={updateMenuItem}
    >
      Kolofon
    </li>
  </ul>

  <div class="bar-button" on:click={e => menuOpen = !menuOpen}>
    <h1 class="title">
      På IBK
    </h1>

    <h1 class="title bottom">
      Info
    </h1>
  </div>
</div>
