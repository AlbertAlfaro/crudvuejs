import { createApp } from 'vue'

import App from './App.vue'
import router from './router';
import ErrorAlert from './components/ErrorAlert.vue'
import SuccessAlert from './components/SuccessAlert.vue'
import heders from './components/heders.vue'
import './assets/main.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import DataTable from 'datatables.net-vue3'

const app = createApp(App);
app.component('ErrorAlert', ErrorAlert);
app.component('SuccessAlert', SuccessAlert);
app.component('heders', heders);
app.component('DataTable', DataTable);
app.use(Toast);
app.use(router);
app.mount('#app')
