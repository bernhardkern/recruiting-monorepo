import '@/assets/main.css'
// import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import '@/assets/themes/md-dark-iits/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'

import apiNamespacePlugin from '@/plugins/api-namespace'
import router from '@/router'

import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(ToastService)
app.use(router)

apiNamespacePlugin.install(app)

app.mount('#app')
