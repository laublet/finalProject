<template>
  <div class="col-xs-12">
    <div class="sendmessages">
      <form v-on:submit.prevent>
        <div class="row sendmessages__row">
          <h2 class="heading-secondary">{{ title }}</h2>
          <hr>
          <div class="form-group">
            <label for="username"></label>
            <input v-model="messagesToSend.username" id="username" class="form-control" name="username" type="text" placeholder="To" required>
          </div>
          <div class="form-group" >
            <label for="title"></label>
            <input v-model="messagesToSend.title" id="title" class="form-control" name="title" type="text" placeholder="Title" required>
          </div>
          <div class="form-group">
            <label for="content"></label>
            <textarea
            v-model="messagesToSend.content"
            id="content"
            class="form-control"
            rows="5"
            placeholder="Tape your message here !"
            required
            ></textarea>
          </div>
          <button v-on:click = "sendMessage" class="btn btn-lg btn--white">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'sendMessages',
  data() {
    return {
      title: 'Send your message !',
      messagesToSend: {
        title: '',
        content: '',
        userID: '',
        username: '',
      },
    };
  },
  methods: {
    sendMessage() {
      this.$http
        .post('/messages', this.messagesToSend)
        .then((res) => {
          if (res) {
            swal('Great !', 'Your message has been send', 'success');
            (this.messagesToSend.title = ''), (this.messagesToSend.content = '');
          } else swal('You need to fill all the inputs');
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
    this.messagesToSend.userID = this.$route.params.userID;
    this.messagesToSend.username = this.$route.params.username;
  },
};
</script>

<style scoped>

</style>
