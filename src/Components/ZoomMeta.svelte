<script>
  // # # # # # # # # # # # # #
  //
  //  ZOOM-META
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { renderBlockText, toPlainText } from "../sanity.js"

  // *** COMPONENTS
  import Share from "./Share.svelte"

  // *** PROPS
  export let title = ""
  export let articleTitle = ""
  export let byline = ""
  export let issueSlug = ""
  export let articleSlug = ""
  export let mainText = ""

  let readMoreActive = false

  const toggleReadMore = () => {
    readMoreActive = !readMoreActive
  }

  const TEXT_LIMIT = 400
  let mainTextLength = toPlainText(mainText).length
  console.log(mainText)
  console.log(mainTextLength)

  function splitTextBlocks(text) {
    let array1 = []
    let array2 = []
    let currentLength = 0

    // Always take the first block and add it to array1
    if (text.length > 0) {
      array1.push(text[0])
      currentLength += text[0].children[0].text.length
    }

    // Start the loop from the second block
    for (let i = 1; i < text.length; i++) {
      let block = text[i]
      let blockLength = block.children[0].text.length

      if (currentLength + blockLength <= TEXT_LIMIT) {
        array1.push(block)
        currentLength += blockLength
      } else {
        array2.push(block)
      }
    }

    return [array1, array2]
  }

  // Example usage:
  const [shortText, extendedText] = splitTextBlocks(mainText)

  // // Function to set the styles based on main-text properties
  // function setStylesBasedOnMainText() {
  //   // Get the elements
  //   const mainText = document.querySelector(".main-text")
  //   const extendedText = document.querySelector("#extended-text")

  //   // Get the bounding rectangle of mainText to get its position and dimensions
  //   const mainTextRect = mainText.getBoundingClientRect()

  //   // Calculate the desired properties
  //   const topPosition = mainTextRect.bottom
  //   const leftPosition = mainTextRect.left
  //   const width = mainTextRect.width
  //   const height = window.innerHeight - topPosition

  //   // Apply the styles to extendedText
  //   extendedText.style.top = `${topPosition}px`
  //   extendedText.style.left = `${leftPosition}px`
  //   extendedText.style.width = `${width}px`
  //   extendedText.style.height = `${height}px`
  // }

  // Testing: http://localhost:5000/nr-2-2021/opmaling-af-gjorslev-gods

  // onMount(() => {
  //   // Call the function initially
  //   setStylesBasedOnMainText()

  //   // Add a window resize listener
  //   window.addEventListener("resize", setStylesBasedOnMainText)
  // })
</script>

<div class="zoom-header-container">
  <div class="block meta" in:fade>
    <!-- HEADER -->
    <div class="header">
      <span>Magasin for Bygningskunst og Kultur</span>
      <span class="right">
        {title}
      </span>
    </div>

    <!-- TITLE -->
    <h1 class="article-title">
      {articleTitle}
    </h1>

    <!-- BYLINE -->
    <div class="byline">
      <div class="text">
        {@html renderBlockText(byline)}
      </div>

      <!-- SHARING-->
      <Share {articleTitle} {articleSlug} {issueSlug} />
    </div>
  </div>

  <div class="block main-text" class:extended={readMoreActive} in:fade>
    {@html renderBlockText(shortText)}
    {#if mainTextLength > TEXT_LIMIT}
      <div class="read-more" on:click={toggleReadMore}>
        {readMoreActive ? "READ LESS" : "READ MORE"}
      </div>
      {#if readMoreActive}
        {@html renderBlockText(extendedText)}
      {/if}
    {/if}
  </div>
</div>

<!-- <div
  class="extended-text"
  id="extended-text"
  class:active={readMoreActive}
  in:fade
>
  {@html renderBlockText(extendedText)}
</div> -->

<style lang="scss">
  @import "../variables.scss";

  .block {
    box-sizing: border-box;
  }

  .zoom-header-container {
    width: calc(100% - 10px);
  }

  .meta {
    width: 50%;
    float: left;

    @include screen-size("small") {
      width: 100%;
    }

    .header {
      padding-top: $margin_xs;
      padding-bottom: $margin_xs;
      border-top: $border_black;

      .right {
        text-align: right;
      }
    }

    .article-title {
      font-family: $display-stack;
      font-size: $font_size_larger;
      line-height: $line_height_larger;
      font-weight: normal;
      margin: 0 0 $margin_xs;
    }

    .byline {
      border-bottom: $border_black;
      margin-bottom: $margin_xs;
      padding-bottom: $margin_xs;
      display: flex;
      align-items: flex-end;

      @include screen-size("small") {
        flex-direction: column;
      }

      .text {
        flex-grow: 1;
        margin-right: $margin;

        @include screen-size("small") {
          margin-right: 0;
        }
      }

      :global(p) {
        margin: 0;
      }
    }
  }

  .main-text {
    padding-top: 4px !important;
    padding-bottom: $margin;
    border-top: $border_black;
    width: 50%;
    float: right;

    @include screen-size("small") {
      width: 100%;
      border-top: unset;
      border-bottom: $border_black;
    }
  }

  .read-more {
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 1em;

    &:hover {
      text-decoration: none;
    }
  }
</style>
