<template>
  <div class="profileEdit" >
      <h2 class="heading-secondary">Edit your profile</h2>
      <hr>
    <div class="row profileEdit__row">
      <form v-on:submit.prevent>
        <div class="profileEdit__firstform">
          <!-- <input v-model="user.password" id="password" name="password" type="password" placeholder="password" pattern=".{5,10}" title="5 to 10 characters" required><br><br> -->
          <div class="form-group" >
            <label for="password">Password <span>*</span> </label>
            <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter a valid password" required>
          </div>
          <div class="form-group">
            <label for="firstName">FirstName   </label>
            <input v-model="user.firstName" id="firstName" class="form-control" name="firstName" type="text" placeholder="...">
          </div>
          <div class="form-group">
            <label for="lastName">LastName   </label>
            <input v-model="user.lastName" id="lastName" class="form-control" name="lastName" type="text" placeholder="...">
          </div>
        </div>
        <hr>
        <div class="profileEdit__adressform">
          <div class="form-group" >
            <label for="country">Country </label>
            <input v-model="user.address.country" id="country" class="form-control" name="country" type="text" placeholder="..." required>
          </div>
          <div class="form-group" >
            <label for="region">Region </label>
            <input v-model="user.address.region" id="region" class="form-control" name="region" type="text" placeholder="..." required>
          </div>
          <div class="form-group" >
            <label for="city">City </label>
            <input v-model="user.address.city" id="city" class="form-control" name="city" type="text" placeholder="..." required>
          </div>
          <div class="form-group" >
            <label for="street">Street </label>
            <input v-model="user.address.street" id="street" class="form-control" name="street" type="text" placeholder="..." required>
          </div>
          <div class="form-group" >
            <label for="postal">Postal Code </label>
            <input v-model="user.address.postal" id="postal" class="form-control" name="postal" type="text" placeholder="..." required>
          </div>
          <div class="form-group" >
            <label for="latitude">Latitude </label>
            <input v-model="user.address.latitude" id="latitude" class="form-control" name="latitude" type="text" placeholder="..." required>
          </div>
          <div class="form-group" >
            <label for="longitude">Longitude </label>
            <input v-model="user.address.longitude" id="longitude" class="form-control" name="longitude" type="text" placeholder="..." required>
          </div>
        </div>
      </form>
    </div>
    <button class="btn btn-lg btn--white" @click="updateUser">Update your profile</button>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'profileEdit',
  data() {
    return {
      title: 'Edit your profile',
      user: {
        password: '',
        firstName: '',
        lastName: '',
        address: {
          country: '',
          region: '',
          city: '',
          street: '',
          postal: '',
          longitude: '',
          latitude: '',
        },
      },
    };
  },
  methods: {
    updateUser() {
      this.$http
        .put('/profile', this.user)
        .then((res) => {
          if (res) {
            swal({
              type: 'success',
              title: 'Congrat !',
              text: res.data.message,
            });
          } else {
            swal({
              type: 'error',
              text: 'Server error',
            });
          }
        })
        .catch((error) => {
          if (error) {
            swal({
              type: 'error',
              title: 'Oh no ...',
              text: error.response.data.message,
            });
          } else {
            swal({
              type: 'error',
              text: 'Cannot catch error',
            });
          }
        });
    },
  },
  beforeMount() {
    if (this.$store.state.location.latitude) {
      this.user.address.country = this.$store.state.location.CountryCode;
      this.user.address.region = this.$store.state.location.Region;
      this.user.address.city = this.$store.state.location.City;
      this.user.address.street = this.$store.state.location.Address;
      this.user.address.postal = this.$store.state.location.Postal;
      this.user.address.latitude = this.$store.state.location.latitude;
      this.user.address.longitude = this.$store.state.location.longitude;
    }
  },
};
</script>

<style scoped>

</style>
