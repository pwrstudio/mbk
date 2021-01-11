<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData } from "../sanity.js"
  import { links } from "svelte-routing"

  // COMPONENTS
  import CoverSlider from "../Components/CoverSlider.svelte"

  // STORES
  import { menuActive } from '../stores.js'

  // *** CONSTANTS
  const query = "*[_type == 'issue']"

  // *** CONSTANTS
  const issues = loadData(query)

  issues.then(issues => {
    console.dir(issues)
  })
</script>

<style lang="scss">
  @import "../variables.scss";

  .landing {
    background: $grey_solid;
    width: calc(100% - #{$menu_button_width});
    height: 100vh;
    position: relative;
    float: right;
    transition: width 0.4s ease-out;

    &.expanded {
      width: calc(100% - #{$menu_width});
      // background: $grey_solid;
    }
  }
</style>

{#await issues then issues}
  <div
    class="landing"
    class:expanded={$menuActive}
    use:links>
    <CoverSlider {issues} />
  </div>
{/await}
