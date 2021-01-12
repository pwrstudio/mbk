<script>
  // # # # # # # # # # # # # #
  //
  //  COVERSHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import SwiperCore, { Navigation, Pagination } from 'swiper'
  import ArrowLeft from "./Graphics/ArrowLeft.svelte"
  import ArrowRight from "./Graphics/ArrowRight.svelte"
  import { Swiper, SwiperSlide } from 'swiper/svelte'
  import 'swiper/swiper-bundle.css'

  // *** INSTALLATION
  SwiperCore.use([Navigation, Pagination])

  // *** COMPONENTS
  import Cover from "./Cover.svelte"

  // *** PROPS
  export let issues = []
</script>

<style lang="scss">
  @import "../variables.scss";

  .covershow {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 $margin;

    .title {
      font-family: $sans-stack;
      letter-spacing: $title_letter_spacing;

      .line {
        display: block;

        &:first-child {
          margin-bottom: 12px;
        }
      }
    }

    .top,
    .bottom {
      height: 15%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }

    .middle {
      height: 70%;
    }

    .edition {
      text-align: center;
      width: 100%;
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

<div class="covershow">
  <div class="top">
    <h1 class="edition title">
      <span class="line">
        Seneste
      </span>
      <span class="line">
        Nummer
      </span>
    </h1>
  </div>
  <div class="middle">
    <Swiper
      touchRatio={0}
      spaceBetween={20}
      slidesPerView={2}
      navigation={{ prevEl: '.swiper-prev-unique', nextEl: '.swiper-next-unique' }}
      pagination={{ clickable: true }}
    >
      {#each issues as issue}
        <SwiperSlide>
          <Cover {issue} />
        </SwiperSlide>
      {/each}
    </Swiper>
    <div class="swiper-controls-unique swiper-prev-unique">
      <ArrowLeft />
    </div>
    <div class="swiper-controls-unique swiper-next-unique">
      <ArrowRight />
    </div>
  </div>
  <div class="bottom">
    <!-- Bottom -->
  </div>
</div>
