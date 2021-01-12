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

// STORES
  import { tableOfContents, currentPost, currentArticles } from "../stores.js"

  // *** PROPS
  export let slug = ""

  // COMPONENTS
  import Articles from "../Components/Articles.svelte"

  // *** PROP
  export let location

  // ** CONSTANTS
  const query = "*[slug.current == $slug]{..., tableOfContents[]->{title, slug}}[0]" // add article info for ToC
  const articlesQuery = "*[slug.current == $slug]{tableOfContents[]->{...}}[0]"
  const params = { slug }
  // const post = loadData(query, params)
  const postData = loadData(query, params)
  const articlesData = loadData(articlesQuery, params)

  let ready = false

  postData.then(post => {
    $currentPost = post
    $tableOfContents = post.tableOfContents
  })

  articlesData.then(articles => {
    $currentArticles = articles.tableOfContents
    console.log(articles)
  })
</script>

<style lang="scss">
  @import "../../variables.scss";

  :global(*) {
    scroll-behavior: smooth;
  }

  .single {
    background-color: $white;
    padding-left: 2 * $menu_button_width;
  }

  // .single {
  //   font-size: $font_size_normal;
  //   font-family: $serif-stack;
  //   margin: 0;
  //   padding-bottom: $line-height * 2;
  //   width: 100vw;
  //   overflow-x: hidden;
  //   padding-top: calc(#{$menu_bar_height} + #{$line-height / 2});
  //   min-height: calc(100vh - #{$menu_bar_height});

  //   @include screen-size("small") {
  //     width: calc(100% - #{$phone-margin * 2});
  //     // margin-left: $phone-margin;
  //     // margin-right: $phone-margin;
  //   }

  //   h1 {
  //     font-size: $font_size_normal;
  //     line-height: $line-height;
  //     margin: 0;
  //     padding: 0;

  //     @include screen-size("small") {
  //       font-size: $font_size_large_phone;
  //     }
  //   }
  // }

  // .meta {
  //   margin-bottom: $line-height * 2;
  //   margin-left: auto;
  //   margin-right: auto;
  //   width: $text_width;
  //   max-width: 100%;

  //   .date {
  //     font-size: $font_size_small;
  //     font-family: $sans-stack;
  //     margin-bottom: $line-height / 2;
  //     padding-left: 2px;
  //     letter-spacing: 0.1em;
  //   }

  //   .authors {
  //     font-size: $font_size_normal;
  //     line-height: $line-height;
  //     font-style: italic;
  //   }

  //   &.intervju {
  //     width: $text_width_wider;
  //     padding-bottom: $line-height_large;
  //     margin-bottom: $line-height_large * 2;
  //     border-bottom: 1px solid $grey_solid;
  //     line-height: $line-height_large;

  //     .authors {
  //       font-size: $font_size_large;
  //       margin-bottom: $line-height_large / 2;
  //     }

  //     .title {
  //       font-size: $font_size_large;
  //       line-height: $line-height_large;
  //     }
  //   }

  //   &.manifest {
  //     width: $text_width_wider;
  //     padding-bottom: $line-height_large;
  //     margin-bottom: $line-height_large * 2;
  //     border-bottom: 1px solid $grey_solid;
  //     line-height: $line-height_large;

  //     .authors {
  //       font-size: $font_size_larger;
  //       margin-bottom: $line-height_large / 2;
  //     }

  //     .title {
  //       font-size: $font_size_larger;
  //       font-family: $sans-stack;
  //       font-weight: 900;
  //       line-height: $line-height_large;
  //     }
  //   }
  // }

  // .ingress {
  //   font-style: italic;
  // }
</style>

{#await $currentPost then post}
  <div class="single">
    <Articles />

    <!-- MAIN CONTENT -->
    <!-- SOME MAIN CONTENT -->
    <!-- {#if post.content && post.content.content && isArray(post.content.content)}
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
    {/if} -->
  </div>
{/await}
