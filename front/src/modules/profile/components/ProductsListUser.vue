<template>
  <div class="productsListUser" >
    <h2 class="heading-secondary">{{ title }}</h2>
    <div class="row productsListUser__row">
      <product style="cursor: pointer" v-for="product in products" :key="product._id"   :namingProps="product"></product>
    </div>
  </div>
</template>

<script>
import Product from '@/sharedComponents/Product';
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
    Product,
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
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>

</style>
