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
    @include screen-size("small") {
    }
  }
</style>

<div class="slideshow">
  <Swiper>
    {#each slides as slide}
      <SwiperSlide>
        <img
          src={urlFor(slide.asset).quality(80).height(window.innerHeight - 42).url()}
          alt={slide.asset.alt}
        >
      </SwiperSlide>
    {/each}
  </Swiper>
</div>
