<template>
    <div class="modal" v-bind:class="{ 'is-active': active }">
        <div class="modal-background" v-on:click="closeModal"></div>
        <div class="modal-content">
            <div class="modal-card">
                <div class="modal-card-body">
                    <div class="content">
                        <p>{{ message }}</p>
                    </div>
                    <button v-on:click="closeModal" class="button is-grey">
                        okay
                    </button>
                </div>
            </div>
        </div>
        <button v-on:click="closeModal" class="modal-close is-large"></button>
    </div>
</template>

<script>
export default {
    name: 'alertModal',
    props: {
        message: String,
        active: Boolean,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
button.is-grey {
    margin-left: 0;
}
.card {
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    .card-content {
        padding: 2.5rem;
    }
    .card-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
}
</style>
