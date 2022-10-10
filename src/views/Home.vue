<script>

</script>

<template>
    <div class = "home">
        <h1>Home</h1>
        <h2>Welcome to the best new Macalester game!</h2>

        <!-- https://codingbeautydev.com/blog/vue-router-link-button/ -->
        <router-link
            to="/game"
            custom
            v-slot="{ navigate }">
                <button
                @click="navigate"
                role="link">
                    Play the game!</button>
        </router-link>
    </div>
</template>

<style>
    body{background-color:#d9ecff;}

    .home{
        text-align: center;
        font-family: "Trebuchet MS";
        font-style: unset;
        font-size: larger;
    }

    button{
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        width: 150px;
        background-color: #01426A;
        height: 50px;
        margin: 7px;
        box-sizing: border-box;
        -webkit-text-fill-color: white;

    }
    button:hover{
        background-color: #3d7ba1;
    }

</style>