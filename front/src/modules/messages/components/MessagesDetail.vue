<template>
  <div class="col-xs-12">
    <div class="messagesdetails">
      <h2 class="heading-secondary">{{ this.message.title }}</h2>
      <p>From: {{ this.message.from }}</p>
      <div class="messagesdetails__content">{{ this.message.content }}</div>
      <button @click="contact(message.senderId, message.from)" class="btn btn-lg btn--white">Response</button>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'messagesDetail',
  data() {
    return {
      message: [],
    };
  },
  methods: {
    contact(idTosendTo, usernameTosendTo) {
      console.log(idTosendTo, usernameTosendTo);
      this.$router.push({
        name: 'sendMessages',
        params: { userID: idTosendTo, username: usernameTosendTo },
      });
    },
    update(id) {
      const _readDate = Date.now();
      if (this.$route.params.message.read === false) {
        this.$http
          .put(`/messages/${id}`, { readDate: _readDate })
          .then((res) => {})
          .catch((error) => {
            if (error) {
              swal({
                type: 'error',
                title: 'Oh no ...',
                text: error.response.data.message,
              });
            }
          });
      }
    },
    getMessage(id) {
      this.$http
        .get(`/messages/${id}`)
        .then((res) => {
          this.message = res.data.content;
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
  },
  beforeMount() {
    const id = this.$route.params.ID;
    if (this.$route.params.message === undefined) {
      this.getMessage(id);
    } else {
      this.message = this.$route.params.message;
    }
    this.update(id);
  },
};
</script>

<style scoped>
.content {
  white-space: normal;
}
</style>
