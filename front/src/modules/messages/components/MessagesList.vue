<template>
  <div class="col-xs-12">
    <div class="messageslist">
      <h2 class="heading-secondary">{{ title }}</h2>
      <div class="row messageslist__row">
        <router-link tag="div" :class="[{messageslist__messageToRead: !message.read}, {messageslist__messageReaded: message.read}]"  :to="{name:'messagesDetail' , params: {ID: message._id , message: message}}" style="cursor: pointer" v-for='message in messages' :key="message._id">
          <p>Subject: {{ message.title }}</p>
          <p>From: {{ message.from }}</p>
          <p>{{ message.content }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'messagesList',
  data() {
    return {
      title: 'Here are your AwesomeMessages',
      messages: [],
    };
  },
  methods: {
    getMessage() {
      this.$http
        .get('/messages', {})
        .then((res) => {
          this.messages = res.data.content;
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
    this.getMessage();
  },
};
</script>

<style scoped>

</style>
