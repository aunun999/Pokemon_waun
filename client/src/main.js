import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios"

axios.defaults.baseURL = 'https://pokeapi.co/api/v2'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
