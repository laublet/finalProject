<template>
  <div id="app">
   <router-view name="header"></router-view>
   <div class="container-fluid no-gutters">
     <router-view></router-view>
   </div>
 </div>
</template>

<script>
import Auth from '@/modules/auth/Auth';
import Home from '@/modules/home/Home';
import NewProduct from '@/modules/newProduct/NewProduct';
import Messages from '@/modules/messages/Messages';
import User from '@/modules/user/User';
import Header from '@/sharedComponents/Header';
import Product from '@/sharedComponents/Product';

export default {
  name: 'App',
  components: {
    Auth,
    Home,
    NewProduct,
    Messages,
    User,
    Header,
    Product,
  },
};
</script>

<style>
.container-fluid {
  padding: 0 !important;
}
</style>
