<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData } from "../sanity.js"
  import { links } from "svelte-routing"

  // *** COMPONENTS
  import CoverSlider from "../Components/CoverSlider.svelte"

  // *** STORES
  import { currentPost } from '../stores.js'

  // *** PROP
  export let location

  // *** CONSTANTS
  const query = "*[_type == 'issue'] | order(publicationDate)"
  const issues = loadData(query)

  $currentPost = false
</script>

<style lang="scss">
  @import "../variables.scss";

  :local(body) {
    background-color: $grey_solid;
    min-height: 100vh;
  }

  :global(.title) {
    text-transform: uppercase;
    font-weight: normal;
    font-size: inherit;
  }

  .landing {
    background: $grey_solid;
    width: calc(100% - #{$menu_button_width});
    height: 100vh;
    position: relative;
    float: right;
    transition: width 0.2s ease-out;
  }
</style>

{#await issues then issues}
  <div
    class="landing"
    use:links>
    <CoverSlider {issues} />
  </div>
{/await}
