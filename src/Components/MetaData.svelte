<script>
  // # # # # # # # # # # # # #
  //
  //  METADATA
  //
  // # # # # # # # # # # # # #
  // _lodash
  import has from "lodash/has"
  import isArray from "lodash/isArray"
  import isEmpty from "lodash/isEmpty"
  import truncate from "lodash/truncate"

  // *** SANITY
  import { toPlainText, urlFor } from "../sanity.js"

  // *** STORES
  import { activeArticle } from "../stores.js"

  // *** CONSTANTS
  const DEFAULT_DESCRIPTION = "default description test"
  const DEFAULT_IMAGE = ""

  $: {
    console.log('MetaData Article:', $activeArticle)
  }

  // *** VARIABLES
  let title = ""
  let description = ""
  let image = ""

  // console.dir(post)

  const stripHtml = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  $: {
    title =
      (has($activeArticle, "title") && !isEmpty($activeArticle.title)
        ? stripHtml($activeArticle.title) + " | "
        : "") + "MAGASIN FOR BYGNINGSKUNST OG KULTUR"
  }

  $: {
    description =
      has($activeArticle, "content.content") &&
      isArray($activeArticle.content.content) &&
      !isEmpty($activeArticle.content.content)
        ? truncate(toPlainText($activeArticle.content.content), {
            length: 260,
            separator: /.? +/,
          })
        : DEFAULT_DESCRIPTION
  }

  $: {
    image =
      has($activeArticle, "mainImage") && $activeArticle.mainImage
        ? urlFor($activeArticle.mainImage).quality(80).height(800).width(1200).url()
        : DEFAULT_IMAGE
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
  <!-- VIEWPORT -->
  <meta property="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
</svelte:head>
