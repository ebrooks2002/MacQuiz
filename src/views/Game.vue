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
          null,
          null,
          null,
          null
      ],
      places: [
        "Olin-Rice",
        "Campus Center",
        "Janet Wallace",
        "Leonard Center"
      ],
      image: null,
      correctAns: null
    }
  },
  mounted() {
    this.image = this.randomImg()
    // this.options[0] = this.randomOption()
    // this.options[1] = this.randomOption()
    // this.options[2] = this.randomOption()
    // this.options[3] = this.randomOption()
    this.options[0], this.options[1],this.options[2], this.options[3] = this.randomOption2()
    this.places =[
        "Olin-Rice",
        "Campus Center",
        "Janet Wallace",
        "Leonard Center"
        ]
    this.correctAns = this.correctAnswer()
  },
  methods: {
    toggleDisplay: function() {
      this.display = !this.display
    },
    // randomOption: function() {
    //   let index = Math.floor(Math.random() * this.places.length)
    //   return this.places[index]
    // },
    randomOption2: function() {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4){
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index])){
          arr[i] = places[index]
          i++
        }
      }
      let correctIndex = Math.floor(Math.random() * arr.length)
      arr[correctIndex] = this.correctAns
      return arr
    },
    randomImg: function() {
      let index = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      let path = "src/assets/images/campus-test"
      let img = path + index + ".jpg"
      return img
    },
    nextClick: function() {
      this.toggleDisplay()
      // this.options[0] = this.randomOption()
      // this.options[1] = this.randomOption()
      // this.options[2] = this.randomOption()
      // this.options[3] = this.randomOption()
      let options = this.randomOption2()
      this.options[0] = options[0]
      this.options[1] = options[1]
      this.options[2] = options[2]
      this.options[3] = options[3]
      this.image = this.randomImg()
    },
    correctAnswer: function() {
      return this.image.slice(18, 29)
    }
  }
}

</script>

<style scoped>
<<<<<<< HEAD
    
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

=======
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
  background-color: #c28475;
  text-align: center;
  font-size: 20px;
  height: 600px;
  margin-top: 0px;
  overflow: hidden;
  border-radius: 7%;
  padding: 40px;
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
button:hover{
  background-color: #A5adaf;
}
#next{
  background-color: #D44420;
  position: absolute;
  bottom: 0;
  right: 0;
}
>>>>>>> e2d1b1d94547e6ca681571fc27f4b4ebc3d04288
</style>