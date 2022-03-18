<script>
  // # # # # # # # # # # # # #
  //
  //  METADATA FOR NEWS
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
  import { extendedPost } from "../stores.js"

  // *** CONSTANTS
  const DEFAULT_DESCRIPTION =
    "Magasin for Bygningskunst og Kultur er optaget af et arkitektonisk fagområde hvor sociale, ideologiske, politiske, historiske og æstetiske faktorer interagerer. Vi undersøger, hvordan bygningskunst og bygningskulturer både udspringer af og medskaber kulturer."
  const DEFAULT_IMAGE = ""

  // *** VARIABLES
  let title = "MAGASIN FOR BYGNINGSKUNST OG KULTUR"
  let description =
    "Magasin for Bygningskunst og Kultur er optaget af et arkitektonisk fagområde hvor sociale, ideologiske, politiske, historiske og æstetiske faktorer interagerer. Vi undersøger, hvordan bygningskunst og bygningskulturer både udspringer af og medskaber kulturer."
  let image = ""

  // console.dir(post)

  const stripHtml = html => {
    let tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  $: {
    title =
      (has($extendedPost, "title") && !isEmpty($extendedPost.title)
        ? stripHtml($extendedPost.title) + " | "
        : "") + "MAGASIN FOR BYGNINGSKUNST OG KULTUR"
  }

  $: {
    description =
      has($extendedPost, "content.content") &&
      isArray($extendedPost.content.content) &&
      !isEmpty($extendedPost.content.content)
        ? truncate(toPlainText($extendedPost.content.content), {
            length: 260,
            separator: /.? +/,
          })
        : DEFAULT_DESCRIPTION
  }

  $: {
    image =
      has($extendedPost, "mainImage") && $extendedPost.mainImage
        ? urlFor($extendedPost.mainImage)
            .quality(80)
            .height(800)
            .width(1200)
            .url()
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
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="twitter:image" content={image} />
  <meta property="og:site_name" content="MAGASIN FOR BYGNINGSKUNST OG KULTUR" />
</svelte:head>
