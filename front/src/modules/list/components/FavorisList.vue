<template>
  <div class="productslist" >
    <h2 class="heading-tertiary">{{ title }}</h2>
    <!-- <div class="row productslist__row">
      <product style="cursor: pointer" v-for="product in products.slice(0, 10)" :key="product._id" :namingProps="product"></product>
    </div> -->
  </div>
</template>

<script>
import Product from '@/sharedComponents/Product';
import swal from 'sweetalert2';

export default {
  name: 'favoriteList',
  data() {
    return {
      title: 'Here is your favorite',
      products: [],
    };
  },
  components: {
    Product,
  },
  methods: {
    getProducts() {
      this.$http
        .get('/products', {})
        .then((res) => {
          this.products = res.data.content;
        })
        .catch((error) => {
          if (error)
            {swal({
              type: 'error',
              title: 'Oh no ...',
              text: error.response.data.message,
            });}
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
