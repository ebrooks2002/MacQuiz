<script>
import TheNavigation from '@/components/TheNavigation.vue'
// import VButton from "src/views/components/VButton";
export default{
  components: {TheNavigation}
}
import "animate.css"
</script>

<template>
  <main> <!-- the nav bar (delete?)-->
    <!-- <TheNavigation/> -->
  </main>
  
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header> -->
  
  <div class = "container">
    <router-view></router-view> <!-- makes the pages visible -->
  </div>
  
</template>

<style>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
