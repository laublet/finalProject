<template>
  <div class="col-xs-12">
    <div class="messageslist">
      <h2 class="heading-secondary">{{ title }}</h2>
      <div class="row messageslist__row">
        <router-link tag="div" :class="[{messageslist__messageToRead: !message.read},{messageslist__messageReaded: message.read}]" :to="{name:'messagesDetail' , params: {ID: message._id , message: message}}" style="cursor: pointer" v-for='message in paginatedMessages' :key="message._id">
          <p>Subject: {{ message.title }}</p>
          <p>From: {{ message.from }}</p>
          <p>{{ message.content }}</p>
        </router-link>
      </div>
      <button :disabled="pageNumber === 0" @click="prevPage">Previous</button>
      {{pageNumber + 1}} / {{pageCount}}
      <button :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
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
      pageNumber: 0,
      size: 5,
    };
  },
  computed: {
    // productsFilter() {
    //   return this.messages.filter(message => message.from.match(this.filter));
    // },
    pageCount() {
      const length = this.messages.length;
      const size = this.size;
      return Math.floor(length / size);
    },
    paginatedMessages() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.messages.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    getMessage() {
      this.$http
        .get('/messages', {})
        .then((res) => {
          this.messages = res.data.content;
          this.messages.reverse();
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
