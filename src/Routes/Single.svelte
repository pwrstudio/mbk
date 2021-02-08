<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE ARTICLE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../sanity.js"
  import { onMount } from "svelte"
  import { goTo, elementReady } from '../global'
  import get from "lodash/get"

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
  let singleElement

  const handleScroll = () => {
    if (vw > 768) {
      clearTimeout(timer)

      if(!singleElement.classList.contains('pointer-none')) {
        document.body.classList.add('pointer-none')
        singleElement.classList.add('pointer-none')
      }

      timer = setTimeout(() => {
        document.body.classList.remove('pointer-none')
        singleElement.classList.remove('pointer-none')
        console.log('done scrolling')
      }, 200)
    }
  }

  onMount(() => {
    const myHash = get(window.location, 'hash', false)

    if (myHash) {
      elementReady(myHash).then((el) => {
        goTo(myHash)
        singleElement.scrollTop = el.offsetTop
      })
    }
  })
</script>

<svelte:window bind:innerWidth={vw} />

{#await $currentPost then post}
  <div class="menus">
    <Menu />
    <ToC />
  </div>
  <div bind:this={singleElement} on:scroll={handleScroll} class="single">
    <Articles />
  </div>
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
