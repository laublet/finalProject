<template>
<div>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import MessagesList from './components/MessagesList';
import MessagesDetail from './components/MessagesDetail';

export default {
  name: 'messages',
  data() {
    return {
      Status: true,
    };
  },
  components: {
    MessagesList,
    MessagesDetail,
  },
  methods: {},
};
</script>

<style scoped>

</style>
