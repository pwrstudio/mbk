<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor } from "../sanity.js"
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { tick } from "svelte"
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
  let maxHeight = 'auto'

  $: {
    swiperInstance = swiper
  }

  const toggleZoom = e => {
    const rect = swiperInstance.clickedSlide.getBoundingClientRect()
    maxHeight = rect.height + 'px'

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

    const fracX = (x / rect.width)
    const fracY = (y / rect.height)

    const toX = fracX * (scrollW - rect.width)
    const toY = fracY * (scrollH - rect.height)

    e.currentTarget.scrollLeft = toX
    e.currentTarget.scrollTop = toY
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    height: auto;
    overflow: hidden;

    .zoomLevel {
      .button {
        cursor: pointer;
      }
    }

    :global(.swiper-container) {
      height: 100%;
    }

    :global(.zoom-container) {
      overflow: scroll;
      cursor: zoom-in;
      scroll-behavior: unset;
    }

    :global(.slide-img) {
      width: 100%;
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

    @include screen-size("small") {
    }
  }
</style>

<div class="slideshow" class:zoomable={zoomable}>
  <Swiper
    spaceBetween={8}
    autoHeight={true}
    on:click={toggleZoom}
    on:swiper={(e) => swiper = e.detail[0]}
  >
    {#each slides as slide}
      <SwiperSlide>
        {#if zoomable}
          <div
            ref={slide._key}
            class="zoom-container"
            class:zoomed={zoomed}
            style="max-height: {maxHeight};"
            on:mousemove={scrollThrough}
          >
            <img
              class="slide-img"
              class:zoomed={zoomed}
              src={urlFor(slide.asset).quality(80).width((window.innerWidth) * 2).url()}
              alt={slide.asset.alt}
            >
          </div>
        {:else}
            <img
              class="slide-img"
              src={urlFor(slide.asset).quality(80).height(window.innerHeight - 42).url()}
              alt={slide.asset.alt}
            >
        {/if}
      </SwiperSlide>
    {/each}
  </Swiper>

  {#if zoomable}
    <div class="zoomLevel">
      <span class="button" on:click={toggleZoom}>
        {`${zoomLevel * 100}%` }[±]
      </span>
    </div>
  {/if}
</div>
