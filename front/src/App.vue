<template>
  <div id="app">
    <router-view name="header"></router-view>
    <div class="container-fluid no-gutters">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.container-fluid {
  padding: 0 !important;
}
</style>
