<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE ARTICLE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../sanity.js"
  import { onMount, onDestroy } from "svelte"
  import { goTo, elementReady } from '../global'
  import get from "lodash/get"

  // STORES
  import { tableOfContents, currentPost, currentArticles, hash } from "../stores.js"

  // *** PROPS
  export let slug = ""

  // *** IMPORTS

  // *** COMPONENTS
  import Articles from "../Components/Articles.svelte"
  import Menu from "../Components/Menu.svelte"
  import ToC from "../Components/ToC.svelte"

  // *** PROP
  export let location

  let vw = window.innerWidth

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

  let timer = null

  const handleScroll = () => {
    if (vw > 768) {
      clearTimeout(timer)

      if(document.body.classList.contains('pointer-none')) {
        document.body.classList.add('pointer-none')
      }

      timer = setTimeout(() => {
        document.body.classList.remove('pointer-none')
      }, 200)
    }
  }

  onMount(async () => {
    const windowHash = get(window.location, 'hash', false)
    
    if (windowHash) {
      console.log('HASH')
      try {
        const el = await elementReady(windowHash)
        // check if the hash is within the articles before
        const hashes = $currentArticles.map((article) => { return get(article, 'slug.current', false) })
        const isArticle = hashes.includes(windowHash.replace('#', ''))
  
        if (isArticle) {
          console.log('is article')
          goTo(windowHash)
          document.body.scrollTop = el.offsetTop
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const result = await articlesData
        goTo(result.tableOfContents[0].slug.current)
      } catch (error) {
        console.error(error)
      }
    }

  })
</script>

<svelte:window bind:innerWidth={vw} />

{#await $currentPost then post}

  <div class="menus">
    <Menu />
    <ToC />
  </div>
  {#if vw > 786}
    <div on:scroll={handleScroll} class="single">
      <Articles />
    </div>
  {:else}
    <Articles />
  {/if}
{/await}

<style lang="scss">
  @import "../../variables.scss";

  :global(*) {
    scroll-behavior: smooth;
  }

  :global(.pointer-none) {
    pointer-events: none;
  }

  .single {
    scroll-snap-type: y mandatory;
    background-color: $white;
    padding-left: 2 * $menu_button_width;
    height: 100%;
    overflow-y: hidden;

    @include screen-size("phone") {
      scroll-snap-type: unset;
      padding-left: 0;
      overflow-y: auto;
      padding-bottom: $menu_button_width;
    }
  }
</style>
