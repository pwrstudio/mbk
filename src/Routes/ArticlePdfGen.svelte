<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLE PDF GEN
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData } from "../sanity.js"
  import { onMount } from "svelte"
  import get from "lodash/get"
  import PrintArticle from "../Components/PrintArticle.svelte"

  // *** PROPS
  export let params = false
  let post = {}
  let issue = {}

  onMount(async () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto"
    document.getElementsByTagName("body")[0].style.height = "auto"

    const args = get(params, "[*]", "").split("/")
    let article = args[0]
    post = await loadData("*[slug.current == $slug]{...}[0]", {
      slug: article,
    })
    issue = await loadData("*[$id in tableOfContents[]._ref ][0]", {
      id: post._id,
    })
    document.title = post.title
  })
</script>

{#if post.title}
  <div class="print-container">
    <div class="print-info">
      <div>
        Print this page to PDF (CMD + P) to save a copy of this article.
      </div>
    </div>
    <PrintArticle {post} {issue} />
  </div>
{/if}

<style lang="scss">
  @import "../variables.scss";

  @page {
    @bottom-center {
      content: counter(page) "/" counter(pages);
      font-family: $sans-stack;
      font-size: $font_size_print;
    }
  }

  .print-container {
    padding: 2em;
    font-family: $sans-stack;
    font-size: $font_size_print;
    @media screen {
      max-width: 900px;
    }
  }

  .print-info {
    background: $green;
    padding: 40px;
    margin-bottom: 1em;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media print {
      display: none;
    }
  }
</style>
