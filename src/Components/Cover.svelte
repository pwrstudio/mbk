<script>
  // # # # # # # # # # # # # #
  //
  //  COVER
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition"
  import { urlFor } from "../sanity.js"
  import Logo from "../Components/Graphics/Logo.svelte"
  import get from "lodash/get"

  // *** PROPS
  export let issue = {}

  // ratio of the photo is 460 / 370
  const ratio = 460 / 370
</script>

<a class="cover" in:fade href="/{issue.slug.current}">
  <div class="inner">
    <div class="logo">
      <Logo />
    </div>
    <h1 class="logo-title">
      {get(issue, "title", "")}
    </h1>
    <img
      class="image"
      src={urlFor(issue.mainImage.asset)
        .width(600)
        .height(Math.floor(ratio * 600))
        .quality(90)
        .auto("format")
        .url()}
      alt={issue.mainImage.alt}
    />
  </div>
</a>

<style lang="scss">
  @import "../variables.scss";

  .cover {
    width: 400px;
    height: 586px;
    padding: $margin / 4;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    background-color: $white;
    position: relative;

    .inner {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;
      position: relative;

      .logo {
        width: 100%;
      }

      .logo-title {
        position: absolute;
        font-family: $sans-stack;
        width: 100%;
        display: block;
        text-align: right;
        font-weight: normal;
        font-size: 26px;
        top: -1px;
      }

      .image {
        box-sizing: border-box;
        width: 100%;
        height: auto;
      }
    }

    @include screen-size("small") {
    }
  }
</style>
