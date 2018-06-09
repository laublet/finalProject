<template>
  <div class="productsListUser" >
    <h2 class="heading-secondary">{{ title }}</h2>
    <div class="row productsListUser__row">
      <ProductUser style="cursor: pointer" v-for="product in products" :key="product._id"   :namingProps="product"></ProductUser>
    </div>
  </div>
</template>

<script>
import ProductUser from '@/sharedComponents/ProductUser';
import swal from 'sweetalert2';

export default {
  name: 'productListUser',
  data() {
    return {
      title: 'Here are your products registered',
      products: [],
    };
  },
  components: {
    ProductUser,
  },
  methods: {
    getProducts() {
      this.$http
        .get('/profile/products', {})
        .then((res) => {
          this.products = res.data.content;
        })
        .catch((error) => {
          swal({
            type: 'error',
            title: 'Oh no ...',
            text: error.response.data.message,
          });
        });
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>

<style scoped>

</style>
