<template>
    <header>
        <div class="container is-flex">
            <div v-on:click="reset" class="logo is-flex">
                <img src="../assets/sogmi-logo-with-text_320x132.png" alt />
            </div>
            <nav class="process-navigation">
                <!-- Donation Amount Link -->
                <router-link
                    class="process-nav-item"
                    to="/donate/donation-amount"
                    v-bind:class="{ 'info-set': donationSet }"
                >
                    <div class="icon">
                        <fa-icon icon="dollar-sign" />
                    </div>
                    <div class="text">Donation Amount</div>
                </router-link>

                <!-- Donor Info link -->
                <router-link
                    v-if="donorSet || currentPage == 'Donor Info'"
                    class="process-nav-item"
                    to="/donate/donor-info"
                    v-bind:class="{ 'info-set': donorSet }"
                >
                    <div class="icon">
                        <fa-icon icon="user" />
                    </div>
                    <div class="text">Donor Info</div>
                </router-link>
                <div
                    v-else
                    class="process-nav-item"
                    v-bind:class="{
                        'info-set': donorSet,
                        'router-link-active': currentPage == 'Create Donor',
                    }"
                >
                    <div class="icon">
                        <fa-icon icon="user" />
                    </div>
                    <div class="text">Donor Info</div>
                </div>

                <!-- Donation Confirmation Link -->
                <router-link
                    v-if="bothSet || currentPage == 'Donation Confirmation'"
                    class="process-nav-item"
                    to="/donate/confirmation"
                >
                    <div class="icon">
                        <fa-icon icon="check" />
                    </div>
                    <div class="text">Confirmation</div>
                </router-link>
                <div v-else class="process-nav-item">
                    <div class="icon">
                        <fa-icon icon="check" />
                    </div>
                    <div class="text">Confirmation</div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'DonationNav',
    data() {
        return {
            donationSet: false,
            donorSet: false,
            bothSet: false,
            currentPage: '',
        };
    },
    props: {},
    beforeMount() {
        this.currentPage = this.$router.currentRoute.name;
        // console.log(this.currentPage);
    },
    mounted() {
        const don = this.$store.state.donation;
        if (don.amount) {
            this.donationSet = true;
        }
        if (don.donor) {
            this.donorSet = true;
        }
        if (don.donor && don.amount) {
            this.bothSet = true;
        }
    },
    methods: {
        reset() {
            this.$store.state.donation = {
                amount: null,
                donor: null,
            };
            this.$router.push('/');
        },
    },
};
</script>
