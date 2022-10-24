<!--Code inspired from https://github.com/TylerPottsDev/vue-popups-yt-->

<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <h1>Congratulations</h1>
      <h2>Your score was {{score}} </h2>
      <div id="flex-button">
      <button class="popup-close" @click="TogglePopup()">
        Play Again
        </button>
        <router-link
            to="/"
            custom
            v-slot="{ navigate }">
          <button
              @click="navigate"
              role="link">
            Home</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    TogglePopup: null,
    score: null,

  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

}

.popup-inner {
  background: #FFF;
  padding: 32px;
  text-align: center;
}


</style>