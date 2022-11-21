<script>
export default {
//
}
</script>
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
                @click="navigate"
                role="link"
                id="hb">
                    Play!</button>
        </router-link>
    </div>
</template>

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
      width: 150px;
      background-color: #01426A;
      height: 50px;
      box-sizing: border-box;
      -webkit-text-fill-color: white;

      position: absolute;
      top: 50%;
      left: -50%;
      overflow: hidden;
      transform: translate(-50%, -50%);
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
        left: 50%;
      }

    }
</style>