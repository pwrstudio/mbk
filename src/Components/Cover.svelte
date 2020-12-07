<script>
  // # # # # # # # # # # # # #
  //
  //  COVER
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { renderBlockText, urlFor } from "../sanity.js"

  // *** PROPS
  export let issue = {}
</script>

<style lang="scss">
  @import "../variables.scss";

  .cover {
    // display: flex;
    // margin-bottom: $line-height;
    // text-decoration: none;
    // font-size: $font_size_normal;
    // border-bottom: 1px solid $grey;
    // flex-wrap: wrap;
    // user-select: none;

    @include screen-size("small") {
      // flex-wrap: wrap;
      // // margin-left: 10px;
    }

    .inner {
      width: 100%;
    }

    .image {
      width: 100%;
      display: flex;
      // justify-content: center;
      // align-items: center;
      padding-bottom: $line-height;
      transition: opacity 0.3s ease-out;

      img {
        // max-width: calc(100% - 40px);
        max-width: 100%;
        height: $line-height * 12;
        object-fit: cover;
      }

      // background: green;

      @include screen-size("small") {
        width: 100%;
      }
    }

    .text {
      width: 100%;
      padding-right: 20px;
      text-decoration: none;
      color: black;

      @include screen-size("small") {
        width: 100%;
      }

      .title {
        font-size: $font_size_normal;
        line-height: $line-height;
        margin-bottom: $line-height;
        font-weight: bold;
        max-width: 45ch;

        @include screen-size("small") {
          font-size: $font_size_large_phone;
        }
      }

      .author {
        font-size: $font_size_normal;
        line-height: $line-height;
        // margin-bottom: $margin / 6;
        font-style: italic;
        pointer-events: none;
      }

      .date {
        font-size: $font_size_small;
        font-family: $sans-stack;
        // margin-bottom: $margin / 6;
        // padding-left: 2px;
        // text-decoration: underline;
        letter-spacing: 0.1em;
        // text-align: right;
      }
    }

    &:hover {
      .text {
        .title {
          text-decoration: underline;
        }
      }
    }
  }
</style>

<a href="" class="cover" in:fade>
  <div>
    <h2>{issue.title}</h2>
    <!-- IMAGE -->
    <img
      src={urlFor(issue.mainImage.asset)
        .width(400)
        .quality(90)
        .auto('format')
        .url()} />
  </div>
</a>
