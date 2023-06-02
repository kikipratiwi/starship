<script>
import { Suspense } from 'vue';
import Startship from './views/Starship.vue';

export default {
    name: 'App',
    components: { Startship, Suspense },
};
</script>

<template>
    <Suspense>
        <Startship />

        <template #fallback>
            <div
                class="h-screen w-screen bg-slate-900 text-white text-xl flex items-center justify-center"
            >
                <i>Loading...</i>
            </div>
        </template>
    </Suspense>
</template>
