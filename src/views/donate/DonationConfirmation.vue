<template>
    <div class="view-body">
        <DonationNav />
        <div v-if="!donationConfirmed" class="main-content">
            <div class="container">
                <div class="title">Please Confirm Your Donation Details</div>
                <div class="subtitle">(Click on a section to edit it)</div>
                <div class="columns">
                    <div class="column">
                        <router-link
                            to="/donate/donation-amount/"
                            tag="div"
                            class="card price"
                        >
                            <div class="card-content">
                                <div class="priceText">Donation Amount</div>
                                <div class="priceDisplay">
                                    ${{ donationAmount }}
                                </div>
                            </div>
                        </router-link>
                    </div>
                    <div class="column">
                        <router-link
                            to="/donate/donor-info/"
                            tag="div"
                            class="card"
                        >
                            <div class="card-content">
                                <div>
                                    <strong>Donor Info</strong>
                                </div>
                                <div
                                    v-for="(value, key) in donor"
                                    v-bind:key="key"
                                >
                                    <span class="key">{{ key }}:</span>
                                    <strong>{{ value }}</strong>
                                </div>
                            </div>
                        </router-link>
                        <button v-on:click="payWithCard" class="pay-button">
                            Pay With Card
                        </button>
                    </div>
                </div>
                <button v-on:click="cancelDonation" class="cancel">
                    Cancel
                </button>
            </div>
        </div>
        <LoadingScreen
            v-if="donationConfirmed"
            :message="'initializing card reader'"
        />
    </div>
</template>

<script>
import DonationNav from '@/components/DonationNav.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import otherVars from '@/components/variables';

export default {
    name: 'DonationConfirmation',
    components: {
        DonationNav,
        LoadingScreen
    },
    data() {
        return {
            donationConfirmed: false,
            donationAmount: null,
            donor: {
                name: null,
                phone: null,
                email: null
            }
        };
    },
    mounted() {
        const { donation } = this.$store.state;
        if (donation.amount && donation.donor) {
            this.donationAmount = donation.amount;
            if (donation.donor.anonymousDonor) {
                this.donor = {
                    name: 'Anonymous',
                    phone: 'N/A',
                    email: 'N/A'
                };
            } else {
                this.donor = {
                    name: `${donation.donor.given_name} ${donation.donor.family_name}`,
                    phone: donation.donor.phone_number,
                    email: donation.donor.email_address
                };
            }
        } else if (!donation.amount && !donation.donor) {
            this.$router.push('/');
        } else if (!donation.donor) {
            this.$router.push('/donate/donor-info/');
        } else {
            this.$router.push('/donate/donation-amount/');
        }
    },
    methods: {
        cancelDonation() {
            this.$store.state.donation.amount = null;
            this.$store.state.donation.donor = null;
            this.$router.push('/');
        },
        payWithCard() {
            this.donationConfirmed = true;
            const { callbackUrl } = otherVars;
            const applicationId = otherVars.appId;
            const currencyCode = 'USD';
            const sdkVersion = 'v2.0';
            const transactionTotal = Number(this.donationAmount) * 100;
            const tenderTypes =
                'com.squareup.pos.TENDER_CARD, com.squareup.pos.TENDER_CARD_ON_FILE';
            const posURL =
                `${'intent:#Intent;' +
                    'action=com.squareup.pos.action.CHARGE;' +
                    'package=com.squareup;' +
                    'S.com.squareup.pos.WEB_CALLBACK_URI='}${callbackUrl};` +
                `S.com.squareup.pos.CLIENT_ID=${applicationId};` +
                `S.com.squareup.pos.API_VERSION=${sdkVersion};` +
                `i.com.squareup.pos.TOTAL_AMOUNT=${transactionTotal};` +
                `S.com.squareup.pos.CURRENCY_CODE=${currencyCode};` +
                `S.com.squareup.pos.TENDER_TYPES=${tenderTypes};` +
                `end`;
            setTimeout(() => {
                window.open(posURL);
            }, 600);
            // console.log(posURL);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/partials/variables.scss';
.card {
    cursor: pointer;
    border-radius: 10px;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    text-align: left;
    // &:hover {
    //     opacity: 0.7;
    // }
    &.price {
        height: 100%;
        text-align: center;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        .priceDisplay {
            font-size: 4rem;
            font-weight: bold;
            line-height: 110%;
        }
        .priceText {
            font-size: 30px;
            line-height: 110%;
        }
    }
}
.pay-button {
    width: 100%;
    border: none;
    background: $success;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    padding: 2rem 2rem;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    margin-top: 1.5rem;
}
.key {
    text-transform: capitalize;
}
.cancel {
    margin-top: 1rem;
    padding: 1rem 3rem;
}
.main-content {
    padding-bottom: 2rem;
}
</style>
