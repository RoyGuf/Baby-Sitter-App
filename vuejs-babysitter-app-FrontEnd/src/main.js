import { createApp } from 'vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'
import VueCookies from 'vue3-cookies'



createApp(App)
  .use(router)
  .use(store)
  .use(VueCookies)
  .mount('#app')


