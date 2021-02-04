<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor, renderBlockText } from "../sanity.js"
  import { get } from "lodash"
  import SwiperCore, { Autoplay, Pagination } from "swiper"
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import "swiper/swiper-bundle.css"
  import "swiper/components/pagination/pagination.min.css"
  
  // *** SETUP
  SwiperCore.use([Autoplay, Pagination])

  // *** PROPS
  export let slides = []
  export let zoomable = false
  export let id = 0

  // *** SWIPER VARS
  let swiperInstance = null
  let swiper = {}

  // *** ZOOM VARS
  let zoomed = false
  let zoomLevel = 1
  let maxHeight = "auto"
  let vw = window.innerWidth

  $: {
    swiperInstance = swiper
  }

  const toggleZoomButton = e => {
    const rect = swiperInstance.slides[swiperInstance.activeIndex].getBoundingClientRect()
    maxHeight = rect.height + "px"

    zoomed = !zoomed
    zoomLevel = zoomLevel === 1 ? 2 : 1
  }

  const toggleZoom = e => {
    const rect = swiperInstance.clickedSlide.getBoundingClientRect()
    maxHeight = rect.height + "px"

    zoomed = !zoomed
    zoomLevel = zoomLevel === 1 ? 2 : 1
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

  // Checks in zoom containers if the original file is big enough, else falls back to a double vw image
  const zoomImgUrl = asset => {
    // Setup regex for original
    const original = urlFor(asset).quality(90).url()
    const originalDims = /-(\d+)x(\d+)/

    // Setup regex for Double
    const double = urlFor(asset).width(vw * 2).quality(90).url()
    const doubleDims = /w=(\d+)/

    const originalDimensions = original.match(originalDims)
    const doubleDimensions = double.match(doubleDims)
    
    const originalW = originalDimensions[1]
    const doubleW = doubleDimensions[1]

    // Compare sizes...
    if (Number(originalW) > Number(doubleW)) {
      return original
    } else {
      return double
    }
  }
</script>

<!--                 -->
<!-- WINDOW BINDINGS -->
<!--                 -->

<svelte:window bind:innerWidth={vw} />

<div class="slideshow" class:zoomable>
  <Swiper
    spaceBetween={8}
    autoplay={
      zoomable ? false : { delay: 4000 }
    }
    pagination={{
      el: "#custom-pagination-" + id
    }}
    on:click={toggleZoom}
    on:touchstart={toggleZoom}
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
              src={zoomImgUrl(slide.asset)}
              alt={slide.asset.alt}
            />
          </div>
        {:else}
          <div class="img-container">
            <img
              class="slide-img contain"
              class:contain={!get(slide, 'cover')}
              class:cover={get(slide, 'cover')}
              src={urlFor(slide.asset).quality(90).width(1200).url()}
              alt={slide.asset.alt}
            />
            {#if slide.caption}
              <div class="caption">
                {@html renderBlockText(get(slide, "caption.content", []))}
              </div>
            {/if}
          </div>
        {/if}
      </SwiperSlide>
    {/each}
  </Swiper>

  <div class="bottom">
    <div id={"custom-pagination-" + id} class={"custom-pagination"} />

    {#if zoomable}
      <div class="zoomLevel">
        <span
          class="button"
          on:click={toggleZoomButton}
          on:touchstart={toggleZoomButton}
        >
          {`${zoomLevel * 100}%`}[±]
        </span>
      </div>
    {/if}
  </div>

</div>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    height: 100%;

    .zoomLevel {
      padding-top: $margin_xs;

      .button {
        cursor: pointer;
      }
    }

    .bottom {
      height: $margin;
    }

    :global(.custom-pagination) {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }

    :global(.swiper-pagination-bullet) {
      background: $grey_solid;
      opacity: 1;
      margin: 0 $margin / 6;
    }

    :global(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
      background: $black;
    }

    :global(.swiper-wrapper) {
      height: calc(100vh - #{$margin * 2});
    }

    :global(.swiper-slide) {
      height: auto;
    }

    :global(.img-container) {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;

      @include screen-size("phone") {
        justify-content: center;
      }
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

    :global(.slide-img.contain) {
      object-fit: contain;
    }

    :global(.slide-img.cover) {
      object-fit: cover;
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
      // position: absolute;
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
