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
  import ArrowDown from "./Graphics/ArrowDown.svelte"

  // *** STORES
  import { menuActive, menuItemActive, menuContent, tableOfContentActive } from "../stores.js"

  // *** CONSTANTS
  const queryNews = "*[_type == 'news']"
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

  .title {
    font-size: $font-size_normal;
    text-transform: uppercase;
    font-weight: normal;
  }

  .bar {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: $menu-width;
    transform: translateX((-1 * $menu-width) + $menu_button_width);
    line-height: $line-height;
    height: 100vh;
    z-index: 1000;
    overflow: auto;
    user-select: none;
    background: $green;
    padding: $margin;
    padding-right: $menu_button_width;
    font-family: $sans-stack;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    .bar-content {
      flex-shrink: 1;
      overflow-y: scroll;
    }

    .bar-menu {
      padding: 0;
      margin: 0;
      list-style-type: none;
      width: 100%;

      .graphic {
        width: 80px;
        margin: 0 auto 12px;
      }

      .bar-menu-item {
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
    }

    .bar-button {
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

      .title {
        display: inline-block;

        &.bottom {
          margin-bottom: -1 * $title_letter_spacing;
        }
      }
    }

    &.open {
      transition: transform 0.2s ease-out;
      transform: translate(0,0);
      // height: $line-height * 13;

      @include screen-size("small") {
        // height: $line-height * 16;
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

  // .menu {
  //   display: inline-block;
  //   width: 100%;
  //   padding-right: $margin;
  //   padding-left: $margin;
  //   font-size: 16px;
  //   z-index: 100;
  //   background: white;
  //   overflow: hidden;
  //   user-select: none;
  //   padding-top: $line-height;
  //   letter-spacing: 0.05em;
  //   line-height: $line-height;

  //   @include screen-size("small") {
  //     padding-right: $phone-margin;
  //     padding-left: $phone-margin;
  //   }

  //   .column {
  //     width: 100%;
  //     float: right;
  //     margin-bottom: $line-height;
  //     overflow-y: auto;
  //     position: relative;
  //   }

  //   .menu-item {
  //     font-family: $serif-stack;
  //     font-weight: bold;
  //     text-align: center;
  //     color: black;
  //     text-decoration: none;
  //     display: block;
  //     cursor: pointer;

  //     a,
  //     span {
  //       @include screen-size("small") {
  //         display: inline-block;
  //         padding-top: 4px;
  //         padding-bottom: 4px;
  //       }

  //       &:hover {
  //         color: $grey_solid;
  //       }

  //       &:active {
  //         color: $grey_solid;
  //       }
  //     }
  //   }
  // }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
  }
</style>

<div class="bar" use:links class:open={menuOpen}>

  <div class="bar-content">
    <MenuContent
      name={$menuItemActive}
      content={$menuContent}
    />
  </div>

  <ul class="bar-menu">
    <div class="graphic">
      <ArrowDown />
    </div>
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
