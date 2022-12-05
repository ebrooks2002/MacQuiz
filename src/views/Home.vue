<template>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Stalinist+One&display=swap" rel="stylesheet">  </head>
  <div class = "home">
        <h1 class="header">Fun Quiz Game</h1>
        <!-- https://codingbeautydev.com/blog/vue-router-link-button/ -->
        <!-- <img alt="FunQuizGame Logo" class="logo" src="src/assets/images/logo.png" width="125" height="125" /> -->
        <router-link
            to="/game"
            custom
            v-slot="{ navigate }">
                <button
                    :disabled="level === ''"
                    @click="navigate"
                    role="link"
                    id="hb">
                    Play!
                </button>
        </router-link>
    <select class="levels" v-model="level">
      <option class = "levels" disabled value="">Select a difficulty</option>
      <option class="levels" value="easy">easy</option>
      <option class="levels" value="medium">medium</option>
      <option class="levels" value="hard">hard</option>
    </select>
    </div>
</template>

<script>
export default {
  data() {
    return{
      level: ''
    }
  },
  watch: {
    level: function (value) {
      if (this.level === "easy"){
        console.log("entered")
        this.$store.commit('easy')
      }
      else if (this.level === "medium"){
        this.$store.commit('medium')
      }
      else if (this.level === "hard"){
        this.$store.commit('hard')
      }

    }
  }
}
</script>
<style>
    @font-face {
      font-family: Diplomata;
      src: url("https://fonts.google.com/specimen/Diplomata?thickness=9");
    }
    body{background-color:#d9ecff;}
    .home{
        text-align: center;
        font-family: "Trebuchet MS";
        font-style: unset;
        font-size: larger;
    }

    #hb{
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      width: 10%;
      background-color: #01426A;
      height: 50px;
      box-sizing: border-box;
      -webkit-text-fill-color: white;

      position: absolute;
      top: 50%;
      left: -70%;
      transform: translate(-50%, -50%);
      overflow: hidden;

      animation-name: slidein;
      animation-duration: 2s;
      animation-delay: 2s;
      animation-fill-mode: forwards;
    }
    button:hover{
        background-color: #3d7ba1;
    }
    .header{
      font-family: Stalinist One;
      position: absolute;
      animation-name: fadein;
      animation-duration: 2s;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .levels{
      border-radius: 10px;
      width: 8%;
      /*background-color: rgb(255, 255, 255);*/
      /*width: 150px;*/
      /*background-color: #01426A;*/
      /*height: 50px;*/
      /*box-sizing: border-box;*/
      /*-webkit-text-fill-color: white;*/
      position: absolute;
      top: 50%;
      right: -20%;
      transform: translate(-50%, -50%);
      text-align: center;
      animation-name: slideinRT;
      animation-duration: 2s;
      animation-delay: 2s;
      animation-fill-mode: forwards;

    }
    @keyframes fadein {
      0%{
        opacity: 0;
      }
      100%{
        opacity: 100%;
      }

    }

    @keyframes slidein {
      0% {
        left: -20%;
      }
      100%{
        left: 45%;
      }

    }
    @keyframes slideinRT {
      0% {
        right: -20%;
      }
      100%{
        right: 37%;
      }

    }
</style>