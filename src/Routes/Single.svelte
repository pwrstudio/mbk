<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE ARTICLE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../sanity.js"
  import { onMount, tick } from "svelte"
  import { elementReady } from '../global'
  import get from "lodash/get"

  // STORES
  import { 
    tableOfContents,
    currentPost,
    currentArticleSlug,
    currentIssueSlug,
    currentArticles,
    menuActive,
    tableOfContentsActive 
  } from "../stores.js"

  // *** PROPS
  export let params = false

  // *** COMPONENTS
  import Articles from "../Components/Articles.svelte"
  import Menu from "../Components/Menu.svelte"
  import ToC from "../Components/ToC.svelte"

  // ** CONSTANTS
  const query = "*[slug.current == $slug]{..., tableOfContents[]->{...}}[0]"

  // VARIABLES
  let vw = window.innerWidth
  let timer = null
  let issue = false
  let article = false

  $: {
    // ___ Split the url parameter into variables
    const args = get(params, "[*]", "").split("/")
    // __ first part is issue...
    issue = args[0]
    currentIssueSlug.set(issue)
    console.log("__ ISSUE:", issue)
    // ... second part is article
    article = args[1]
    currentArticleSlug.set(article)
    console.log("__ ARTICLE:", article)
    // Scroll to article on change
    let targetEl = document.querySelector('#' + article)
    // console.log('targetEl', targetEl)
    if(targetEl) {
      targetEl.scrollIntoView({behavior: "smooth"});
      // Scroll text column of new article to top
      let textColumn = targetEl.querySelector('.col')
      console.log('textColumn', textColumn)
      if(textColumn) {
        // !!! Not sure why the below is not working ...
        // textColumn.scrollTo(0,0)
      }
    }
    
    // Close menu / ToC
    menuActive.set(false)
    tableOfContentsActive.set(false)
  }

  const handleScroll = () => {
    // console.log('handle scroll')
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
    let postData = await loadData(query, { slug: issue })
    // console.log('postData', postData)
    currentPost.set(postData)
    currentArticles.set(postData.tableOfContents)
    tableOfContents.set(postData.tableOfContents)

    const windowHash = '#' + article
    // console.log('windowHash', windowHash)
  
    if (windowHash) {
      console.log('HASH')
      try {
        const el = await elementReady(windowHash)
        // check if the hash is within the articles before
        const hashes = $currentArticles.map((article) => { return get(article, 'slug.current', false) })
        const isArticle = hashes.includes(windowHash.replace('#', ''))
  
        if (isArticle) {
          console.log('is article', el.offsetTop)
          await tick()
          let targetEl = document.querySelector('#' + article)
          console.log('targetEl', targetEl)
          if(targetEl) {
            targetEl.scrollIntoView({behavior: "smooth"});
          }
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const result = await articlesData
        if(get(result, 'tableOfContents[0].slug.current', false)) {
          navigate('/' + $currentIssueSlug + '/' + result.tableOfContents[0].slug.current)
        }
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
    padding-left: 2 * $menu_button_width;
    scroll-snap-type: y mandatory;
    background-color: $white;
    overflow-y: hidden;
    height: 100%;

    @include screen-size("phone") {
      scroll-snap-type: unset;
      padding-left: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }
</style>
