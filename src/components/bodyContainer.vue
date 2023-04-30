<template>
    <div class="container mx-auto">
        <div class="py-12 bg-white">
            <div class="lg:text-center">
                <h1 class="font-medium text-[22px]">Employed list</h1>
            </div>
            <div class="sm:w-3/5 mx-auto mt-8 px-2">
                <TableEmployers></TableEmployers>
            </div>
        </div>
        
    </div>
</template>
<script lang="ts" setup>
import TableEmployers from './tableEmployers.vue';

</script>