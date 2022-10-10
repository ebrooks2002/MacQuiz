<template>
    <div class="navBar">
  <router-link id="homeBtn" to="/">Mac Quiz</router-link>
</div>
<div class="container">
    <div class = "flexBox" id="image">
        <img :src="image">
    </div>
    <div class = "flexBox" id="options">
        <div id="info" >
            Score:1
            <div id="timer"></div>
        </div>

            <button id="option1" v-on:click="toggleDisplay()" class="optionBtn">{{ options[0] }}</button>
            <button id="option2" v-on:click="toggleDisplay()" class="optionBtn">{{ options[1] }}</button>
            <button id="option3" v-on:click="toggleDisplay()" class="optionBtn">{{ options[2] }}</button>
            <button id="option4" v-on:click="toggleDisplay()" class="optionBtn">{{ options[3] }}</button>
    </div>
    <button v-if="display" v-on:click="nextClick()" id="next"> Next</button>

</div>
</template>

<script>
export default {
  data() {
    return {
      display: false,
      options: [
          "option 1",
          "option 2",
          "option 3",
          "option 4"
      ],
      places: [
          "Olin-Rice",
          "Campus Center",
          "Janet Wallace",
          "Leonard Center"
      ],
      image: this.randomImg()
    }
  },
  methods: {
    toggleDisplay: function() {
      this.display = !this.display
    },
    randomOption: function() {
      let index = Math.floor(Math.random() * this.places.length)
      return this.places[index]
    },
    randomImg: function() {
      let index = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      let path = "src/assets/images/campus-test"
      let img = path + index + ".jpg"
      return img
    },
    nextClick: function() {
      this.toggleDisplay()
      this.options[0] = this.randomOption()
      this.options[1] = this.randomOption()
      this.options[2] = this.randomOption()
      this.options[3] = this.randomOption()
      this.image = this.randomImg()

    }
  }
}

// const app = createApp({
//   el: 'option1',
//
//   data: {
//     return{
//       display: false,
//     }
//   },
//     methods: {
//       optionBtn: function() {
//         document.getElementById("next").display = "block"
//       }
//     }
//   })
</script>

<style scoped>
    
    .navBar{
        text-align: left;
        background-color: #01426a;
        top: 100%;
        color: white;
        padding: 5px;
    }
    #homeBtn{
        text-decoration: none;
        color: white;

    }
    .container{
        display: flex;
        margin: auto;
    }
    .flexBox{
        height: 600px;
        width: 500px;
        margin: auto;
        margin-top: 20px;
        text-align: center;
    }
    #info{
        width: 100%;
        padding-top: 25px;
        height: 70px;
        box-sizing: border-box;
    }
    #image{
        clear: both;
        margin-right: 2px;
        background-color: #D44420;
        text-align: center;
        font-size: 20px;
        height: 600px;
        margin-top: 0px;
        overflow: hidden;
    }
    img{
        width: auto;
        height: 100%;
    }
    #options{
        margin-left: 2px;
        display: flex;
        flex-wrap: wrap;
      align-content: stretch;
    }
    button{
        border-radius: 10px;
        width: 200px;
        background-color: #01426a;
        height: 200px;
        margin-left: 7px;
        margin-right: 7px;
        box-sizing: border-box;

    }
    button:hover{
        background-color: #A5adaf;
    }

    #next{
        background-color: #D44420;
        position: absolute;
        bottom: 0;
        right: 0;
    }

</style>