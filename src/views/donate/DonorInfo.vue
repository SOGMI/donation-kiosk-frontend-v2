<template>
    <div class="view-body">
        <DonationNav />
        <div class="main-content">
            <div class="container">
                <h1 class="title">Enter Your Phone Number</h1>
                <div class="form-wrapper">
                    <form>
                        <input class="phone-input" placeholder="( XXX ) XXX - XXXX" autocomplete="off" type="number" minlength="10" maxlength="10" required="" name="phoneNumber" id="customerPhoneNumber">
                        <button class="large-submit" type="submit">SUBMIT</button>
                    </form>
                    <button v-on:click="openAnonModal" class="cancel">I want to give anonymously</button>
                </div>
            </div>
        </div>
        <div class="modal" v-bind:class="{'is-active': anonModal}">
            <div class="modal-background" v-on:click="closeAnonModal"></div>
            <div class="modal-content">
                <div class="modal-card">
                    <div class="modal-card-body">
                    <div class="title">Are You Sure?</div>
                    <div class="content">
                        <p>By choosing to give anonymously we will not be able to send you donation reciepts for you contributions. This includes our year end donor acknowledgement letter which can be used to claim a tax deduction.</p>
                    </div>
                    <div class="modal-buttons">
                        <button class="button is-success is-medium">Confirm</button>
                        <button v-on:click="closeAnonModal" class="button is-grey is-medium">Cancel</button>
                    </div>
                    </div>
                </div>
            </div>
            <button v-on:click="closeAnonModal" class="modal-close is-large"></button>
        </div>
    </div>
</template>

<script>
import DonationNav from '@/components/DonationNav.vue';
export default {
    name: "DonorInfo",
    data: function(){
        return {
            anonModal: false
        }
    },
    components: {
        DonationNav
    },
    methods: {
        openAnonModal(){
            this.anonModal = true
        },
        closeAnonModal(){
            this.anonModal = false
        }
    }
}
</script>