<script>
  // # # # # # # # # # # # # #
  //
  //  Coverslider
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import SwiperCore, { Navigation, Pagination } from "swiper"
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import "swiper/swiper-bundle.css"
  import "swiper/components/navigation/navigation.css"
  import "swiper/components/pagination/pagination.min.css"

  // *** INSTALLATION
  SwiperCore.use([Navigation, Pagination])

  // *** COMPONENTS
  import Cover from "./Cover.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"

  // *** PROPS
  export let issues = []

  let vw = window.innerWidth

  const onSwiper = (swiper) => {
    console.log(swiper)
  }
</script>

<svelte:window bind:innerWidth={vw} />

<div class="coverslider">
  <!--       -->
  <!-- TITLE -->
  <!--       -->
  <div class="top">
    <h1 class="edition title">
      <span class="line">Seneste</span>
      <span class="line">Nummer</span>
    </h1>
  </div>
  <!--           -->
  <!-- END TITLE -->
  <!--           -->

  <div class="middle">

    <!--          -->
    <!-- CONTROLS -->
    <!--          -->
    <div class="custom-controls-prev">
      <ArrowLeft />
    </div>
    <div class="custom-controls-prev-mobile">
      <ArrowLeft />
    </div>
    <!--              -->
    <!-- END CONTROLS -->
    <!--              -->



    <!--         -->
    <!-- DESKTOP -->
    <!--         -->
    <div class="swiper-desktop">
      <Swiper
        touchRatio={0}
        navigation={{
          type: 'bullets',
          clickable: true,
          prevEl: ".custom-controls-prev",
          nextEl: ".custom-controls-next",
        }}
        pagination={{ el: ".custom-pagination" }}
        slidesPerView={2}
        spaceBetween={10.5}
        on:swiper={onSwiper}
      >
        {#each issues as issue}
          <SwiperSlide>
            <Cover {issue} />
          </SwiperSlide>
        {/each}
      </Swiper>
    </div>
    <!--             -->
    <!-- END DESKTOP -->
    <!--             -->



    <!--        -->
    <!-- MOBILE -->
    <!--        -->
    <div class="swiper-mobile">
      <!-- Yes touching -->
      <Swiper
        touchRatio={1}
        navigation={{
          type: 'bullets',
          clickable: true,
          prevEl: ".custom-controls-prev-mobile",
          nextEl: ".custom-controls-next-mobile",
        }}
        pagination={{ el: ".custom-pagination-mobile" }}
        slidesPerView={1}
        spaceBetween={10.5}
        on:swiper={onSwiper}
      >
        {#each issues as issue}
          <SwiperSlide>
            {#if vw > 400}
              <Cover {issue} />
            {:else}
              Custom solution
            {/if}
          </SwiperSlide>
        {/each}
      </Swiper>
    </div>
    <!--            -->
    <!-- END MOBILE -->
    <!--            -->



    <!--          -->
    <!-- CONTROLS -->
    <!--          -->
    <div class="custom-controls-next">
      <ArrowRight />
    </div>
    <div class="custom-controls-next-mobile">
      <ArrowRight />
    </div>
    <!--              -->
    <!-- END CONTROLS -->
    <!--              -->

  </div>

  <!--            -->
  <!-- PAGINATION -->
  <!--            -->
  <div class="bottom">
    <div class="custom-pagination" />
    <div class="custom-pagination-mobile" />
  </div>
  <!--                -->
  <!-- END PAGINATION -->
  <!--                -->
</div>

<style lang="scss">
  @import "../variables.scss";

  /** Swiper Desktop */
  .custom-controls-prev,
  .custom-controls-next,
  .custom-pagination,
  .swiper-desktop {
    @include screen-size("medium") {
      display: none;
    }

    display: block;
  }

  /** Swiper Mobile */
  .custom-controls-prev-mobile,
  .custom-controls-next-mobile,
  .custom-pagination-mobile,
  .swiper-mobile {
    display: none;

    @include screen-size("medium") {
      display: block;
    }
  }

  /** coverslider */
  .coverslider {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    user-select: none;
    padding: 0;
    overflow: hidden;

    :global(.swiper-container) {
      width: $coverslider_2;
    }

    :global(.swiper-slide) {
      width: 400px !important;
    }

    /** Smaller screens */
    @include screen-size("medium") {
      :global(.swiper-container) {
        width: $coverslider_1;
        overflow: hidden;
      }
    }

    .title {
      font-family: $sans-stack;
      letter-spacing: $title_letter_spacing;

      .line {
        display: block;
        font-size: $font_size_small;

        &:first-child {
          margin-bottom: 6px;
        }
      }
    }

    .top,
    .bottom {
      height: 10%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      :global(.swiper-pagination-bullet) {
        background: $black;
        opacity: 1;
        margin: 0 $margin / 6;
      }

      :global(.swiper-pagination-bullet.swiper-pagination-bullet-active) {
        background: $green;
      }
    }

    .middle {
      height: 80%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      .swiper-desktop {
        min-width: 808px;
      }

      .custom-controls-prev,
      .custom-controls-next,
      .custom-controls-prev-mobile,
      .custom-controls-next-mobile {
        width: 40px;
        margin: 0 $margin / 2;
        cursor: pointer;
      }

      :global(.custom-controls-prev.swiper-button-disabled),
      :global(.custom-controls-next.swiper-button-disabled),
      :global(.custom-controls-prev-mobile.swiper-button-disabled),
      :global(.custom-controls-next-mobile.swiper-button-disabled) {
        opacity: 0.2;
      }
    }

    .edition {
      text-align: center;
      width: 100%;
      padding-left: 20px;
    }
  }
</style>
