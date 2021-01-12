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

  let pathname

  $: {
    console.log(window)
    pathname = location.pathname
    handleRouteChange(pathname)
  }

  const handleRouteChange = e => {
    console.log('route change')
  }
</script>

<style lang="scss" global>
  @import "./variables.scss";

  :global(body),
  :global(main) {
    margin: 0;
    padding: 0;
  }
</style>

<main>
  <!-- METADATA -->
  <MetaData />

  <!-- MENU-->
  <Menu />

  <!-- ToC -->
  {#if pathname !== '/'}
    <ToC />
  {/if}

  <Router>
    <!-- LANDING -->
    <Route path="/" component={Landing} />
    <!-- SINGLE -->
    <Route path="/:slug" component={Single} />
    <!-- 404 -->
    <Route component={Error404} />
  </Router>
</main>
