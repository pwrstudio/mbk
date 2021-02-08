<script>
  // # # # # # # # # # # # # #
  //
  //  TABLE OF CONTENTS (ISSUE)
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links, navigate } from "svelte-routing"
  import get from "lodash/get"
  import isArray from "lodash/isArray"
  import { goTo } from '../global'

  // *** STORES
  import {
      tableOfContentsActiveHash, // derived from hash
      tableOfContentsActive,
      tableOfContents,
      menuActive,
      hash
    } from "../stores.js"

  // *** VARIABLES
  let vw = window.innerWidth
  let ih = window.innerHeight

  const toggleToC = () => {
    console.log('toggle')
    tableOfContentsActive.set(!$tableOfContentsActive)
    if (vw < 768 && $tableOfContentsActive && $menuActive) {
      menuActive.set(false)
    }
  }

</script>

<!--                 -->
<!-- WINDOW BINDINGS -->
<!--                 -->

<svelte:window bind:innerWidth={vw} bind:innerHeight={ih}/>

{#if $tableOfContents}
  <div
    class="bar toc"
    class:open={$tableOfContentsActive}
    class:parentOpen={$menuActive}
    style="height: {ih + 'px'};"
  >
    <ul
      class="bar-menu"
      use:links
    >
      <li
        class="bar-menu-item title link"
        on:click={e => {
            navigate('/')
          }
        }
        on:touchstart={e => {window.location.replace('/')}}
      >
        TILBAGE TIL FORSIDE
      </li>
      {#each $tableOfContents as article, index}
        <li
          class="bar-menu-item title link"
          class:active={$hash === get(article, 'slug.current', '')}
          on:click={e => {goTo(get(article, 'slug.current', ''))}}
          on:touchstart={e => {goTo(get(article, 'slug.current', ''))}}
        >
          {`${index + 1}. `} {get(article, 'title', '')}
        </li>
      {/each}
    </ul>

    {#if vw < 768}
      <div
        class="bar-button"
        on:touchstart={toggleToC}
      >
        <h1 class="title indhold">
          <span>
            INDHOLD
          </span>
        </h1>
        <h1 class="title">
          {#each $tableOfContents as article, index}
            <span
              class="articleNumber"
              class:active={$hash === get(article, 'slug.current', '')}
              on:click={e => {goTo(get(article, 'slug.current', ''))}}
              on:touchstart={e => {goTo(get(article, 'slug.current', ''))}}
            >
              {index + 1}
            </span>
          {/each}
        </h1>
      </div>
    {:else}
      <div
        class="bar-button"
      >
        <h1 class="title indhold" on:click={toggleToC}>
          <span>
            INDHOLD
          </span>
        </h1>
        <h1 class="title">
          {#each $tableOfContents as article, index}
            <span
              class="articleNumber"
              class:active={$hash === get(article, 'slug.current', '')}
              on:click={e => {goTo(get(article, 'slug.current', ''))}}
              on:touchstart={e => {goTo(get(article, 'slug.current', ''))}}
            >
              {index + 1}
            </span>
          {/each}
        </h1>
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "../variables.scss";

  .toc {
    margin-left: $menu_button_width;
    padding-left: $margin / 2;
    background: $grey_solid;
    z-index: 999;

    @include screen-size("phone") {
      margin-left: unset;
      padding-left: unset;
      width: 100%;
      transform: translateY(100%) translateY(-2 * $menu_button_width);
      height: auto;
      padding: $margin $margin / 4 0;
    }

    .bar-button {
      justify-content: start;

      .title {
        margin-bottom: $title_letter_spacing;

        &:not(.indhold) {
          @include screen-size("phone") {
            display: none;
          }
        }

        &.indhold {
          @include screen-size("phone") {
            text-align: center;
            width: 100%;
          }
        }
      }
    }

    &.open {
      transform: translateX(0);

      @include screen-size("phone") {
        transform: translateY(0);
      }
    }

    &.parentOpen {
      transform: translateX(0);

      &.open {
        transform: translateX($menu_width - $menu_button_width);
      }

      @include screen-size('phone') {
        &.open {
          transform: translateX(0);
        }
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