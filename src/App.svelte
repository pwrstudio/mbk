<script>
  // # # # # # # # # # # # # #
  //
  //  MBK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route, Link } from "svelte-routing"
  // COMPONENTS
  import MetaData from "./Components/MetaData.svelte"
  import Landing from "./Routes/Landing.svelte"
  import Single from "./Routes/Single.svelte"
  import Error404 from "./Routes/Error404.svelte"

  let ih

  $: {
    // Set the body to innerHeight, the visible part of the window height
    document.documentElement.style.height = ih + 'px'
    document.body.style.height = ih + 'px'
  }
</script>

<svelte:window bind:innerHeight={ih} />

<!-- METADATA -->
<MetaData />

<Router>
  <!-- LANDING -->
  <Route path="/" component={Landing} />
  <!-- SINGLE -->
  <Route path="/:slug" component={Single} />
  <!-- 404 -->
  <Route component={Error404} />
</Router>

<style lang="scss" global>
  @import "./variables.scss";

  :global(*) {
    @include hide-scroll;
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
</style>
