<style lang="scss">
  @import "../../variables.scss";

  svg {
    &:hover {
      rect {
        fill: $grey;
      }
      @include screen-size("small") {
        rect {
          fill: black;
        }
      }
    }
    &:active {
      rect {
        fill: $grey;
      }
    }
  }
</style>

<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  height="100%"
  viewBox="0 0 40.2 34.3"
  style="overflow:visible;enable-background:new 0 0 40.2 34.3;"
  xml:space="preserve">
  <rect y="26.3" width="40.2" height="8" />
  <rect width="40.2" height="8" />
  <rect y="13.2" width="40.2" height="8" />
</svg>
