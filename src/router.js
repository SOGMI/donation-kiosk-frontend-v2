import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import DonationAmount from "./views/donate/DonationAmount.vue";
import DonorInfo from "./views/donate/DonorInfo.vue";
import DonationConfirmation from "./views/donate/DonationConfirmation.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/donate/donation-amount",
      name: "Donation Amount",
      component: DonationAmount
    },
    {
      path: "/donate/donor-info",
      name: "Donor Info",
      component: DonorInfo
    },
    {
      path: "/donate/confirmation",
      name: "Donation Confirmation",
      component: DonationConfirmation
    }
  ]
});
