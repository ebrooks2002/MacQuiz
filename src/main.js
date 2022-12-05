import{ createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

const vuexLocal = new VuexPersistence({
    storage: localForage,
    asyncStorage: true,
});
const store = new Vuex.Store({

    state: {level: null},

    plugins: [vuexLocal.plugin],

    mutations: {
        main(state){
            state.level = null
        },
        easy(state) {
            state.level = 'easy'
        },

        medium(state) {
            state.level = 'medium'
        },

        hard(state) {
            state.level = 'hard'
        }
    }


})

router.beforeEach(async (to, from, next) => {
    await store.restored;
    next();
});
createApp(App)
.use(router).use(store)
.mount('#app')

export default store