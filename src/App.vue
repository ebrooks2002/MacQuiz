<script>
import TheNavigation from '@/components/TheNavigation.vue'
import IconDocumentation from './components/icons/IconDocumentation.vue';

export default{
  components: { TheNavigation, IconDocumentation }
}
</script>

<template>
  <main> <!-- the nav bar (delete?)-->
    <!-- <TheNavigation/> -->
  </main>
  
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header> -->
  
  <div class = "container">
    <router-view/> <!-- makes the pages visible -->
  </div>
  
</template>

<style>
  /*********** Amelia - nav bar **********
  #nav {
    width: inherit;
    padding: 10px;
    position: sticky;
    background-color: #01426A;
    top: 0;
    -webkit-text-fill-color: white;
  }

  #nav a {
    text-align: center;
    font-weight: bold;
    color: white;
    padding-inline: 25px;
    padding-block: 15px;
  }

  #nav a.router-link-exact-active {
    color: #D44420;
  }
  **********************/
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
