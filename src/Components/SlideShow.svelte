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
</script>

<style lang="scss">
  @import "../variables.scss";

  .slideshow {
    height: 100%;
    overflow: hidden;

    :global(.swiper-container) {
      height: 100%;
    }

    :global(.slide-img) {
      width: 100%;
    }
    @include screen-size("small") {
    }
  }
</style>

<div class="slideshow">
  <Swiper spaceBetween={8}>
    {#each slides as slide}
      <SwiperSlide>
        <img
          class="slide-img"
          src={urlFor(slide.asset).quality(80).height(window.innerHeight - 42).url()}
          alt={slide.asset.alt}
        >
      </SwiperSlide>
    {/each}
  </Swiper>
</div>
