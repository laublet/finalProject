<template>
     <router-view></router-view>
</template>

<script>
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';

export default {
  name: 'user',
  components: {
    UserDetail,
    UserList,
  },
  data() {
    return {
      title: 'Here is your awesomeUserList',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
