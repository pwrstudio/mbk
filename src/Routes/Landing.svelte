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
  import CoverShow from "../Components/CoverShow.svelte"

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
    background: $grey;
    margin-left: 100px;
  }
</style>

{#await issues then issues}
  <div class="landing" use:links>
    <CoverShow {issues} />
  </div>
{/await}
