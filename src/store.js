import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        donation: {
            amount: null,
            donor: null
        }
    },
    mutations: {
        reset(state) {
            state.donation.amount = null;
            state.donation.donor = null;
        },
        setDonorFirstName(state, firstName) {
            state.donation.donor.firstName = firstName;
        },
        setDonorLastName(state, lastName) {
            state.donation.donor.lastName = lastName;
        },
        setDonorEmail(state, email) {
            state.donation.donor.email = email;
        },
        setDonorPhone(state, phone) {
            state.donation.donor.phone = phone;
        },
        setDonationAmount(state, amount) {
            state.donation.amount = amount;
        }
    },
    actions: {}
});
