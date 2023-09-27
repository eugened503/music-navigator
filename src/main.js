import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import './style.scss'
import App from './App.vue'
import router from './router'
import vLazyLoad from './directives/vLazyLoad'
const pinia = createPinia()
pinia.use(piniaPersist)
createApp(App).use(pinia).use(router).directive('lazyLoad', vLazyLoad).mount('#app')
