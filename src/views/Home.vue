<template>
    <div class="view-body">
        <HomepageHeading />
        <div v-on:click="donateView" class="main-content">
            <div class="container">
                <h1 class="supersized">Donation Station</h1>
                <h2 class="touch-me">
                    <fa-icon icon="hand-point-up" />
                    Tap to donate
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HomepageHeading from '@/components/HomepageHeading.vue';

export default {
    name: 'home',
    components: {
        HomepageHeading
    },
    methods: {
        donateView() {
            this.$router.push('/donate/donation-amount');
        }
    }
};
</script>

<style lang="scss" scoped>
.main-content {
    cursor: pointer;
}
.supersized {
    font-size: 5.5rem;
}
.touch-me {
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: bold;
    opacity: 0;
    animation: touch-me-loop 3s ease infinite;
}

@-webkit-keyframes touch-me-loop {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0;
    }
}
@-moz-keyframes touch-me-loop {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0;
    }
}
@-o-keyframes touch-me-loop {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0;
    }
}
@keyframes touch-me-loop {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0;
    }
}
</style>
