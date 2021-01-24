<template>
    <div class="spinner">
        <div class="loading-spinner"></div>
        <!-- <div class="item">
            <fa-icon icon="circle-notch" class="fa-spin"/>
    </div>-->
    </div>
</template>

<script>
export default {
    name: 'Spinner',
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/partials/variables.scss';

.spinner {
    position: relative;
    height: 50px;
}

@mixin loading-spinner(
    $activeColor: $primary,
    $selector: '&::before',
    $time: 1.2s
) {
    @keyframes spinner {
        0% {
            transform: translate3d(-50%, -50%, 0) rotate(0deg);
        }

        100% {
            transform: translate3d(-50%, -50%, 0) rotate(360deg);
        }
    }

    animation-play-state: running;
    opacity: 1;
    position: relative;

    &.-paused {
        animation-play-state: paused;
        opacity: 0.2;
        transition: opacity linear 0.1s;
    }

    #{$selector} {
        animation: $time linear infinite spinner;
        animation-play-state: inherit;
        border: solid 6px $grey-light;
        border-bottom-color: #{$activeColor};
        border-radius: 50%;
        content: '';
        height: 60px;
        left: 50%;
        opacity: inherit;
        position: absolute;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 60px;
        will-change: transform;
    }
}

.loading-spinner {
    @include loading-spinner;
    // height: 100vh;
}

// $border-settings: 5px dashed $text;

// .spinner {
//     text-align: center;
//     position: relative;
//     font-size: 60px;
//     .item {
//         // background: $text;
//         // color: white;
//         display: inline-block;
//         // padding: 5px 15px;
//         // border-radius: 100%;
//         margin-bottom: 1rem;
//         // -webkit-animation: loader 4s infinite ease-in-out;
//         // animation: loader 4s infinite ease-in-out;
//     }
// }

// @-webkit-keyframes loader {
//     0%, 100% {
//         opacity: 0;
//     }
//     50% {
//         opacity: 1;
//     }
// }
// @keyframes loader {
//     0%, 100% {
//         opacity: 0;
//     }
//     50% {
//         opacity: 1;
//     }
// }
</style>
