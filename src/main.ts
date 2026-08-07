import './assets/main.css'
import './styles/variables.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

console.log('Current API URL:', import.meta.env.VITE_API_URL)
console.log('App Title:', import.meta.env.VITE_APP_TITLE)
