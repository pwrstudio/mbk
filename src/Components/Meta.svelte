<script>
  // # # # # # # # # # # # # #
  //
  //  META
  //
  // # # # # # # # # # # # # #

  import Fa from "svelte-fa"
  import { faFacebookSquare, faLinkedin, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
  import { faEnvelope, faShareAltSquare } from '@fortawesome/free-solid-svg-icons'
  import { fade } from "svelte/transition"
  import { renderBlockText } from "../sanity.js"
import { navigator } from "lodash/_freeGlobal";

  // *** PROPS
  export let title = ''
  export let articleTitle = ''
  export let byline = ''
  export let issueSlug = ''
  export let articleSlug = ''

  // SHARING LINKS
  const URL ='https://bygningskunstogkultur.dk/' + issueSlug + '/' + articleSlug
  const LINKEDIN = 'https://www.linkedin.com/shareArticle?mini=true&url=' + URL
  const FACEBOOK = 'https://facebook.com/sharer/sharer.php?u=' + URL + '&t=' + articleTitle
  const TWITTER = 'http://twitter.com/share?url=' + URL + '&text=' + articleTitle
  const EMAIL = 'mailto:?subject=' + articleTitle  + '&body=' + URL
  const nativeShare = () => {
    if(navigator.share) {
      navigator.share({
        title: articleTitle,
        text: articleTitle,
        url: URL
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    }
  }


</script>

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
    <div class="social">
      <a href={FACEBOOK} target=_blank>
        <Fa icon={faFacebookSquare} />
      </a>
      <a href={TWITTER} target=_blank>
        <Fa icon={faTwitterSquare} />
      </a>
      <a href={LINKEDIN} target=_blank>
        <Fa icon={faLinkedin} />
      </a>
      <a href={EMAIL} target=_blank>
        <Fa icon={faEnvelope} />
      </a>
      <!-- Native share dialog if available (mobile) -->
      {#if navigator.share}
        <span on:click={nativeShare} target=_blank>
          <Fa icon={faShareAltSquare} />
        </span>
      {/if}
    </div>

  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

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

    .social {
      white-space: nowrap;

      @include screen-size("small") {
        :global(a) {
          margin-left: 5px;
        }  
        :global(svg) {
          height: 1.4em !important;
        }      
      }
    }

    :global(p) {
      margin: 0;
    }
  }
</style>