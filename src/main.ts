import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const store = createPinia()
createApp(App).use(store).use(router).mount('#app')
