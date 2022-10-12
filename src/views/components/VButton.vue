<template>
  <button v-on:click = "onclick" >{{option}}</button>
</template>

<script>
export default {
  name: "VButton",
  props: {
    option: null,
    onclick: null,
    isCorrect: null
  },

  computed: {
    className: function() {
      return this.isCorrect ? 'correct' : 'incorrect'
    }
  },

}
</script>

<style scoped>
.correct {
  background-color: green;
}
.incorrect {
  background-color: red;
}
</style>

