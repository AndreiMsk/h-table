import { createApp, markRaw } from 'vue'
import App from './App.vue'

/** importing all css */
import './assets/styles/main.scss'

/** 
 * importing vuex-router 
 * Info: https://router.vuejs.org/
**/
import router from "./router";


/** 
 * importing and instantiating Pinia store
 * Info: https://pinia.vuejs.org/
**/
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(({ store }) => {
    store.$router = markRaw(router)
  });


/** instantiate vue app  */
const app = createApp(App)
app.use(pinia)
app.use(router)


/** mount vue app */
router.isReady().then(() => {
  app.mount("#app");
});