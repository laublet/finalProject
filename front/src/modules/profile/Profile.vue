<template>
  <div>
    <div>
      <router-link :to="{name: 'newProduct'}">
        <button class="btn btn-lg btn--menu">Register a new product </button>
      </router-link>
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
import NewProduct from './components/NewProduct';
import ProductsListUser from './components/ProductsListUser';
import ProfileEdit from './components/ProfileEdit';

export default {
  name: 'profile',
};
</script>

<style scoped>

</style>
