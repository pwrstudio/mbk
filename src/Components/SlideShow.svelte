<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor } from "../sanity.js"
  import { Swiper, SwiperSlide } from "swiper/svelte"

  // *** PROPS
  export let slides = []
  export let zoomable = false

  let zoomed = false
  let zoomLevel = 1

  const toggleZoom = e => {
    console.log('togglezoom')
    zoomed = !zoomed
    zoomLevel = zoomLevel === 1 ? 2 : 1
  }

  const scrollThrough = e => {
    console.log('scrollthrough')
    console.log(e)
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
    }

    :global(.zoom-container.zoomed) {
      max-height: 90vh;
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
      cursor: zoom-out;
    }

    @include screen-size("small") {
    }
  }
</style>

<div class="slideshow" class:zoomable={zoomable}>
  <Swiper
    spaceBetween={8}
    on:click={toggleZoom}
    on:mousemove={scrollThrough}
  >
    {#each slides as slide}
      <SwiperSlide>
        {#if zoomable}
          <div
            ref={slide._key}
            class="zoom-container"
            class:zoomed={zoomed}
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
