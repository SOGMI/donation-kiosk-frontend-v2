<template>
    <div class="main-content">
        <div class="container">
            <Spinner />
            <h1 class="title">{{ message }}</h1>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
    name: 'loadingScreen',
    components: {
        Spinner
    },
    props: {
        message: String
    }
};
</script>
