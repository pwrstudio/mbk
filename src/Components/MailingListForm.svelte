<script>
  // # # # # # # # # # # # # # # #
  //
  //   MAILING LIST FORM
  //
  // # # # # # # # # # # # # # # #
</script>

<div class="mailing-list-form">
  <form
    action="https://platformlabor.us4.list-manage.com/subscribe/post?u=da38117a47595407af0640dad&id=75a37b8376"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    class="validate"
    target="_blank"
    novalidate
  >
    <div id="mc_embed_signup_scroll">
      <div class="mc-field-group main-group">
        <input
          type="email"
          placeholder="E-mail adresse"
          value=""
          name="EMAIL"
          class="required email"
          id="mce-EMAIL"
        />
      </div>
      <div id="mce-responses" class="clear">
        <div class="response" id="mce-error-response" style="display:none" />
        <div class="response" id="mce-success-response" style="display:none" />
      </div>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input
          type="text"
          name="b_da38117a47595407af0640dad_75a37b8376"
          tabindex="-1"
          value=""
        />
      </div>
      <div class="clear">
        <input
          type="submit"
          value="Subscribe"
          name="Subscribe"
          id="mc-embedded-subscribe"
          class="button"
        />
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  @import "../variables.scss";

  .mailing-list-form {
    .button {
      height: 3em;
      border: 1px solid black;
      background: black;
      color: white;
      width: 100%;
      margin-top: 3px;
      text-decoration: none;
      cursor: pointer;
      line-height: $line-height;
      font-family: $sans-stack;
      font-size: $font_size_small;
    }
    .main-group {
      input {
        display: block;
        line-height: $line-height;
        font-family: $sans-stack;
        font-size: $font_size_small;
        background: $grey_solid;
        padding-left: 0.4em;
        padding-right: 0.4em;
        height: 2em;
        border: none;
        // width: 50ch;
        width: calc(100% - 0.8em);

        &::placeholder {
          text-align: center;
        }
      }
    }
  }
</style>
