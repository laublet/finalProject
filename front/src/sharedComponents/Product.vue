<template>
  <div>

    <div @click="productdetail">
      <div class="row productdetail__row">
        <div :class="[{product: !this.$route.params.id}, {productdetail__product: this.$route.params.id}]">
          <img class="col lg-6 product__img" :src="'http://localhost:8000/productImages/' + namingProps.pictures" alt="" v-if="namingProps.pictures">
          <div class="col lg-6 product__content" >
            <h2>{{ namingProps.title}}</h2>
            <p>{{ namingProps.description }}</p>
            <p>{{ namingProps.price }} euros</p>
            <!-- <hr> -->
            <div class="product__contact" v-if="this.$route.params.id">
              <h2 >Interested by this product ? </h2>
              <button @click="contact(namingProps.username)" class="btn btn-lg btn--white">Contact Me !</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'product',
  props: ['namingProps'],
  data() {
    return {
      title: 'Product Component',
    };
  },
  methods: {
    contact(idTosendTo) {
      console.log('idTosendTo', idTosendTo);
      this.$router.push({
        name: 'sendMessages',
        params: { userID: idTosendTo },
      });
    },
    productdetail() {
      this.$router.push({
        name: 'productDetail',
        params: { id: this.namingProps._id, product: this.namingProps },
      });
    },
  },
  beforeMount() {
    if (this.$route.params.id) {
      this.namingProps = this.$route.params.product;
    }
  },
};
</script>

<style scoped>

</style>
