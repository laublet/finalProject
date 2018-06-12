<template>
  <div class="productsListUser" >
    <h2 class="heading-secondary">{{ title }}</h2>
    <div class="row productsListUser__row">
      <Product style="cursor: pointer" v-for="product in paginatedProducts" :key="product._id" :namingProps="product"></Product>
    </div>
    <div v-if="this.productsFilter < 1">
          No product
        </div>
    <button :disabled="pageNumber === 0" @click="prevPage" class="btn btn-lg btn--white">Previous</button>
    {{pageNumber + 1}} / {{pageCount}}
    <button :disabled="pageNumber >= pageCount" @click="nextPage" class="btn btn-lg btn--white">Next</button>
  </div>
</template>

<script>
import Product from '@/sharedComponents/Product';
import swal from 'sweetalert2';

export default {
  name: 'productListUser',
  data() {
    return {
      title: 'Here are your products',
      products: [],
      pageNumber: 0,
      size: 6,
      filter: '',
    };
  },
  components: {
    Product,
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
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
  computed: {
    productsFilter() {
      return this.products.filter(product => product.title.match(this.filter));
    },
    pageCount() {
      const length = this.productsFilter.length;
      const size = this.size;
      return Math.floor(length / size);
    },
    paginatedProducts() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.productsFilter.slice(start, end);
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>

<style scoped>

</style>
