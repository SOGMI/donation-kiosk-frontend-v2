<template>
  <div class="view-body">
    <DonationNav />
    <div class="main-content">
      <div class="container">
        <h1 class="title">How much to you want to give?</h1>
        <div class="price-buttons">
          <div class="columns is-multiline is-mobile">
            <div v-for="item in priceOptions" class="column is-one-quarter-tablet is-half-mobile">
              <div v-on:click="setAmount(item)" class="price-button">
                <span>${{ item }}</span>
              </div>
            </div>
            <div class="column is-half-tablet is-full-mobile">
              <div tag="div" class="price-button custom">
                <span>Custom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonationNav from "@/components/DonationNav.vue";
export default {
    name: "DonationAmount",
    components: {
        DonationNav
    },
    data: function() {
        return {
            priceOptions: [25, 50, 100, 250, 500, 1000],
            donation: {
                amount: null,
                donor: null
            }
        };
    },
    methods: {
        setAmount(num) {
            this.$store.commit("setDonationAmount", num);
            console.log(this.$store.state.donation.amount);
            if (this.$store.state.donation.donor) {
                this.$router.push("/donate/confirmation/");
            } else {
                this.$router.push("/donate/donor-info/");
            }
        }
    }
};
</script>