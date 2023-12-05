import './assets/main.scss'
import { createPinia } from 'pinia';
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './assets/font/font.css'
import initSvgIcon from './assets/svg/index';
import "virtual:svg-icons-register"

const app = createApp(App)
const pinia = createPinia();


app.use(router)
app.use(initSvgIcon)
app.use(pinia)


app.mount('#app')
