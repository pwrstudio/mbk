<style lang="scss">
  @import "../../variables.scss";

  svg {
    overflow: visible;

    &:hover {
      rect {
        fill: $grey_solid;
      }
      @include screen-size("small") {
        rect {
          fill: black;
        }
      }
    }
    &:active {
      rect {
        fill: $grey_solid;
      }
    }
  }
</style>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 33.24 64.33"><defs></defs><g class="cls-2"><polyline class="cls-3" points="0.53 0.53 32.19 32.16 0.53 63.8"/></g></svg>