<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE ARTICLE PDF GEN
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import {
    renderBlockText,
    calculateArticleReadingTime,
    urlFor,
  } from "../sanity.js"
  import get from "lodash/get"
  import flatMap from "lodash/flatMap.js"

  // *** PROPS
  export let post = {}
  export let issue = {}

  const extractFootnotes = mainContent => {
    let a = flatMap(
      mainContent.filter(c => c._type == "block").map(x => x.markDefs),
    )
    let footnotes = a.filter(x => x._type === "footnote")
    // console.log(footnotes.length)
    return footnotes
  }

  let footnotes = extractFootnotes(get(post, "content.content", []))
</script>

<div class="print-article">
  <!-- HEADER -->
  <header>
    <div class="top-bar">
      <div>Magasin for Bygningskunst og Kultur</div>
      <div>{issue.title}</div>
    </div>
    <!-- TITLE -->
    <div class="title">
      {post.title}
    </div>
    <!-- BYLINE -->
    <div class="byline">
      <div class="text">
        {#if post.author}
          <div class="author">
            <p class="normal">{post.author}</p>
          </div>
        {/if}
        <!-- READING TIME -->
        <div class="reading-time">
          <p class="normal">{calculateArticleReadingTime(post)} min</p>
        </div>
      </div>
    </div>
  </header>
  <!-- CONTENT -->
  <div class="content">
    {@html renderBlockText(get(post, "content.content", []))}
  </div>
  <!-- FOOTNOTES -->
  {#if get(post, "content.content", false) && footnotes.length > 0}
    <div class="footnotes">
      <div class="footnotes-header">NOTER</div>
      <ol>
        {#each footnotes as footnote}
          <li>
            {@html renderBlockText(get(footnote, "content.content", []))}
          </li>
        {/each}
      </ol>
    </div>
  {/if}
  <!-- IMAGES -->
  <div class="images">
    {#if post.slideshow && post.slideshow.length > 0}
      {#each post.slideshow as slide}
        <div class="print-img">
          <img src={urlFor(slide.asset).quality(90).width(1200).url()} />
          {#if slide.caption}
            <div class="caption">
              {@html renderBlockText(get(slide, "caption.content", []))}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .print-acticle {
    @media print {
      page-break-after: always;
    }
  }

  header {
    width: 100%;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  :global(.print-article .content div p) {
    font-family: $sans-stack;
    font-size: $font_size_print !important;
    line-height: 1.3em;
  }

  :global(.print-article .author p) {
    margin-bottom: 0;
  }

  :global(.print-article .reading-time p) {
    margin-bottom: 0;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .title {
    margin-top: 0.5em;
    font-size: 48px;
    margin-bottom: 0.5em;
  }

  .footnotes {
    border-top: 1px solid black;
    font-size: 13px;
    padding-top: 1em;
    margin-top: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid black;
    margin-bottom: 2em;
  }

  :global(.print-article .footnotes p) {
    font-size: 13px;
  }

  .print-img {
    width: 100%;
    overflow: hidden;
    margin-bottom: 2em;
  }

  :global(.print-img img) {
    max-width: 100%;
  }
</style>
