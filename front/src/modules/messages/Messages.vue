<template>
<div>
  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>

export default {
  name: 'messages',
  data() {
    return {
      Status: true,
    };
  },
};
</script>

<style scoped>

</style>
