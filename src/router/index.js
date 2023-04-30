import { createRouter,createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import CreateEmployer  from "../views/CreateEmployer.vue";
import EditEmployer from "../views/EditEmployer.vue"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', 
            name: 'home', 
            component: () => HomeView
        },
        {
            path: '/create/employer',
            name: 'createEmployer',
            component: CreateEmployer
        },
        {
            path: '/edit/employer/:id',
            name: 'editEmployer',
            component: EditEmployer
        }
    ]
})

export default router