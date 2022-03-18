<script>
  // # # # # # # # # # # # # #
  //
  //  MBK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount } from "svelte"
  import { Router, Route, Link } from "svelte-routing"
  // COMPONENTS
  import Landing from "./Routes/Landing.svelte"
  import Single from "./Routes/Single.svelte"
  import Error404 from "./Routes/Error404.svelte"

  // import smoothscroll from 'smoothscroll-polyfill'

  let ih

  $: {
    // Set the body to innerHeight, the visible part of the window height
    document.documentElement.style.height = ih + "px"
    document.body.style.height = ih + "px"
  }

  onMount(() => {
    // kick off the polyfill!
    // smoothscroll.polyfill();
  })
</script>

<svelte:window bind:innerHeight={ih} />

<Router>
  <!-- LANDING -->
  <Route path="/" component={Landing} />
  <!-- SINGLE -->
  <Route path="/*" let:params>
    <Single {params} />
  </Route>
  <!-- 404 -->
  <Route component={Error404} />
</Router>

<style lang="scss" global>
  @import "./variables.scss";

  :global(*) {
    @include hide-scroll;
    &::selection {
      background: rgba(230, 230, 230, 1);
    }
    &::-moz-selection {
      background: rgba(230, 230, 230, 1);
    }
  }

  :global(body) {
    overflow-y: hidden;

    @include screen-size("phone") {
      overflow-y: scroll;
    }
  }

  :global(body) {
    font-size: font_size_normal;
    line-height: line-height;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    overscroll-behavior: none;
  }

  :global(video) {
    width: 100%;
  }

  :global(a),
  :global(.link) {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  :global(p.normal) {
    font-size: $font_size_normal;
    line-height: $line-height;
    margin-top: 0;
  }

  :global(p.h1) {
    font-size: inherit;
    text-transform: uppercase;
    margin-top: 0;
  }

  :global(.header) {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }

  :global(.article) {
    counter-reset: fnoteCounter;
  }

  :global(.footnote-link) {
    counter-increment: fnoteCounter;
    color: inherit;
    text-decoration: none !important;

    &:after {
      // vertical-align: super;
      position: relative;
      top: -6px;
      font-family: $sans-stack;
      font-size: $font_size_small;
      // background: yellow;
      // font-size: 0.8em;
      line-height: $line-height;
      content: "(" counter(fnoteCounter) ")";
      padding-left: 4px;
    }

    &:hover {
      text-decoration: underline !important;
    }

    // &:target {
    //   background: $yellow;
    // }
  }

  :global(figure) {
    width: $text_width;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: $font_size_small;
    line-height: $line-height;
    font-family: $sans-stack;
    margin-bottom: $line-height;
    margin-top: $line-height;

    .embed-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 720px;
      width: 100%;
      margin-bottom: 0.5em;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }
    }

    .soundcloud-container {
      // height: 300px;
      width: 100%;
      overflow: hidden;
      max-width: 100%;
      margin-bottom: 0.5em;

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }
</style>
