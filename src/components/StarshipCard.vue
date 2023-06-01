<script setup>
const starships = defineProps(['starships']);
</script>

<template>
    <div
        class="flex flex-col px-7 justify-center items-center gap-y-5 p-5 rounded-xl shadow-xl shadow-slate-40 bg-slate-700 text-white"
        v-for="ship in starships.results"
        v-bind:key="ship"
    >
        <h1 class="text-7xl">🚀</h1>

        <h4 class="text-2xl text-center">
            {{ ship.name }}
        </h4>

        {{ console.log(starships) }}

        <p class="text-center"><i>Manufacturer by</i> {{ ship.manufacturer }}</p>

        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-5">
            <div class="flex flex-col gap-y-2 items-start px-2 w-[200px]">
                <p>Model: {{ ship.model }}</p>
                <p>Class: {{ ship.starship_class }}</p>
                <p>MGLT: {{ ship.MGLT }}</p>
            </div>

            <div class="flex flex-col gap-y-2 items-start px-2 w-[200px]">
                <p>Length: {{ ship.length }}</p>
                <p>Crew: {{ ship.crew }}</p>
                <p>Capacity: {{ ship.cargo_capacity }}</p>
                <p>Hyperdrive rate: {{ ship.hyperdrive_rating }}</p>
                <p>Max speed: {{ ship.max_atmosphering_speed }}</p>
            </div>
        </div>
    </div>
</template>
