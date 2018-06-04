<template>
  <div>
    <div>
      <router-link :to="{name: 'productsListUser'}">
        <button class="btn btn-lg btn--menu">Your products</button>
      </router-link>
      <router-link :to="{name: 'profileEdit'}">
        <button class="btn btn-lg btn--menu">Edit your profile</button>
      </router-link>
      <router-view></router-view><br>
    </div>
  </div>
</template>

<script>

export default {
  name: 'profile',
};
</script>

<style scoped>

</style>
