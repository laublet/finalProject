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
            <input v-model="password" id="password" class="form-control" name="password" type="password" placeholder="Enter a valid password" required>
          </div>
          <div class="form-group" >
            <label for="comfirmPassword">Comfirm Password <span>*</span> </label>
            <input v-model="comfirmPassword" id="comfirmPassword" class="form-control" name="comfirmPassword" type="password" placeholder="Enter a valid password" required>
          </div>
        </div>
        <hr>
      </form>
    </div>
    <button class="btn btn-lg btn--white" @click="check">Delete your profile</button>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'profileEdit',
  data() {
    return {
      title: 'Delete your profile permanently',
      password: '',
      comfirmPassword: '',
    };
  },
  methods: {
    check() {
      if (!this.password && !this.comfirmPassword) {
        swal({
          type: 'error',
          title: 'Oups',
          text: 'You must fill ',
        });
      } else if (this.password === this.comfirmPassword) {
        this.deleteUser(this.password);
      } else {
        swal({
          type: 'error',
          title: 'Oups',
          text: 'Wrong password',
        });
      }
    },
    deleteUser(password) {
      this.$http
        .delete('/profile', password)
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
};
</script>

<style scoped>

</style>
