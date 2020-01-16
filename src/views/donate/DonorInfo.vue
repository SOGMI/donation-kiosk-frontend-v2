<template>
    <div class="view-body">
        <DonationNav />
        <div v-if="!currentDonor && !searching" class="main-content">
            <div class="container">
                <h1 class="title">Enter Your Phone Number</h1>
                <div class="form-wrapper">
                    <form v-on:submit.prevent="submitPhoneNumber">
                        <input
                            v-model="phoneNumber"
                            class="phone-input"
                            placeholder="( XXX ) XXX - XXXX"
                            autocomplete="off"
                            type="number"
                            minlength="10"
                            maxlength="10"
                            required
                            name="phoneNumber"
                            id="customerPhoneNumber"
                        />
                        <button class="large-submit" type="submit">
                            SUBMIT
                        </button>
                    </form>
                    <button v-on:click="openAnonModal" class="cancel">
                        I want to give anonymously
                    </button>
                </div>
            </div>
        </div>

        <!-- searching for donor -->
        <LoadingScreen v-if="searching" message="searching database" />

        <!-- phone length alert -->
        <AlertModal
            v-on:close="phoneLengthAlert = !phoneLengthAlert"
            message="please enter your full 10-digit phone number including the area code"
            v-bind:active="phoneLengthAlert"
        />

        <!-- confirm identity modal -->
        <div v-if="currentDonor" class="main-content">
            <div class="container">
                <div class="card">
                    <div class="card-content">
                        <h1 class="card-title">Please Confirm Your Identity</h1>
                        <div class="content">
                            <p>
                                Name:
                                <strong>
                                    {{ currentDonor.given_name }}
                                    {{ currentDonor.family_name }}
                                </strong>
                            </p>
                            <p>
                                Phone:
                                <strong>{{ currentDonor.phone_number }}</strong>
                            </p>
                            <p>
                                Email:
                                <strong>
                                    {{ currentDonor.email_address }}
                                </strong>
                            </p>
                        </div>
                        <button
                            v-on:click="confirmDonor"
                            class="button is-success is-medium"
                        >
                            Confirm
                        </button>
                        <button
                            v-on:click="cancel"
                            class="button is-grey is-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- anonymous modal message -->
        <div class="modal" v-bind:class="{ 'is-active': anonModal }">
            <div class="modal-background" v-on:click="closeAnonModal"></div>
            <div class="modal-content">
                <div class="modal-card">
                    <div class="modal-card-body">
                        <div class="title">Are You Sure?</div>
                        <div class="content">
                            <p>
                                By choosing to give anonymously we will not be
                                able to send you donation reciepts for you
                                contributions. This includes our year end donor
                                acknowledgement letter which can be used to
                                claim a tax deduction.
                            </p>
                        </div>
                        <div class="modal-buttons">
                            <button
                                v-on:click="anonymousDonor"
                                class="button is-success is-medium"
                            >
                                Confirm
                            </button>
                            <button
                                v-on:click="cancel"
                                class="button is-grey is-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                v-on:click="closeAnonModal"
                class="modal-close is-large"
            ></button>
        </div>
    </div>
</template>

<script>
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import DonationNav from '@/components/DonationNav.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import AlertModal from '@/components/AlertModal.vue';
// eslint-disable-next-line camelcase
import otherVars from '@/components/variables';
import axios from 'axios';

export default {
    name: 'DonorInfo',
    data() {
        return {
            anonModal: false,
            phoneNumber: null,
            currentDonor: null,
            searching: false,
            phoneLengthAlert: false
        };
    },
    components: {
        DonationNav,
        LoadingScreen,
        AlertModal
    },
    methods: {
        openAnonModal() {
            this.anonModal = true;
        },
        closeAnonModal() {
            this.anonModal = false;
        },
        submitPhoneNumber() {
            const phone = this.phoneNumber;
            if (phone.length === 10) {
                this.searchForCustomer(phone);
                this.searching = true;
            } else {
                this.phoneLengthAlert = true;
            }
        },
        async searchForCustomer(phone, cursor) {
            let inputedNumber = parsePhoneNumberFromString(phone, 'US');
            inputedNumber = inputedNumber.formatInternational();
            let url;
            if (cursor) {
                url = `${otherVars.apiBase}/customers/search?cursor=${cursor}`;
            } else {
                url = `${otherVars.apiBase}/customers/search`;
            }
            const currentDonor = await axios.get(url).then(response => {
                const customers = response.data.customers;
                if (!customers) {
                    return null;
                }
                let currentCustomer = null;
                customers.forEach(customer => {
                    let custPhone = customer.phone_number || null;
                    if (custPhone) {
                        custPhone = parsePhoneNumberFromString(custPhone, 'US');
                        custPhone = custPhone.formatInternational();
                    }
                    if (custPhone === inputedNumber) {
                        return (currentCustomer = customer);
                    }
                    return null;
                });
                return currentCustomer;
            });
            if (currentDonor) {
                return [
                    (this.currentDonor = currentDonor),
                    (this.searching = false)
                ];
            }
            return this.createCustomer(phone);
        },
        confirmIdentity(obj) {
            this.currentDonor = obj;

            // censor email
            const arr = this.currentDonor.email_address.split('@');
            const censoredEmail = `${this.censorWord(arr[0])}@${arr[1]}`;
            this.currentDonor.email_address = censoredEmail;

            this.searching = false;
        },
        confirmDonor() {
            this.$store.state.donation.donor = this.currentDonor;
            if (this.$store.state.donation.amount) {
                this.$router.push('/donate/confirmation');
            } else {
                this.$router.push('/donate/donation-amount');
            }
        },
        cancel() {
            this.$store.commit('reset');
            this.$router.push('/');
        },
        createCustomer(number) {
            this.$router.push(`/donate/create-donor/${number}`);
        },
        anonymousDonor() {
            this.$store.state.donation.donor = {
                anonymousDonor: true
            };
            this.$router.push('/donate/confirmation/');
        },
        censorWord(str) {
            return str[0] + '*'.repeat(str.length - 4) + str.slice(-3);
        }
    }
};
</script>

<style lang="scss" scoped>
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
