<template>
    <div class="view-body">
        <DonationNav />
        <div v-if="!customAmount" class="main-content">
            <div class="container">
                <h1 class="title">How much do you want to give?</h1>
                <div class="price-buttons">
                    <div class="columns is-multiline is-mobile">
                        <div
                            v-for="item in priceOptions"
                            class="column is-one-quarter-tablet is-half-mobile"
                        >
                            <div
                                v-on:click="setAmount(item)"
                                class="price-button"
                            >
                                <span>${{ item }}</span>
                            </div>
                        </div>
                        <div class="column is-half-tablet is-full-mobile">
                            <div
                                tag="div"
                                v-on:click="setCustomAmount"
                                class="price-button custom"
                            >
                                <span>Custom</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-content" v-if="customAmount">
            <div class="container">
                <div class="form-wrapper">
                    <div class="title">How much do you want to give?</div>
                    <form v-on:submit.prevent="setAmount(donation.amount)">
                        <div class="field">
                            <div class="control has-icons-left">
                                <input
                                    v-model="donation.amount"
                                    type="number"
                                    step=".01"
                                    min="1"
                                    ref="customAmount"
                                    class="input is-large"
                                    placeholder="Donation Amount"
                                    required
                                />
                                <span class="icon is-left">
                                    <fa-icon icon="dollar-sign" />
                                </span>
                            </div>
                        </div>
                        <button class="large-submit" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DonationNav from '@/components/DonationNav.vue';
export default {
    name: 'DonationAmount',
    components: {
        DonationNav
    },
    data: function() {
        return {
            priceOptions: [25, 50, 100, 250, 500, 1000],
            donation: {
                amount: null,
                donor: null
            },
            customAmount: false
        };
    },
    methods: {
        setAmount(num) {
            this.$store.commit('setDonationAmount', num);
            // console.log(this.$store.state.donation.amount);
            if (this.$store.state.donation.donor) {
                this.$router.push('/donate/confirmation/');
            } else {
                this.$router.push('/donate/donor-info/');
            }
        },
        setCustomAmount() {
            this.customAmount = true;
            this.$nextTick(() => {
                this.$refs.customAmount.focus();
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.large-submit {
    margin-top: 0.5rem;
}
</style>
