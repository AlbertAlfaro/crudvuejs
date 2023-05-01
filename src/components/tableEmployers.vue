<template>
    <a href="/create/employer">

        <button type="button" class="text-white my-2 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create
        </button>
    </a>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                #
            </th>
            <th scope="col" class="px-6 py-3">
                Name
            </th>
            <th scope="col" class="px-6 py-3">
                Email
            </th>
            <th scope="col" class="px-6 py-3">
                Phone
            </th>
            <th scope="col" class="px-6 py-3">
                Level
            </th>
            <th scope="col" class="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    <tbody>

        <tr v-for="(e,index ) in employers" :key="e.id"  class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td class="px-6 py-4">
                {{ e.id }}
            </td>
            <td class="px-6 py-4">
                {{ e.name }}
            </td>
            <td class="px-6 py-4">
                {{ e.email }}
            </td>
            <td class="px-6 py-4">
                {{ e.phone }}
            </td>
            <td class="px-6 py-4">
                {{ e.description }}
            </td>
            <td class="px-6 py-4">
                
                <button @click="editEmployer(e.id)" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                
                <button @click="deleteEmployers(e.id,index)" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
            </td>
        </tr>
    </tbody>
</table>
        
   
    </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { useToast } from "vue-toastification";

export default defineComponent({
    name:'CounterOption',
    component:{},
    data(){
        employers:[];
        const columns = [
        { data: 'id',title:'#' },
        { data: 'name',title:'#' },
        { data: 'email',title:'#' },
        { data: 'phone',title:'#' },
        { data: 'description' ,title:'#'},
        ];

        return {
            employers:[],
            columns:[],
        }
    },
   
    created(){
        this.getEmployers()
        console.log(this.data)
    },
    methods: {
        async getEmployers(){
            let serve = import.meta.env.VITE_API_URL;
            let url = serve+"/api/get/employers";

            const response = await fetch(url);
            if(response.ok){
                const employersData = await response.json();
                console.log(employersData);
                this.employers = employersData;

            }else{
                alert('Error HTTP '+response.status);
            }
        
        },
        async editEmployer(id:any){
            this.$router.push('/edit/employer/'+id);
            
        },

        async deleteEmployers(id: any,index: any){
            let serve = import.meta.env.VITE_API_URL;
            let url = serve+"/api/delete/employer/"+id;

            
            const response = await fetch(url,
            {
                method: 'DELETE',
            }
            );
            if(response.ok){
                this.employers.splice(index, 1);
                this.alertSuccess()

            }else{
                this.alertDanger(response.status);
                //alert('Error HTTP '+response.status);
            }
        
        },

        alertSuccess(){

            // Get toast interface
            const toast = useToast();

            // or with options
            toast.success("Employee successfully removed", {
            timeout: 2000
            });
            // These options will override the options defined in the "app.use" plugin registration for this specific toast

            // Make it available inside methods
            return { toast }

        },

        alertDanger(error:any){

            // Get toast interface
            const toast = useToast();

            // or with options
            toast.error("Internal Error "+error, {
            timeout: 2000
            });
            // These options will override the options defined in the "app.use" plugin registration for this specific toast

            // Make it available inside methods
            return { toast }

        }
        
    },
})
</script>