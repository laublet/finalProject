<template>
  <div class="auth">
    <form v-on:submit.prevent>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1 class="heading-primary">{{ title }}</h1>
          <hr>
          <div class="form-group">
        <label for="email">Email </label>
       <input v-model="user.email" id="email" class="form-control" name="email" type="email" placeholder="email@example.com" required>
        </div>
          <div class="form-group">
        <label for="password">Password</label>
        <input v-model="user.password" id="password" class="form-control" name="password" type="password" placeholder="Enter your password" required>
        </div>
          <button class="btn btn-lg btn--white" v-on:click="login">Login</button>
          <router-link tag="button" class="btn btn-lg btn--white" :to="{name:'signup'}">Go to Signup</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'login',
  data() {
    return {
      title: 'Login',
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$http
        .post('/auth/login', this.user)
        .then((res) => {
          const token = res.data.content.token;
          localStorage.setItem('Clef', token);
          localStorage.setItem('User', res.data.content.username);
          if (token) {
            this.$router.push('/home');
          } else {
            swal({
              type: 'error',
              text: 'Server error',
            });
          }
        })
        .catch((error) => {
          swal({
            type: 'error',
            title: 'Oh no ...',
            text: error.response.data.message,
          });
        });
    },
    test() {
      console.log('test');
      this.$validator.validateAll().then((response) => {
        if (response) {
          console.log('test ok');
        } else {
          // console.log('error': err);
        }
      });
    },
  },
  created() {
    this.user.email = 'test@test.com';
    this.user.password = 'test';
  },
};
</script>

<style scoped>
</style>
