/* Web Router info from:
 * mostly used video (second link)
 * https://router.vuejs.org/guide/#javascript
 * https://vueschool.io/lessons/installing-and-setting-up-vue-router-with-vite-vite-only
 */
import {createRouter, createWebHashHistory} from 'vue-router'

import Home from '../views/Home.vue'
import Game from '../views/Game.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

export default router