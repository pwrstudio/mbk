<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor, renderBlockText } from "../sanity.js"
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { tick } from "svelte"
  import { isArray, get } from "lodash"
  // import has from "lodash/has"

  // *** PROPS
  export let slides = []
  export let zoomable = false

  // *** SWIPER VARS
  let swiperInstance = null
  let swiper = {}

  // *** ZOOM VARS
  let zoomed = false
  let zoomLevel = 1
  let maxHeight = "auto"

  $: {
    swiperInstance = swiper
  }

  const toggleZoom = e => {
    const rect = swiperInstance.clickedSlide.getBoundingClientRect()
    maxHeight = rect.height + "px"

    zoomed = !zoomed
    zoomLevel = zoomLevel === 1 ? 2 : 1

    swiperInstance.clickedSlide.scrollLeft = 200
    swiperInstance.clickedSlide.scrollTop = 200
  }

  const scrollThrough = e => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left // x position within the element.
    const y = e.clientY - rect.top // y position within the element.
    const scrollW = e.currentTarget.scrollWidth
    const scrollH = e.currentTarget.scrollHeight

    const fracX = x / rect.width
    const fracY = y / rect.height

    const toX = fracX * (scrollW - rect.width)
    const toY = fracY * (scrollH - rect.height)

    e.currentTarget.scrollLeft = toX
    e.currentTarget.scrollTop = toY
  }

  console.dir(slides)
</script>

<div class="slideshow" class:zoomable>
  <Swiper
    spaceBetween={8}
    on:click={toggleZoom}
    on:swiper={e => (swiper = e.detail[0])}
  >
    {#each slides as slide}
      <SwiperSlide>
        {#if zoomable}
          <div
            ref={slide._key}
            class="zoom-container"
            class:zoomed
            style="max-height: {maxHeight};"
            on:mousemove={scrollThrough}
          >
            <img
              class="slide-img"
              class:zoomed
              src={urlFor(slide.asset).quality(90).url()}
              alt={slide.asset.alt}
            />
          </div>
        {:else}
          <img
            class="slide-img"
            src={urlFor(slide.asset).quality(90).width(1200).url()}
            alt={slide.asset.alt}
          />
          {#if slide.caption}
            <div class="caption">
              {@html renderBlockText(get(slide, "caption.content", []))}
            </div>
          {/if}
        {/if}
      </SwiperSlide>
    {/each}
  </Swiper>

  {#if zoomable}
    <div class="zoomLevel">
      <span class="button" on:click={toggleZoom}>
        {`${zoomLevel * 100}%`}[±]
      </span>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    height: 100%;
    overflow: hidden;

    .zoomLevel {
      .button {
        cursor: pointer;
      }
    }

    :global(.swiper-container) {
      height: 100%;
    }

    :global(.swiper-slide) {
      height: 100%;
    }

    :global(.zoom-container) {
      overflow: scroll;
      cursor: zoom-in;
      scroll-behavior: unset;
    }

    :global(.slide-img) {
      max-width: 100%;
      max-height: 100%;
    }

    :global(.slide-img.zoomed) {
      padding: 0;
      margin: 0;
      width: unset;
      height: unset;
      object-fit: unset;
      max-width: none;
      max-height: none;
      cursor: zoom-out;
    }

    .caption {
      position: absolute;
      bottom: 0;
      :global(p) {
        font-size: $font_size_small;
      }
      :global(p a) {
        text-decoration: underline;
      }
    }

    @include screen-size("small") {
    }
  }
</style>
