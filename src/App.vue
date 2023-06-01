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
            <p>Loading...</p>
        </template>
    </Suspense>
</template>
