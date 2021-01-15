<script>
  // # # # # # # # # # # # # #
  //
  //  MBK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route } from "svelte-routing"
  // COMPONENTS
  import MetaData from "./Components/MetaData.svelte"
  import Menu from "./Components/Menu.svelte"
  import ToC from "./Components/ToC.svelte"
  import Landing from "./Routes/Landing.svelte"
  import Single from "./Routes/Single.svelte"
  import Error404 from "./Routes/Error404.svelte"

  // *** VARIABLES
  let hideMenu
</script>

<style lang="scss" global>
  @import "./variables.scss";

  :global(body),
  :global(main) {
    font-size: font_size_normal;
    line-height: line-height;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
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

<main>
  <!-- METADATA -->
  <MetaData />

  <div class="menus" class:hide={hideMenu}>
    <Menu />
    <ToC />
  </div>

  <Router>
    <!-- LANDING -->
    <Route path="/" component={Landing} />
    <!-- SINGLE -->
    <Route path="/:slug" component={Single} />
    <!-- 404 -->
    <Route component={Error404} />
  </Router>
</main>
