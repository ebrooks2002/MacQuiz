<template>
    <div class="navBar">
<a id="homeBtn">Mac Quiz</a>
</div>
<div class="container">
    <div class = "flexBox" id="image">
        <img src="images/campus-test.jpg">
    </div>
    <div class = "flexBox" id="options">
        <div id="info" >
            Score:1
            <div id="timer"></div>
        </div>

            <button id="option1" class="optionBtn">option1</button>
            <button id="option2" class="optionBtn">option2</button>
            <button id="option3" class="optionBtn">option3</button>
            <button id="option4" class="optionBtn">option4</button>
    </div>

</div>
</template>


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
        height: 300px;
        width: 200px;
        margin: auto;
        margin-top: 20px;
        text-align: center;
    }
    #info{
        width: 200px;
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
        height: 250px;
        margin-top: 62px;
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
    }
    button{
        border-radius: 10px;
        background-color: white;
        width: 85px;
        background-color: #01426a;
        height: 100px;
        margin: 7px;
        box-sizing: border-box;

    }
    button:hover{
        background-color: #A5adaf;
    }

    #next{
        background-color: #D44420;
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
    }



</style>