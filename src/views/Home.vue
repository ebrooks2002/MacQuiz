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

</style>