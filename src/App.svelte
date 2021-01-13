<script>
  // # # # # # # # # # # # # #
  //
  //  MBK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { Router, Route } from "svelte-routing"
  import { beforeUpdate, afterUpdate } from "svelte"
  // COMPONENTS
  import MetaData from "./Components/MetaData.svelte"
  import Menu from "./Components/Menu.svelte"
  import ToC from "./Components/ToC.svelte"
  import Landing from "./Routes/Landing.svelte"
  import Single from "./Routes/Single.svelte"
  import Error404 from "./Routes/Error404.svelte"

  import { menuActive, tableOfContentsActive } from "./stores.js"

  let lastPos, timeout, lastMoved, hideMenu

  hideMenu = false

  const pollActivity = e => {
    lastPos = e.screenX
    hideMenu = false
    clearTimeout(timeout)

    if (lastPos > 100 && $menuActive === false && $tableOfContentsActive === false) {
      timeout = setTimeout(() => {
        hideMenu = true
        console.log('hide menu', hideMenu)
      }, 5000)
    }
  }
</script>

<style lang="scss" global>
  @import "./variables.scss";

  :global(body),
  :global(main) {
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

    &.hide {
      transform: translateX(-2 * $menu_button_width);
    }
  }
</style>

<main on:mousemove={pollActivity}>
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
