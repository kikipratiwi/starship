<script setup>
import { ref } from 'vue';

defineProps(['data']);

const toggleModal = ref(false);
const selectedShip = ref({});
</script>

<template>
    <div
        @click="
            {
                toggleModal = !toggleModal;
                selectedShip = ship;
            }
        "
        class="flex flex-col p-5 justify-center items-center gap-y-3 rounded-xl shadow-xl shadow-slate-40 bg-slate-700 text-white cursor-pointer"
        v-for="ship in data.results"
        v-bind:key="ship"
    >
        <h1 class="text-6xl">🚀</h1>

        <h4 class="text-xl text-center font-semibold">
            {{ ship.name }}
        </h4>

        <span class="text-center text-sm">
            <i>Manufacturer by</i> <span class="pl-1 font-semibold">{{ ship.manufacturer }}</span>
        </span>
    </div>

    <!-- Modal Detail -->
    <div
        v-if="toggleModal"
        @click="toggleModal = false"
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50 px-5"
    >
        <div class="relative mx-auto w-auto max-w-3xl">
            <div
                class="flex flex-col p-8 justify-center items-center gap-y-4 rounded-xl shadow-xl shadow-slate-40 bg-slate-700 text-white"
            >
                <div class="w-full flex flex-shrink-0 items-end justify-end rounded-t-md">
                    <!--Close button-->
                    <button
                        @click="toggleModal = false"
                        type="button"
                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <h1 class="text-8xl">🚀</h1>

                <h4 class="text-4xl text-center font-semibold">{{ selectedShip.name }}</h4>

                <p class="text-center">
                    <i>Manufacturer by </i>
                    <span class="font-semibold">{{ selectedShip.manufacturer }}</span>
                </p>

                <div
                    class="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-x-10"
                >
                    <div class="flex flex-col gap-y-2 items-start px-2 flex-grow">
                        <span>Model: {{ selectedShip.model }}</span>
                        <span>Class: {{ selectedShip.starship_class }}</span>
                        <span>MGLT: {{ selectedShip.MGLT }}</span>
                        <span>Length: {{ selectedShip.length }}</span>
                        <span>Consumables: {{ selectedShip.consumables }}</span>
                    </div>

                    <div class="flex flex-col gap-y-2 items-start px-2 w-auto">
                        <span>Passengers: {{ selectedShip.passengers }}</span>
                        <span>Crew: {{ selectedShip.crew }}</span>
                        <span>Capacity: {{ selectedShip.cargo_capacity }}</span>
                        <span>Hyperdrive rate: {{ selectedShip.hyperdrive_rating }}</span>
                        <span>Max speed: {{ selectedShip.max_atmosphering_speed }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Overlay -->
    <div v-if="toggleModal" class="absolute inset-0 z-40 opacity-60 bg-black"></div>
</template>
