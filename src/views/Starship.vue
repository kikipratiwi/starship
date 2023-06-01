<script setup>
import { ref, watch } from 'vue';
import { vInfiniteScroll } from '@vueuse/components';
import { useDebounce, useInfiniteScroll } from '@vueuse/core';

import { getStarships, getUsers } from '../services/starship.service';

const listEl = ref(null);
// const isFetchingMoreData = ref(null);
const isFetchingData = ref(null);
// const starships = ref(await getStarships());
const keyword = ref('');
const debouncedKeyword = useDebounce(keyword, 500);

watch(debouncedKeyword, (newSearchKeyword) => {
    isFetchingMoreData.value = true;
    getStashipsWithKeyword(newSearchKeyword);
});

const getStashipsWithKeyword = async (search) => {
    try {
        const response = await getStarships(`https://swapi.dev/api/starships/?search=${search}`);
        starships.value = response;
        isFetchingMoreData.value = false;
    } catch (error) {
        console.error(error.message);
    }
};

// const loadMoreStarship = async () => {
//     // if (isFetchingMoreData.value) return;
//     // console.log('Kesini');

//     try {
//         if (!starships.value.next) return;

//         isFetchingMoreData.value = true;
//         const response = await getStarships(starships.value.next);

//         starships.value.results.push(...response.results);
//         starships.value.next = response.next;
//         isFetchingMoreData.value = false;
//     } catch (error) {
//         console.error(error.message);
//     }
// };

const starships = ref(await getStarships());
const isFetchingMoreData = ref(true);

const loadMoreStarship = async () => {
    if (!isFetchingMoreData.value) return;

    try {
        const response = await getStarships(starships.value.next);
        starships.value.results.push(...response.results);
        starships.value.next = response.next;

        isFetchingMoreData.value = !!response.next;
    } catch (error) {
        console.error(error.message);
    }
};
// useInfiniteScroll(
//     listEl,
//     async () => {
//         await loadMoreStarship();
//     },
//     { distance: 10 },
// );

const usersToShow = 15;
// const usersList = ref(await getUsers(usersToShow, 0));
// const getUsersOnScroll = async () => {
//     const newUsers = await getUsers(usersToShow, usersList.value.length);

//     usersList.value.push(...newUsers);
// };

// useInfiniteScroll(
//     listEl,
//     async () => {
//         await getUsersOnScroll();
//     },
//     { distance: 10 },
// );
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

                    <!-- <div
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
                    </div> -->
                </div>
                <!-- <div
                        v-for="ship in starships.results"
                        v-bind:key="ship"
                        class="bg-yellow-400 text-black h-[200px]"
                    >
                        {{ ship.name }}
                    </div> -->

                <p v-if="isFetchingMoreData" class="italic text-white text-xl py-5">
                    🏃 Loading more data...
                </p>
            </div>

            <!-- <div id="starship-container" v-infinite-scroll="[loadMoreStarship, { distance: 10 }]">
                <div
                    class="bg-red-400 max-h-[400px] overscroll-scroll grid gap-x-10 gap-y-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
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

                        <p class="text-center"><i>Manufacturer by</i> {{ ship.manufacturer }}</p>

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
            </div> -->
        </div>
    </div>
</template>
