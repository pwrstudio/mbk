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

  // *** STORES
  import { toPlainText, urlFor } from "../sanity.js"

  // *** PROPS
  export let post = {}

  // *** CONSTANTS
  const DEFAULT_DESCRIPTION = ""
  const DEFAULT_IMAGE = ""

  // *** VARIABLES
  let title = ""
  let description = ""
  let image = ""

  console.dir(post)

  const stripHtml = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  $: {
    title =
      (has(post, "title") && !isEmpty(post.title)
        ? stripHtml(post.title) + " | "
        : "") + "MAGASIN FOR BYGNINGSKUNST OG KULTUR"
  }

  $: {
    description =
      has(post, "content.content") &&
      isArray(post.content.content) &&
      !isEmpty(post.content.content)
        ? truncate(toPlainText(post.content.content), {
            length: 260,
            separator: /.? +/,
          })
        : DEFAULT_DESCRIPTION
  }

  $: {
    image =
      has(post, "mainImage") && post.mainImage
        ? urlFor(post.mainImage).quality(80).height(800).width(1200).url()
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
</svelte:head>
