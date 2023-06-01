<script setup>
import { ref, watch } from 'vue';
import { vInfiniteScroll } from '@vueuse/components';
import { useDebounce } from '@vueuse/core';

import { getStarships } from '../services/starship.service';

const isFetchingMoreData = ref(null);
const isFetchingData = ref(null);
const starships = ref(await getStarships());
const keyword = ref('');
const debouncedKeyword = useDebounce(keyword, 500);

watch(debouncedKeyword, (newSearchKeyword) => {
    getStashipsWithKeyword(newSearchKeyword);
});

const getStashipsWithKeyword = async (search) => {
    try {
        isFetchingData.value = true;
        const response = await getStarships(`https://swapi.dev/api/starships/?search=${search}`);

        isFetchingData.value = null;
        starships.value = response;
    } catch (error) {
        console.error(error.message);
    }
};

const loadMoreStarship = async () => {
    try {
        if (!starships.value.next) return;

        isFetchingMoreData.value = true;
        const response = await getStarships(starships.value.next);

        starships.value.results.push(...response.results);
        starships.value.next = response.next;
        isFetchingMoreData.value = null;
    } catch (error) {
        console.error(error.message);
    }
};
</script>

<template>
    <div class="box-border maxW-screen bg-slate-900">
        <div class="flex flex-col py-20 px-20 items-center w-full gap-10">
            <h1 class="text-white text-7xl font-semibold">Starship</h1>

            <input
                class="block min-h-[auto] w-full rounded-xl border-0 bg-slate-500 px-3 py-2 leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary"
                type="text"
                placeholder="Search your starship..."
                v-model="keyword"
            />

            <div id="starship-container" v-infinite-scroll="[loadMoreStarship, { distance: 10 }]">
                <template v-if="isFetchingData">
                    <div class="h-screen">
                        <p class="text-white">Loading new data...</p>
                    </div>
                </template>

                <template v-else>
                    <template v-if="starships.results.length > 0">
                        <div
                            class="grid gap-x-10 gap-y-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                        >
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

                                <p class="text-center">
                                    <i>Manufacturer by</i> {{ ship.manufacturer }}
                                </p>

                                <div
                                    class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-5"
                                >
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
                        </div>
                    </template>

                    <template v-else>
                        <div class="h-screen w-full text-center">
                            <p class="text-white italic">No matching results</p>
                        </div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>
