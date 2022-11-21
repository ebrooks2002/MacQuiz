<template>
  <div class="navBar">
    <img alt="FunQuizGame Logo" class="logo" src="src/assets/images/logo-test.png" />
    <router-link id="homeBtn" to="/">FunQuizGame</router-link>
  </div>
  <div class="container">
    <finished
        v-if="buttonTrigger"
        :score = "score"
        :TogglePopup = "resetGame"
        :scoreSave = "scoreSaved"
        :scoreSaved = "toggleScoreSavedTrue"
    >
    </finished>
    <div class = "flexBox" id="image">
      <img :src="image">
    </div>
    <div class = "flexBox" id="options">
      <div id="info" >
        Score:{{ score }}
      </div>
      <div class="timerInfo" id="timer">
                 <span id="points"> {{timerCount}}</span>

        <div id="timerVisual" class = "color">

        </div>
      </div>
      <v-button id="option1" :onclick ="optionBtn" :option= "options[0]" class="non" :disabled="display"></v-button>
      <v-button id="option2" :onclick="optionBtn"  :option= "options[1]" class="non" :disabled="display"></v-button>
      <v-button id="option3" :onclick="optionBtn"  :option= "options[2]" class="non" :disabled="display"></v-button>
      <v-button id="option4" :onclick="optionBtn"  :option= "options[3]" class="non" :disabled="display"></v-button>
      <div id = "lives"> lives: {{lives}}</div>
    </div>
    <button v-if="display" v-on:click="nextClick()" id="next"> Next</button>
  </div>
</template>

<script>
import  VButton from "./components/VButton.vue";
import Finished from "./components/Finished.vue"
import { ref } from 'vue';

const TOTAL_NUMBER = 0 //delete
const ALL_PLACES = ["77 Mac",
  "Bell",
  "Campus Center",
  "Carnegie",
  "Chapel",
  "DeWitt Wallace Library",
  "Humanities",
  "Janet Wallace",
  "Kagin",
  "Leonard Center",
  "Link",
  "Markim",
  "Old Main",
  "Olin Rice",
  "Weyerhaeuser",
  "30 Mac",
  "Bigelow",
  "Doty",
  "Dupre",
  "George Draper Dayton",
  "Kirk",
  "Turk",
  "Wallace"]
export default {
  components: {
    "finished": Finished,
    "v-button": VButton
  },
  data() {
    return {
      score: 0,
      display: false,
      randomPlaces: null,
      places: ALL_PLACES,
      imageMap: new Map([
        ["30 Mac", ["00"]],
        ["77 Mac", ["00"]],
        // ["Bell", []],
        ["Bigelow", ["00"]],
        ["Campus Center", ["00", "01"]],
        ["Carnegie", ["00", "01"]],
        //["Chapel", []],
        ["DeWitt Wallace Library", ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]],
        //["Doty", []],
        ["Dupre", ["00", "01", "02", "03"]],
        ["George Draper Dayton", ["00"]],
        ["Humanities", ["00", "01", "02"]],
        ["Janet Wallace", ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"]],
        ["Kagin", ["00", "01"]],
        ["Kirk", ["00", "01"]],
        ["Leonard Center", ["00", "01", "02", "03", "04", "05", "06", "07", "08"]],
        ["Link", ["00"]],
        ["Markim", ["00", "01"]],
        ["Old Main", ["00", "01", "02", "03", "04", "05"]],
        ["Olin Rice", ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]],
        ["Turck", ["00", "01"]],
        ["Wallace", ["00", "01"]],
        ["Weyerhaeuser", ["00", "01", "02", "03", "04"]]
      ]),
      picsUsed: [],
      image: null,
      correctAns: null,
      clickedBtn: null,
      timerCount: 1000,
      stopTimer: false,
      points: 0,
      timer: null,
      isRunning: false,
      lives: 3,
      buttonTrigger: false,
      scoreSaved: false
    }
  },
  created: function () {
    this.isRunning = true
    if (!this.timer) {
      this.timer = setInterval(() => {
        if (this.timerCount > 0) {
          this.timerCount--
        } else {
          this.stop()
          this.optionBtn()
          document.querySelector('#timerVisual').className = ''
        }
      }, 10)
    }
  },
  computed: {
    options() {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4) {
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index]) && places[index] !== this.correctAns) {
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
    this.picsUsed = []
    this.image = this.randomImg()
    this.options[0], this.options[1], this.options[2], this.options[3] = this.randomOption2()
    this.places = ALL_PLACES
    this.correctAns = this.correctAnswer()
    this.randomPlaces = this.randomOption2()

  },
  methods: {
    toggleScoreSavedTrue: function () {
      this.scoreSaved = true
    },

    resetGame: function () {
      this.score = 0
      this.image = null
      this.correctAns = null
      this.clickedBtn = null
      this.timerCount = 1000
      this.stopTimer = false
      this.points = 0
      this.timer = null
      this.isRunning = false
      this.lives = 3
      this.buttonTrigger = false
      this.scoreSaved = false
      this.picsUsed = []
      this.nextClick()
    },
    optionBtn: function (event) {

      this.showCorrectAnswer()
      this.display = !this.display
      this.clickedBtn = (event !== undefined) ? event.target.id : undefined
      this.stopTimer = true
      this.stop()
      this.checkIfCorrect()
      document.querySelector(".color").style.animationPlayState = "paused"
      if (this.lives <= 0)
        this.TogglePopup()


    },
    toggleDisplay: function () {
      this.display = !this.display
    },
    TogglePopup: function () {
      this.buttonTrigger = !this.buttonTrigger
    },
    randomOption2: function () {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4) {
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index]) && places[index] !== this.correctAns) {
          arr[i] = places[index]
          i++
        }
      }
      let correctIndex = Math.floor(Math.random() * arr.length)
      arr[correctIndex] = this.correctAns
      return arr
    },
    randomImg: function () {
      let tag = ""
      let randomImageMap = this.imageMap
      switch (Math.floor(Math.random() * 2)) {
        case 0:
          // randomImageMap = this.imageMap
          tag = "reg"
          break
        case 1:
          // randomImageMap = this.pixelImageMap
          tag = "pix"
          // break
      }
      const imageMap = randomImageMap
      const keys = Array.from(imageMap.keys())
      const buildingName = keys.random()
      const buildingPicutresList = imageMap.get(buildingName)
      const randomImageIndex = Math.floor(Math.random() * buildingPicutresList.length)
      const randomImageName = buildingPicutresList[randomImageIndex]
      const path = "src/assets/images/"
      const img = path + tag + "/" + buildingName + "/" + randomImageName + ".jpg"
      console.log("----------------Break---------------------")
      console.log(img)
      console.log(this.picsUsed)
      console.log(!this.picsUsed.includes(img))
      if (!this.picsUsed.includes(img)) {
        // console.log(img)
        this.picsUsed.push(img)
        return img
      } else {
        return this.randomImg()
      }
    },
    nextClick: function () {
      document.querySelector("#timerVisual").className = ''
      document.querySelector('#timerVisual').offsetWidth
      this.toggleDisplay()
      this.resetClasses()
      this.image = this.randomImg()
      this.correctAns = this.correctAnswer()
      this.start()
      let options = this.randomOption2()
      this.options[0] = options[0]
      this.options[1] = options[1]
      this.options[2] = options[2]
      this.options[3] = options[3]
      this.timerCount = 1000
      this.stopTimer = false

      document.querySelector("#timerVisual").className= "color"
      document.querySelector(".color").style.animationPlayState = "running"


    },
    correctAnswer: function () {
      return this.image.slice(22, this.image.length - 7)
    },
    showCorrectAnswer: function () {
      if (this.options[0] === this.correctAns) {
        document.getElementById("option1").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      } else if (this.options[1] === this.correctAns) {
        document.getElementById("option2").className = "correct"
        document.getElementById("option1").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      } else if (this.options[2] === this.correctAns) {
        document.getElementById("option3").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option1").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      } else if (this.options[3] === this.correctAns) {
        document.getElementById("option4").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option1").className = "incorrect"
      }
    },
    // stopTimerVisual: function () {
    //   if (this.timerCount > 750) {
    //     document.getElementById("timerVisual").className = "timer25"
    //   } else if (this.timerCount > 500) {
    //     document.getElementById("timerVisual").className = "timer50"
    //   } else if (this.timerCount > 250) {
    //     document.getElementById("timerVisual").className = "timer75"
    //   } else {
    //     document.getElementById("timerVisual").className = ""
    //   }
    // },
    resetClasses: function () {
      document.getElementById("option4").className = "non"
      document.getElementById("option2").className = "non"
      document.getElementById("option3").className = "non"
      document.getElementById("option1").className = "non"
    },
    checkIfCorrect: function () {
      if (this.clickedBtn !== undefined) {
        let btn = document.getElementById(this.clickedBtn)
        if (btn.className === 'correct') {
          this.score += this.timerCount
          return
        }
      }
      this.lives--
    },

    start() {
      this.timerCount = 1000
      this.isRunning = true
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.timerCount > 0) {
            this.timerCount--
          } else {
            this.stop()
            this.optionBtn()
          }
        }, 10)
      }
    },
    stop() {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
    },
  }
}
Array.prototype.random = function () { // returns radom item in an array
  return this[Math.floor((Math.random() * this.length))];

}
</script>

<style scoped>
.navBar{
  text-align: left;
  font-size: 3vh;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: #01426a;
  top: 100%;
  color: rgb(184, 184, 184);
  padding: 10px;
  border-radius: 5px;
  min-height: 5vh;

}
#homeBtn{
  text-decoration:none;
  color: hwb(190 75% 1%);
  vertical-align: middle;
  padding: 0;
}
.container{
  margin-top: 50px;
  display: flex;
  margin-left: 50px;
  margin-right: 50px;
  position: center;
  justify-content: center;
  flex-shrink: unset;
}
.flexBox{
  height: 600px;
  width: 500px;
  margin-top: 20px;
  text-align: center;
  padding: 5px
}
#info{
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  font-size: 45px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  margin: auto;
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
  flex-shrink:calc(0)
}
img{
  width: auto;
  height: 100%;
}
#options{
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  flex-shrink: calc(0);
  max-height: 500px;

}
button{
  width: 21vmax;
  background-color: #01426a;
  height: 21vmax;
  max-width: 220px;
  max-height: 220px;
  margin-left: 20px;
  box-sizing: border-box;
  font-size: 3vmin;
  font-family: 'Trebuchet MS','Gill Sans', 'Gill Sans MT', Calibri,  sans-serif;
  border-radius: 15px;
  border-style: double;
  border-width: 5px;
  border-color: rgba(191, 155, 239, 0.554);
  transition-property: width,height,background-color;
  margin: 7px;

  -webkit-text-fill-color: white;
  }
.non:hover{
  background-color: orange;
  transition: 0.2s;
}

#timer{
  position: relative;
  height: 19px;
  width: 90%;
  border: 10px solid #f4a261;
  border-radius: 15px;
  /*padding-left: 20px;*/
  /*margin-left: 10px;*/
  /*margin-top: 10px;*/
  /*font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;*/

}
/*.timerInfo{*/
/*  animation-name: timerAnim;*/
/*  animation-duration: 10s;*/
/*}*/

#points{
  position: absolute;
}

.color{
  background-color: green;
  /*margin: auto;*/
  width: 0px;
  height: 100%;
  margin: 0px;
  border-radius: 6px;

  animation-name: progress;
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-play-state: running;
}

@keyframes progress{
  0%{
    width: 100%;
  }
  25%{
    width: 75%;
  }
  40% {
    background-color: orange;
  }

  50%{
    width: 50%;
    background-color: orange;
  }

  75%{
    width: 25%;
    color: red
  }

  100%{
    width: 0%;
    background-color: red;
  }
}
@keyframes timerAnim {
  0% {color: green}
  40% {color: rgb(80, 138, 80)}
  60% {color: rgb(217, 219, 67)}
  70% {color: rgb(255, 166, 0)}
  75% {color: red} 80% {} 85%{color: red} 90% {color: black}
  92% {color: red} 94% {color: black} 95% {color: red}96%{color: black} 97% {color: red}98%{color: black} 99% {color: red}
}

.timer25{
  background-color: blue;
  width: 75%;
  height: 10px;
  border-radius: 15px;
}
.timer50{
  background-color: blue;
  width: 50%;
  height: 10px;
  border-radius: 15px;
}
.timer75{
  background-color: blue;
  width: 25%;
  height: 10px;
  border-radius: 15px;
}

.logo{
  width: 10vmin;
  padding: 0;
  margin: 0;
  vertical-align: middle;
}
#next{
  width: 170px;
  height: 170px;
  border-style: groove;
  font-size: 3vw;
  background-color: #fc6e4aa4;
  position: absolute;
  bottom: 0;
  right: 0;
  animation: forwards;
  animation-duration: 1s;
}
#next:hover{
  background-color:orangered;
  transition: 0.5s;
}

#lives{
  margin: auto;
  font-size: 30px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}


</style>