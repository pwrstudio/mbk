<script>
  // # # # # # # # # # # # # #
  //
  //  COVERSHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import SwiperCore, { Navigation, Pagination } from "swiper"
  // import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  // import ArrowRight from "./Graphics/ArrowRight.svelte"
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import "swiper/swiper-bundle.css"
  import "swiper/components/navigation/navigation.css"
  import "swiper/components/pagination/pagination.css"

  // *** INSTALLATION
  SwiperCore.use([Navigation, Pagination])

  // *** COMPONENTS
  import Cover from "./Cover.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"

  // *** PROPS
  export let issues = []

  const onSwiper = swiper => {
    console.log(swiper.detail[0])
  }
</script>

<div class="covershow">
  <div class="top">
    <h1 class="edition title">
      <span class="line">Seneste</span>
      <span class="line">Nummer</span>
    </h1>
  </div>
  <div class="middle">
    <div class="custom-controls-prev">
      <ArrowLeft />
    </div>
    <div>
      <Swiper
        touchRatio={0}
        spaceBetween={10.5}
        slidesPerView={2}
        navigation={{
          prevEl: ".custom-controls-prev",
          nextEl: ".custom-controls-next",
        }}
        pagination={{ el: ".custom-pagination" }}
        on:swiper={onSwiper}
      >
        {#each issues as issue}
          <SwiperSlide>
            <Cover {issue} />
          </SwiperSlide>
        {/each}
      </Swiper>
    </div>
    <div class="custom-controls-next">
      <ArrowRight />
    </div>
  </div>
  <div class="bottom">
    <div class="custom-pagination" />
  </div>
</div>

<style lang="scss">
  @import "../variables.scss";

  .covershow {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 $margin;
    user-select: none;

    :global(.swiper-container) {
      width: 808px !important;
    }

    :global(.swiper-slide) {
      width: 400px !important;
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

      .custom-controls-prev,
      .custom-controls-next {
        width: 40px;
        margin: 0 $margin / 2;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      :global(.custom-controls-prev.swiper-button-disabled),
      :global(.custom-controls-next.swiper-button-disabled) {
        opacity: 0.2;
      }
    }

    .edition {
      text-align: center;
      width: 100%;
      padding-left: 20px;
    }

    .swiper-controls-unique {
      position: absolute;
      z-index: 10000000;
      width: 60px;
      height: auto;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .swiper-prev-unique {
      left: 0;
      right: auto;
    }

    .swiper-next-unique {
      right: 0;
      left: auto;
    }

    @include screen-size("small") {
    }
  }
</style>
