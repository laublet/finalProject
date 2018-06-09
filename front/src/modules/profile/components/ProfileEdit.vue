<template>
  <div class="profileEdit">
    <h2 class="heading-secondary">Edit your profile</h2>
    <hr>
    <div class="row profileEdit__row">
      <form v-on:submit.prevent>
        <div class="profileEdit__firstform">
          <div class="form-group">
            <label for="username">Pseudo
              <span>*</span>
            </label>
            <input v-model="user.username" id="username" class="form-control" name="username" type="text" placeholder="Choose an username" required>
          </div>
          <div class="form-group">
            <label for="email">Email
              <span>*</span>
            </label>
            <input v-model="user.email" id="email" class="form-control" name="email" type="email" placeholder="email@example.com" required>
          </div>
          <div class="form-group">
            <!-- <input v-model="user.password" id="password" name="password" type="password" placeholder="password" pattern=".{5,10}" title="5 to 10 characters" required><br><br> -->
            <label for="password">New Password
              <span>*</span>
            </label>
            <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter a valid password" required>
          </div>
          <div class="form-group">
            <label for="comfirmPassword">New Password Comfirmation
              <span>*</span>
            </label>
            <input v-model="comfirmPassword" id="comfirmPassword" class="form-control" name="comfirmPassword" type="password" placeholder="Enter a valid password" required>
          </div>
        </div>
        <hr>
      </form>
    </div>
    <button class="btn btn-lg btn--white" @click="check">Update your profile</button>
    <router-link tag="button" class="btn btn-lg btn--white" :to="{name:'profileDelete'}">Delete your profile</router-link>
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
        username: '',
        email: '',
      },
      comfirmPassword: '',
    };
  },
  methods: {
    check() {
      if (!this.user.password && !this.comfirmPassword) {
        this.updateUser();
      } else if (this.user.password === this.comfirmPassword) {
        this.updateUser();
      } else {
        swal({
          type: 'error',
          title: 'Oups',
          text: 'You must enter the same password twice',
        });
      }
    },
    getTheUser() {
      this.$http
        .get('/profile')
        .then((res) => {
          this.user = res.data.content[0];
        })
        .catch((error) => {
          if (error) {
            swal({
              type: 'error',
              title: 'Oh no ...',
              text: error.response.data.message,
            });
          }
        });
    },
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
  created() {
    console.log('getusers');
    this.getTheUser();
  },
};
</script>

<style scoped>
</style>
