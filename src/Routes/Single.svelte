<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE ARTICLE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../sanity.js"
  import isArray from "lodash/isArray"
  import { fade } from "svelte/transition"

  // *** PROPS
  export let slug = ""

  // COMPONENTS
  import ImageBlock from "../Components/Blocks/ImageBlock.svelte"
  import VideoBlock from "../Components/Blocks/VideoBlock.svelte"
  import AudioBlock from "../Components/Blocks/AudioBlock.svelte"
  import EmbedBlock from "../Components/Blocks/EmbedBlock.svelte"

  // STORES
  // import { currentPost } from "../stores.js"

  // ** CONSTANTS
  const query = "*[slug.current == $slug]{...}[0]"
  const params = { slug: slug }
  const post = loadData(query, params)

  post.then(post => {
    console.log("post", post)
  })
</script>

<style lang="scss">
  @import "../../variables.scss";

  .single {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding-bottom: $line-height * 2;
    width: 100vw;
    overflow-x: hidden;
    padding-top: calc(#{$menu_bar_height} + #{$line-height / 2});
    min-height: calc(100vh - #{$menu_bar_height});

    @include screen-size("small") {
      width: calc(100% - #{$phone-margin * 2});
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }

    h1 {
      font-size: $font_size_normal;
      line-height: $line-height;
      margin: 0;
      padding: 0;

      @include screen-size("small") {
        font-size: $font_size_large_phone;
      }
    }
  }

  .meta {
    margin-bottom: $line-height * 2;
    margin-left: auto;
    margin-right: auto;
    width: $text_width;
    max-width: 100%;

    .date {
      font-size: $font_size_small;
      font-family: $sans-stack;
      margin-bottom: $line-height / 2;
      padding-left: 2px;
      letter-spacing: 0.1em;
    }

    .authors {
      font-size: $font_size_normal;
      line-height: $line-height;
      font-style: italic;
    }

    &.intervju {
      width: $text_width_wider;
      padding-bottom: $line-height_large;
      margin-bottom: $line-height_large * 2;
      border-bottom: 1px solid $grey;
      line-height: $line-height_large;

      .authors {
        font-size: $font_size_large;
        margin-bottom: $line-height_large / 2;
      }

      .title {
        font-size: $font_size_large;
        line-height: $line-height_large;
      }
    }

    &.manifest {
      width: $text_width_wider;
      padding-bottom: $line-height_large;
      margin-bottom: $line-height_large * 2;
      border-bottom: 1px solid $grey;
      line-height: $line-height_large;

      .authors {
        font-size: $font_size_larger;
        margin-bottom: $line-height_large / 2;
      }

      .title {
        font-size: $font_size_larger;
        font-family: $sans-stack;
        font-weight: 900;
        line-height: $line-height_large;
      }
    }
  }

  .ingress {
    font-style: italic;
  }
</style>

{#await post then post}
  <div class="single">
    <!-- META -->
    <div class="meta" in:fade>
      <!-- TITLE -->
      <h1 class="title">{post.title}</h1>
      <!-- BYLINE -->
      <div class="byline">
        {@html renderBlockText(post.byline.content)}
      </div>
    </div>

    <!-- MAIN CONTENT -->
    {#if post.content && post.content.content && isArray(post.content.content)}
      <div class="content" in:fade={{ delay: 300 }}>
        {#each post.content.content as block}
          {#if block._type === 'block'}
            {@html renderBlockText(block)}
          {/if}
          {#if block._type === 'image'}
            <ImageBlock {block} />
          {/if}
          {#if block._type === 'videoBlock'}
            <VideoBlock {block} />
          {/if}
          {#if block._type === 'audioBlock'}
            <AudioBlock {block} />
          {/if}
          {#if block._type === 'embedBlock'}
            <EmbedBlock {block} />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/await}
