<template>
    <div class="view-body">
        <DonationNav />
        <div class="main-content">
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
                                <div><strong>Donor Info</strong></div>
                                <div v-for="(value, key) in donor">
                                    <span class="key">{{ key }}: </span>
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
    </div>
</template>

<script>
import DonationNav from '@/components/DonationNav.vue';
import { other_vars } from '@/components/variables.js';

export default {
    name: 'DonationConfirmation',
    components: {
        DonationNav
    },
    data: function() {
        return {
            donationAmount: null,
            donor: {
                name: null,
                phone: null,
                email: null
            }
        };
    },
    mounted: function() {
        let donation = this.$store.state.donation;
        if (donation.amount && donation.donor) {
            this.donationAmount = donation.amount;
            this.donor = {
                name: `${donation.donor.given_name} ${
                    donation.donor.family_name
                }`,
                phone: donation.donor.phone_number,
                email: donation.donor.email_address
            };
        } else {
            if (!donation.amount && !donation.donor) {
                this.$router.push(`/`);
            } else if (!donation.donor) {
                this.$router.push('/donate/donor-info/');
            } else {
                this.$router.push('/donate/donation-amount/');
            }
        }
    },
    methods: {
        cancelDonation() {
            this.$store.state.donation.amount = null;
            this.$store.state.donation.donor = null;
            this.$router.push('/');
        },
        payWithCard() {
            let callbackUrl = other_vars.callbackUrl;
            let applicationId = other_vars.appId;
            let currencyCode = 'USD';
            let sdkVersion = 'v2.0';
            let transactionTotal = Number(this.donationAmount) * 100;
            let tenderTypes = `com.squareup.pos.TENDER_CARD, com.squareup.pos.TENDER_CARD_ON_FILE`;
            let posURL =
                'intent:#Intent;' +
                'action=com.squareup.pos.action.CHARGE;' +
                'package=com.squareup;' +
                'S.com.squareup.pos.WEB_CALLBACK_URI=' +
                callbackUrl +
                ';' +
                'S.com.squareup.pos.CLIENT_ID=' +
                applicationId +
                ';' +
                'S.com.squareup.pos.API_VERSION=' +
                sdkVersion +
                ';' +
                'i.com.squareup.pos.TOTAL_AMOUNT=' +
                transactionTotal +
                ';' +
                'S.com.squareup.pos.CURRENCY_CODE=' +
                currencyCode +
                ';' +
                'S.com.squareup.pos.TENDER_TYPES=' +
                tenderTypes +
                ';' +
                'end';

            window.open(posURL);
            console.log(posURL);
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
