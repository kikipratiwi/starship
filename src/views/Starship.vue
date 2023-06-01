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
    <div class="box-border max-w-screen h-screen bg-slate-900">
        <div
            v-infinite-scroll="[loadMoreStarship, { distance: 10 }]"
            class="flex flex-col py-20 px-20 items-center w-full gap-10 h-full overflow-scroll"
        >
            <h1 class="text-white text-7xl font-semibold">Starship</h1>

            <input
                class="block min-h-[auto] w-full rounded-xl border-0 bg-slate-500 px-3 py-2 leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary"
                type="text"
                placeholder="Search your starship..."
                v-model="keyword"
            />

            <div
                v-if="starships.results.length > 0"
                class="w-full grid gap-x-8 gap-y-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <div
                    class="flex flex-col p-5 justify-center items-center gap-y-4 rounded-xl shadow-xl shadow-slate-40 bg-slate-700 text-white"
                    v-for="ship in starships.results"
                    v-bind:key="ship"
                >
                    <h1 class="text-6xl">🚀</h1>

                    <h4 class="text-xl text-center">
                        {{ ship.name }}
                    </h4>

                    <p class="text-center text-sm">
                        <i>Manufacturer by</i> {{ ship.manufacturer }}
                    </p>
                </div>
            </div>

            <p v-else-if="keyword && starships.results.length < 1" class="text-white italic">
                No matching results
            </p>

            <p v-if="isFetchingMoreData" class="italic text-white text-xl py-5">
                🏃 Loading more data...
            </p>
        </div>
    </div>
</template>
