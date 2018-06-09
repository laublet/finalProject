<template>
  <div>
    <div class="productslist">
      <h2 class="heading-tertiary">{{ title }}</h2>
      <div class="row productslist__row">
        <product style="cursor: pointer" v-for="product in paginatedData" :key="product._id" :namingProps="product"></product>
      </div>
    </div>
    <button :disabled="pageNumber === 0" @click="prevPage">
      Previous
    </button>
    {{pageNumber + 1}} / {{pageCount}}
    <button :disabled="pageNumber >= pageCount -1" @click="nextPage">
      Next
    </button>
  </div>
</template>

<script>
import Product from '@/sharedComponents/Product';
import swal from 'sweetalert2';

export default {
  name: 'productsList',
  data() {
    return {
      title: 'Here is your AwesomeProductsList',
      products: [],
      pageNumber: 0,
      size: 1,
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
        .get('/products', {})
        .then((res) => {
          this.products = res.data.content;
        })
        .catch((error) => {
          if (error) {
            swal({
              type: 'error',
              title: 'Oh no ...',
              text: error.response.data.message,
            });
          }
        });
    },
  },
  computed: {
    pageCount() {
      const length = this.products.length;
      const size = this.size;
      return Math.floor(length / size);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.products.slice(start, end);
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>

<style scoped>
</style>
