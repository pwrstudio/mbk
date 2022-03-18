<script>
  // # # # # # # # # # # # # #
  //
  //  Share
  //
  // # # # # # # # # # # # # #

  import Fa from "svelte-fa"
  import copy from "copy-to-clipboard"
  import {
    faFacebookSquare,
    faLinkedin,
    faTwitterSquare,
  } from "@fortawesome/free-brands-svg-icons"
  import {
    faEnvelope,
    faShareAltSquare,
    faLink,
    faCheck,
  } from "@fortawesome/free-solid-svg-icons"

  // *** PROPS
  export let articleTitle = ""
  export let issueSlug = ""
  export let articleSlug = ""

  // SHARING LINKS
  const URL =
    "https://bygningskunstogkultur.dk/" + issueSlug + "/" + articleSlug
  const LINKEDIN = "https://www.linkedin.com/shareArticle?mini=true&url=" + URL
  const FACEBOOK =
    "https://facebook.com/sharer/sharer.php?u=" + URL + "&t=" + articleTitle
  const TWITTER =
    "http://twitter.com/share?url=" + URL + "&text=" + articleTitle
  const EMAIL = "mailto:?subject=" + articleTitle + "&body=" + URL
  const nativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: articleTitle,
          text: articleTitle,
          url: URL,
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error))
    }
  }
  let copied = false
  const copyLink = () => {
    copy(URL)
    copied = true
  }
</script>

<div class="social">
  <a href={FACEBOOK} target="_blank">
    <Fa icon={faFacebookSquare} />
  </a>
  <a href={TWITTER} target="_blank">
    <Fa icon={faTwitterSquare} />
  </a>
  <a href={LINKEDIN} target="_blank">
    <Fa icon={faLinkedin} />
  </a>
  <a href={EMAIL} target="_blank">
    <Fa icon={faEnvelope} />
  </a>
  <span class="copy" on:click={copyLink}>
    {#if copied}
      <Fa icon={faCheck} />
    {:else}
      <Fa icon={faLink} />
    {/if}
  </span>
  <!-- Native share dialog if available (mobile) -->
  {#if navigator.share}
    <span on:click={nativeShare} target="_blank">
      <Fa icon={faShareAltSquare} />
    </span>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .social {
    white-space: nowrap;

    .copy {
      cursor: pointer;
    }

    :global(svg) {
      height: 1.3em !important;
    }

    :global(.copy svg) {
      height: 1.1em !important;
    }

    @include screen-size("small") {
      :global(a) {
        margin-left: 5px;
      }
      :global(svg) {
        height: 1.3em !important;
      }
    }
  }
</style>
