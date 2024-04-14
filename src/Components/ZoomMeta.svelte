<script>
  // # # # # # # # # # # # # #
  //
  //  ZOOM-META
  //
  // # # # # # # # # # # # # #
  import { fade } from "svelte/transition"
  import { renderBlockText, toPlainText } from "../sanity.js"
  import get from "lodash/get"
  import flatMap from "lodash/flatMap"

  // *** COMPONENTS
  import Share from "./Share.svelte"
  import { onMount } from "svelte"

  // *** PROPS
  export let title = ""
  export let articleTitle = ""
  export let byline = ""
  export let issueSlug = ""
  export let articleSlug = ""
  export let mainText = ""

  console.log("mainText", mainText)

  let readMoreActive = false

  const toggleReadMore = () => {
    readMoreActive = !readMoreActive
  }

  const TEXT_LIMIT = 400
  let mainTextLength = toPlainText(mainText).length

  // function splitTextBlocks(text) {
  //   let array1 = []
  //   let array2 = []
  //   let currentLength = 0

  //   console.log("text", text)

  //   // Always take the first block and add it to array1
  //   if (text.length > 0) {
  //     array1.push(text[0])
  //     currentLength += text[0].children[0].text.length
  //   }

  //   // Start the loop from the second block
  //   for (let i = 1; i < text.length; i++) {
  //     let block = text[i]
  //     let blockLength = block.children[0].text.length

  //     console.log("blockLength", blockLength)

  //     if (currentLength + blockLength <= TEXT_LIMIT) {
  //       array1.push(block)
  //       currentLength += blockLength
  //     } else {
  //       array2.push(block)
  //     }
  //   }

  //   return [array1, array2]
  // }

  function splitTextBlocks(text) {
    let shortText = []
    let extendedText = []

    // Check if there is at least one block to add to shortText
    if (text.length > 0) {
      shortText.push(text[0]) // Add the first text block to shortText
    }

    // Add all remaining blocks to extendedText
    for (let i = 1; i < text.length; i++) {
      extendedText.push(text[i])
    }

    return [shortText, extendedText]
  }

  const [shortText, extendedText] = splitTextBlocks(mainText)

  // Extract the footnotes from the currently active article, to list at bottom
  const extractFootnotes = mainContent => {
    let a = flatMap(
      mainContent.filter(c => c._type == "block").map(x => x.markDefs),
    )
    let footnotes = a.filter(x => x._type === "footnote")
    return footnotes
  }

  // Function to be called when the hash changes
  function onHashChange() {
    const newHash = window.location.hash.substring(1) // Remove the '#' from the hash
    const targetElement = document.getElementById(newHash)

    if (targetElement) {
      // Smoothly scroll to the element
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } else {
      console.log("Element not found for hash: " + newHash)
    }
  }

  onMount(() => {
    // The hashchange
    // Add an event listener for the hashchange event
    window.addEventListener("hashchange", onHashChange)
  })
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
        <div class="extended-text" in:fade>
          {@html renderBlockText(extendedText)}

          <!-- FOOTNOTES -->
          <div
            class:hidden={extractFootnotes(mainText).length === 0}
            class="footnotes"
          >
            <div class="footnotes-header">NOTER</div>
            <ol>
              {#each extractFootnotes(mainText) as footnote}
                <li id={"note-" + footnote._key}>
                  {@html renderBlockText(get(footnote, "content.content", []))}
                  <span
                    class="back-link"
                    on:click={e => {
                      let backLinkTarget = document.querySelector(
                        "#" + "link-" + footnote._key,
                      )
                      // console.log('backLinkTarget', backLinkTarget)
                      if (backLinkTarget) {
                        backLinkTarget.scrollIntoView({ behavior: "smooth" })
                      }
                    }}>↩</span
                  >
                </li>
              {/each}
            </ol>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

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
    user-select: none;

    &:hover {
      text-decoration: none;
    }
  }
</style>
