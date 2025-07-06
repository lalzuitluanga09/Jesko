import './assets/main.css'
import '@mdi/font/css/materialdesignicons.min.css';
// import '@splidejs/vue-splide/css';
import '@splidejs/splide/css/skyblue';
// import '@splidejs/vue-splide/css/sea-green';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

// import VueSelect from "vue-select"

// import VueSplide from '@splidejs/vue-splide'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)

// app.use( VueSplide );
// app.component("v-select", VueSelect)

app.mount('#app')
