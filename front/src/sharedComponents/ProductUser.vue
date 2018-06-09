<template>
  <div>
    <div @click="productdetail">
      <div class="row productdetail__row">
        <div :class="[{product: !this.$route.params.id}, {productdetail__product: this.$route.params.id}]">
          <img class="col lg-6 product__img" :src="'http://localhost:8000/productImages/' + namingProps.pictures" alt="" v-if="namingProps.pictures">
          <div class="col lg-6 product__content">
            <h2>{{ namingProps.title}}</h2>
            <p>{{ namingProps.description }}</p>
            <p>{{ namingProps.price }} euros</p>
            <!-- <hr> -->
            <div class="product__contact" v-if="this.$route.params.id">
              <h2> Delete your Product </h2>
              <div v-if="this.switch">
              <button @click="switcher" class="btn btn-lg btn--white">Delete</button>
              </div>
              <div v-else>
                <h1>Comfirm password</h1>
                <button @click="switcher" class="btn btn-lg btn--white">Not delete</button>
              <button @click="deleteProduct($route.params.id)" class="btn btn-lg btn--white">Comfirm</button>
              </div>
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
  name: 'productUser',
  props: ['namingProps'],
  data() {
    return {
      title: 'Product Component',
      switch: true,
    };
  },
  methods: {
    switcher() {
      this.switch = !this.switch;
    },
    productdetail() {
      this.$router.push({
        name: 'productUser',
        params: { id: this.namingProps._id, product: this.namingProps },
      });
    },
    check() {
      if (this.password === this.comfirmPassword) {
        this.deleteUser();
      } else {
        swal({
          type: 'error',
          title: 'Oups',
          text: 'Wrong password',
        });
      }
    },
    deleteProduct(id) {
      this.$http
        .delete(`/products/${id}`)
        .then((res) => {
          if (res) {
            swal({
              type: 'success',
              title: 'Congrat !',
              text: res.data.message,
            });
            this.$router.push('/productsListUser');
          } else {
            swal({
              type: 'error',
              text: 'Server error',
            });
          }
        })
        .catch((error) => {
          if (error) {
            swal({
              type: 'error',
              title: 'Oh no ...',
              text: error.response.data.message,
            });
          } else {
            swal({
              type: 'error',
              text: 'Cannot catch error',
            });
          }
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
