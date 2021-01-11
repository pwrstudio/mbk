<script>
  // # # # # # # # # # # # # #
  //
  //  COVERSHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Swiper, SwiperSlide } from 'swiper/svelte';

  // *** COMPONENTS
  import Cover from "./Cover.svelte"

  // *** PROPS
  export let issues = []
</script>

<style lang="scss">
  @import "../variables.scss";
  @import 'swiper/swiper.scss';

  .covershow {
    width: 100%;
    height: 100%;

    :global(.swiper-container) {
      height: 100% !important;
      background-color: red;

    }

    :global(.swiper-wrapper) {
      height: 100%;
      background: yellow;
    }

    @include screen-size("small") {
    }
  }
</style>

<div class="covershow">
  <Swiper
    spaceBetween={120}
    slidesPerView={2}
    on:slideChange={() => console.log('slide change')}
    on:swiper={(e) => console.log(e.detail[0])}
  >
    <SwiperSlide>
      One
    </SwiperSlide>
    <SwiperSlide>
      One
    </SwiperSlide>
    <SwiperSlide>
      One
    </SwiperSlide>
    <SwiperSlide>
      One
    </SwiperSlide>
    <!-- {#each issues as issue}
      <SwiperSlide>
        <Cover {issue} />
      </SwiperSlide>
    {/each} -->
  </Swiper>
</div>
