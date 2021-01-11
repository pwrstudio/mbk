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

  // *** DOM REFERENCES

  // *** VARIABLES
  let menuOpen = false

  $: {
    menuActive.set(menuOpen)
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .bar {
    position: fixed;
    top: 0;
    left: 50px;
    width: 50px;
    line-height: $line-height;
    height: 100vw;
    z-index: 1000;
    overflow: hidden;
    user-select: none;
    background: green;
    transition: height 0.2s ease-out;

    &.open {
      height: $line-height * 13;

      @include screen-size("small") {
        height: $line-height * 16;
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

  .menu {
    display: inline-block;
    width: 100%;
    padding-right: $margin;
    padding-left: $margin;
    font-size: 16px;
    z-index: 100;
    background: white;
    overflow: hidden;
    user-select: none;
    padding-top: $line-height;
    letter-spacing: 0.05em;
    line-height: $line-height;

    @include screen-size("small") {
      padding-right: $phone-margin;
      padding-left: $phone-margin;
    }

    .column {
      width: 100%;
      float: right;
      margin-bottom: $line-height;
      overflow-y: auto;
      position: relative;
    }

    .menu-item {
      font-family: $serif-stack;
      font-weight: bold;
      text-align: center;
      color: black;
      text-decoration: none;
      display: block;
      cursor: pointer;

      a,
      span {
        @include screen-size("small") {
          display: inline-block;
          padding-top: 4px;
          padding-bottom: 4px;
        }

        &:hover {
          color: $grey_solid;
        }

        &:active {
          color: $grey_solid;
        }
      }
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
  ToC

  <!-- <div
      class="hamburger"
      on:click={e => {
        menuOpen = !menuOpen
        searchActive = false
        searchInputValue = ''
      }}>
      {#if menuOpen}STÄNG{:else}MENY{/if}
    </div> -->
</div>
