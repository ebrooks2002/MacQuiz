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
        Score:{{ score }}
        <div id="timer"></div>
      </div>
      <v-button id="option1" :onclick ="optionBtn" :option= "options[0]" class="" :disabled="display"></v-button>
      <v-button id="option2" :onclick="optionBtn"  :option= "options[1]" class="" :disabled="display"></v-button>
      <v-button id="option3" :onclick="optionBtn"  :option= "options[2]" class="" :disabled="display"></v-button>
      <v-button id="option4" :onclick="optionBtn"  :option= "options[3]" class="" :disabled="display"></v-button>

    </div>
    <button v-if="display" v-on:click="nextClick()" id="next"> Next</button>

  </div>
</template>
<script>
import  VButton from "./components/VButton.vue";
const TOTAL_NUM_PICS = 8
export default {
  components: {
    "v-button":VButton
  },
  data() {
    return {
      score: 0,
      display: false,
      randomPlaces: null,
      places: [
        "Olin-Rice",
        "Campus Center",
        "Janet Wallace",
        "Leonard Center",
        "Old Main",
        "Carnegie",
        "Dupre",
        "Kagin",
        "Weyerhauser"
      ],
      image: null,
      correctAns: null,
      clickedBtn: null
    }
  },
  computed: {
    options() {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4){
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index])  && places[index] !== this.correctAns){
          arr[i] = places[index]
          i++
        }
      }
      let correctIndex = Math.floor(Math.random() * arr.length)
      arr[correctIndex] = this.correctAns
      return arr
    }
  },
  mounted() {
    this.image = this.randomImg()
    this.options[0], this.options[1],this.options[2], this.options[3] = this.randomOption2()
    this.places =[
      "Olin-Rice",
      "Campus Center",
      "Janet Wallace",
      "Leonard Center",
      "Old Main"
    ]
    this.correctAns = this.correctAnswer()
    this.randomPlaces = this.randomOption2()
  },
  methods: {
    optionBtn: function(event) {
      console.log(this.correctAns)
      this.showCorrectAnswer()
      this.display = !this.display
      this.clickedBtn = event.target.id
      this.checkIfCorrect()
    },
    toggleDisplay: function (){
      this.display = !this.display
    },
    randomOption2: function() {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4){
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index]) && places[index] !== this.correctAns){
          arr[i] = places[index]
          i++
        }
      }
      let correctIndex = Math.floor(Math.random() * arr.length)
      arr[correctIndex] = this.correctAns
      return arr
    },
    randomImg: function() {
      let index = Math.floor(Math.random() * TOTAL_NUM_PICS)
      let path = "src/assets/images/"
      let img = path + index + ".jpg"
      return img
    },
    nextClick: function() {
      this.toggleDisplay()
      this.resetClasses()
      console.log(this.places)
      this.image = this.randomImg()
      this.correctAns = this.correctAnswer()
      let options = this.randomOption2()
      this.options[0] = options[0]
      this.options[1] = options[1]
      this.options[2] = options[2]
      this.options[3] = options[3]
    },
    correctAnswer: function() {
      console.log("In if")
      if (this.image.slice(18, this.image.length-4) === '0'){
        console.log("In if")
        return "Carnegie"
      }
      if (this.image.slice(18, this.image.length-4) === '1'){
        console.log("In if")
        return "Dupre"
      }
      if (this.image.slice(18, this.image.length-4) === '2'){
        console.log("In if")
        return "Janet Wallace"
      }
      if (this.image.slice(18, this.image.length-4) === '3'){
        console.log("In if")
        return "Kagin"
      }
      if (this.image.slice(18, this.image.length-4) === '4'){
        console.log("In if")
        return "Leonard Center"
      }
      if (this.image.slice(18, this.image.length-4) === '5'){
        console.log("In if")
        return "Old Main"
      }
      if (this.image.slice(18, this.image.length-4) === '6'){
        console.log("In if")
        return "Olin-Rice"
      }
      if (this.image.slice(18, this.image.length-4) === '7'){
        console.log("In if")
        return "Weyerhauser"
      }
    },
    showCorrectAnswer: function (){
      if (this.options[0] === this.correctAns){
        document.getElementById("option1").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      }
      else if (this.options[1] === this.correctAns){
        document.getElementById("option2").className = "correct"
        document.getElementById("option1").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      }
      else if (this.options[2] === this.correctAns){
        document.getElementById("option3").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option1").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      }
      else if (this.options[3] === this.correctAns){
        document.getElementById("option4").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option1").className = "incorrect"
      }
    },
    resetClasses: function() {
      document.getElementById("option4").className = ""
      document.getElementById("option2").className = ""
      document.getElementById("option3").className = ""
      document.getElementById("option1").className = ""
    },
    checkIfCorrect: function () {
      let btn = document.getElementById(this.clickedBtn)
      if (btn.className === 'correct') {
        this.score++
      }
    }
  }
}
</script>

<style scoped>
.navBar{
  text-align: left;
  background-color: #01426a;
  top: 100%;
  color: rgb(184, 184, 184);
  padding: 5px;
  border-radius: 5px;
  min-height: 30px;
}
#homeBtn{
  text-decoration: none;
  color: white;
}
.container{
  margin-top: 50px;
  display: flex;
}
.flexBox{
  height: 600px;
  width: 500px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  padding: 10px
}
#info{
  width: 100%;
  padding-top: auto ;
  height: 70px;
  box-sizing: border-box;
  font-size: 57px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
}
#image{
clear: both;
  margin-right: 2px;
  margin-top: 0px;
  background-color: #c28475;
  text-align: center;
  font-size: 20px;
  height: 600px;

  overflow: hidden;
  border-radius: 7%;
  padding: 0px;
  border-style: dashed;
  border-width: 3px;
  border-color: rgb(0, 0, 0);
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
  font-size: 41px;
}
/*button:hover{*/
/*  background-color: #A5adaf;*/
/*}*/
#next{
  background-color: #D44420;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>