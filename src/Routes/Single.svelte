<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE ARTICLE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../sanity.js"

  // STORES
  import { tableOfContents, currentPost, currentArticles } from "../stores.js"

  // *** PROPS
  export let slug = ""

  // COMPONENTS
  import Articles from "../Components/Articles.svelte"
  import Menu from "../Components/Menu.svelte"
  import ToC from "../Components/ToC.svelte"

  // *** PROP
  export let location

  // ** CONSTANTS
  const query =
    "*[slug.current == $slug]{..., tableOfContents[]->{title, slug}}[0]" // add article info for ToC
  const articlesQuery = "*[slug.current == $slug]{tableOfContents[]->{...}}[0]"
  const params = { slug }
  // const post = loadData(query, params)
  const postData = loadData(query, params)
  const articlesData = loadData(articlesQuery, params)

  postData.then(post => {
    $currentPost = post
    $tableOfContents = post.tableOfContents
  })

  articlesData.then(articles => {
    $currentArticles = articles.tableOfContents
  })
</script>

{#await $currentPost then post}
  <div class="menus">
    <Menu />
    <ToC />
  </div>
  <div class="single">
    <Articles />
  </div>
{/await}

<style lang="scss">
  @import "../../variables.scss";

  :global(*) {
    scroll-behavior: smooth;
  }

  .single {
    scroll-snap-type: y mandatory;
    background-color: $white;
    padding-left: 2 * $menu_button_width;
    height: 100vh;
    overflow-y: hidden;

    @include screen-size("phone") {
      scroll-snap-type: unset;
      padding-left: 0;
      overflow-y: auto;
      padding-bottom: $menu_button_width;
    }
  }
</style>
