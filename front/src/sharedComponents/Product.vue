<template>
  <div>
    <div @click="productdetail">
      <div class="row productdetail__row">
        <div :class="[{product: !this.$route.params.id}, {productdetail: this.$route.params.id}]">
          <img class="product__img" :src="'http://localhost:8000/productImages/' + this.mutableList.pictures" alt="" v-if="mutableList.pictures">
          <div class="product__content">
            <h2 class="product__title">{{ mutableList.title}}</h2><br>
            <p class="product__price">Price: {{ mutableList.price }} €</p>
            <hr>
            <p :class="[{product__description: !this.$route.params.id}, {productdetail__description: this.$route.params.id}]">Description: <br>{{ mutableList.description }}</p>
            <div class="product__contact" v-if="this.$router.currentRoute.name === 'productDetail'">
              <h2> Interested by this product ? </h2>
              <button @click="contact( mutableList.userId, mutableList.username)" class="btn btn-lg btn--white">Contact Me !</button>
            </div>
            <div class="product__contact" v-if="this.$router.currentRoute.name === 'productUser'">
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
  name: 'product',
  props: ['namingProps'],
  data() {
    return {
      title: 'Product Component',
      mutableList: this.namingProps,
      switch: true,
    };
  },
  methods: {
    switcher() {
      this.switch = !this.switch;
    },
    contact(idTosendTo, usernameTosendTo) {
      this.$router.push({
        name: 'sendMessages',
        params: { userID: idTosendTo, username: usernameTosendTo },
      });
    },
    productdetail() {
      if (this.$router.currentRoute.name === 'productsList') {
        this.$router.push({
          name: 'productDetail',
          params: { id: this.namingProps._id, product: this.namingProps },
        });
      } else {
        this.$router.push({
          name: 'productUser',
          params: { id: this.namingProps._id, product: this.namingProps },
        });
      }
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
      this.mutableList = this.$route.params.product;
      console.log(this.$router.currentRoute);
    }
  },
};
</script>

<style scoped>
</style>
