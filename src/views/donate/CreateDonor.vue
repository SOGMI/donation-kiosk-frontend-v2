<template>
    <div class="view-body">
        <DonationNav />
        <div v-if="!creatingUser" class="main-content">
            <div class="container">
                <h1 class="title">Phone number "{{ phone }}" not found</h1>
                <h2 class="subtitle">
                    Could you tell us a little more about yourself?
                </h2>
                <div class="form-wrapper">
                    <form v-on:submit.prevent="addDonor" autocomplete="off">
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input
                                            v-model="first_name"
                                            class="input is-large"
                                            type="text"
                                            name="first-name"
                                            placeholder="First Name"
                                            required
                                        />
                                        <span class="icon is-left">
                                            <fa-icon icon="address-card" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input
                                            v-model="last_name"
                                            class="input is-large"
                                            type="text"
                                            name="last-name"
                                            placeholder="Last Name"
                                            required
                                        />
                                        <span class="icon is-left">
                                            <fa-icon icon="address-card" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input
                                            v-model="phone"
                                            type="number"
                                            class="input is-large"
                                            name="phone-number"
                                            placeholder="Phone Number"
                                            required
                                        />
                                        <span class="icon is-left">
                                            <fa-icon icon="phone" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <div class="control has-icons-left">
                                        <input
                                            v-model="email"
                                            type="email"
                                            class="input is-large"
                                            name="email-address"
                                            placeholder="Email Address"
                                            required
                                        />
                                        <span class="icon is-left">
                                            <fa-icon icon="envelope" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <button
                                        class="button is-success is-large"
                                        type="submit"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <LoadingScreen v-if="creatingUser" message="creating donor profile" />
        <AlertModal
            v-on:close="alertModal = !alertModal"
            v-bind:active="alertModal"
            v-bind:message="
                'Phone must be full 10-digit number including the area code'
            "
        />
    </div>
</template>

<script>
import DonationNav from '@/components/DonationNav.vue';
import axios from 'axios';
import { other_vars } from '@/components/variables.js';
import LoadingScreen from '@/components/LoadingScreen.vue';
import AlertModal from '@/components/AlertModal.vue';

export default {
    name: 'createDonor',
    components: {
        DonationNav,
        LoadingScreen,
        AlertModal
    },
    data: function() {
        return {
            phone: null,
            email: null,
            first_name: null,
            last_name: null,
            creatingUser: false,
            alertModal: false
        };
    },
    mounted: function() {
        this.phone = this.$route.params.number;
    },
    methods: {
        addDonor() {
            if (this.phone.length === 10) {
                this.creatingUser = true;
                axios
                    .post(`${other_vars.apiBase}/customers/create/`, {
                        firstName: this.first_name,
                        lastName: this.last_name,
                        email: this.email,
                        phone: this.phone
                    })
                    .then(res => {
                        if (res.data.customer) {
                            this.$store.state.donation.donor =
                                res.data.customer;
                            this.$router.push('/donate/confirmation/');
                        } else {
                            alert(
                                `THE FOLLOWING ERROR OCCURRED:\nerror code: ${
                                    res.data.status
                                }\n\nRedirecting you to homepage.`
                            );
                            console.log(res);
                            this.$router.push('/');
                        }
                    })
                    .catch(err => {
                        alert(err);
                    });
            } else {
                this.alertModal = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
