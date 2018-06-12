<template>
  <div class="auth">
    <form v-on:submit.prevent>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1 class="heading-secondary">{{ title }}</h1>
          <hr>
          <div class="form-group">
            <label for="username">Pseudo
              <span>*</span>
            </label>
            <input v-model="user.username" id="username" class="form-control" name="username" type="text" placeholder="Choose an username" required>
            <!-- <input v-model="user.password" id="password" name="password" type="password" placeholder="password" pattern=".{5,10}" title="5 to 10 characters" required> -->
          </div>
          <div class="form-group">
            <label for="email">Email
              <span>*</span>
            </label>
            <input v-model="user.email" id="email" class="form-control" name="email" type="email" placeholder="email@example.com" required>
          </div>
          <div class="form-group">
            <label for="password">Password
              <span>*</span>
            </label>
            <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter a valid password" required>
          </div>
          <div class="form-group">
            <label for="comfirmPassword">Password Comfirmation
              <span>*</span>
            </label>
            <input v-model="comfirmPassword" id="comfirmPassword" class="form-control" name="comfirmPassword" type="password" placeholder="Enter a valid password" required>
          </div>
          <router-link tag="button" class="btn btn-lg btn--white" :to="{name:'login'}">Go to Login</router-link>
          <button class="btn btn-lg btn--white" @click="check">Sign In</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'signup',
  data() {
    return {
      title: 'Signup',
      user: {
        email: '',
        username: '',
        password: '',
      },
      comfirmPassword: '',
    };
  },
  methods: {
    signIn() {
      this.$http
        .post('/auth/signup', this.user)
        .then((res) => {
          if (res) {
            swal({
              type: 'success',
              title: 'Congrat !',
              text: res.data.message,
            });
            this.$router.push('/login');
          } else {
            swal({
              type: 'error',
              text: 'Server Error',
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
          }
        });
    },
    check() {
      if (this.user.password === this.comfirmPassword) {
        this.signIn();
      } else {
        swal({
          type: 'error',
          title: 'Oups',
          text: 'You must enter the same password twice',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
