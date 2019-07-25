import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
// import {other_vars} from './components/variables.js';


// function getUserList(cursor) {
//   if(cursor){
//     axios.get(`${other_vars.apiBase}/customers/search?=cursor=${cursor}`)
//       .then(res => {
//         console.log(res)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// }

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    donation: {
      amount: null,
      donor: null
    }
  },
  mutations: {
    setDonorFirstName(state, firstName) {
      state.donation.donor.firstName = firstName
    },
    setDonorLastName(state, lastName) {
      state.donation.donor.lastName = lastName
    },
    setDonorEmail(state, email){
      state.donation.donor.email = email
    },
    setDonorPhone(state, phone){
      state.donation.donor.phone = phone
    },
    setDonationAmount(state, amount){
      state.donation.amount = amount
    }
  },
  actions: {
  }
})
