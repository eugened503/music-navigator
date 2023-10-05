import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import piniaPersist from 'pinia-plugin-persist'
import './style.scss'
import App from './App.vue'
import router from './router'
import vLazyLoad from './directives/vLazyLoad'
const pinia = createPinia()

//pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive('lazyLoad', vLazyLoad)
app.mount('#app')

app.config.performance  = true
