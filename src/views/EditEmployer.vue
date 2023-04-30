<template>
    <heders/>
    <div class="container mx-auto">
        <div class="py-12 bg-white">
            <div class="lg:text-center">
                <h1 class="font-medium text-[22px]">Edit Employed</h1>
            </div>
            <div class="sm:w-3/5 mx-auto mt-8 px-2">
                <ErrorAlert v-if="mgs"></ErrorAlert>
                <SuccessAlert v-if="success"></SuccessAlert>
        
                <form ref="anyName" @submit.prevent="updateEmployer" >
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" v-model="employerName" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a name">
                        <span class="text-red-500 text-sm" v-if="v$.employerName.$error">{{v$.employerName.$errors[0].$message}}</span>
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a email" >
                        <span class="text-red-500 text-sm" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</span>
                    </div>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="text" v-model="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a phone" >
                        <span class="text-red-500 text-sm" v-if="v$.phone.$error">{{v$.phone.$errors[0].$message}}</span>
                    </div>
                    <div class="mb-6">
                        <label for="level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                        
                        <select id="level" v-model="id_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select...</option>
                            <option v-for="l in level" :key="l.id" v-bind:value="l.id">{{ l.description }}</option>
                           
                        </select>
                        <span class="text-red-500 text-sm" v-if="v$.id_level.$error">{{v$.id_level.$errors[0].$message}}</span>
                    </div>
                    
                    <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                    <a href="/">

                        <button type="button" class="lg:mx-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Cancel</button>
                    </a>
                </form>

            </div>
            

        </div>
        
    </div>
    
</template>
<script lang="ts" >
import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { defineComponent } from 'vue';
import ErrorAlert from '../components/ErrorAlert.vue';
import heders from '../components/heders.vue';

export default defineComponent({
    name:'CounterOption',
    
    data(){
        
        return {
            v$: useValidate(),
            level:[],
            employerName:'',
            email:'',
            phone:'',
            id_level:'',
            mgs:false,
            success:false,
            post:false,
            id: this.$route.params.id,
            employer:''
            
        }
    },
    validations() {
        return {
            employerName: { required,minLength: minLength(6) },
            email: { required,email },
            phone: { required,minLength: minLength(10) },
            id_level: { required },
        };
  },
  
    created(){
        this.getLevel();
        this.getEmployer();
    },
    methods: {
        async getEmployer(){
            let serve = import.meta.env.VITE_API_URL;
            let url = serve+"/api/get/employer/"+this.id;

            const response = await fetch(url);
            if(response.ok){
                const employerData = await response.json();
                this.employer = employerData;
                console.log(this.employer);
                this.employerName=this.employer.name;
                this.email= this.employer.email;
                this.phone = this.employer.phone;
                this.id_level = this.employer.id_level;

            }else{
                alert('Error HTTP '+response.status);
            }

        },
        async getLevel(){
            let serve = import.meta.env.VITE_API_URL;
            let url = serve+"/api/get/level";

            const response = await fetch(url);
            if(response.ok){
                const levelData = await response.json();
                //console.log(employersData);
                this.level = levelData;

            }else{
                alert('Error HTTP '+response.status);
            }
        
        },
        async updateEmployer(){
            this.v$.$validate()
            console.log(this.employerName+' '+this.email+' '+this.phone+' '+this.id_level);
            
            if (!this.v$.$error) {

                let serve = import.meta.env.VITE_API_URL;
                let url = serve+"/api/update/employer";
            
                const response = await fetch(
                    url,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            id_employer:this.id,
                            name:this.employerName,
                            email:this.email,
                            phone:this.phone,
                            level:this.id_level
                        }),
                        headers:{
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    }
                
                );
                if(response.ok){

                    this.success=true;
                    this.mgs=false;
                    this.v$.$reset();
                    //this.resetInput();
                }else{
                    alert('Error HTTP '+response.status);
                }

                
            
            }else{
                this.mgs=true;
            }
            


        },
        
        resetInput() {
            this.mgs=false;
            this.employerName=""
            this.email= "";
            this.phone = "";
            this.id_level = "";
      
        },
       
        
    },
})
</script>