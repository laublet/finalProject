<template>
  <div>
    <div class="col-xs-6">
      <div class="NewProduct">
        <div class="row NewProduct__row">
          <form v-on:submit.prevent>
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <h2 class="heading-secondary">{{ title }}</h2>
              <hr>
              <div class="form-group">
                <label for="title">Title
                  <span>*</span>
                </label>
                <input v-model="product.title" id="title" class="form-control" name="title" type="text" placeholder="The name of your product" required>
              </div>
              <div class="form-group">
                <label for="description">Description
                  <span>*</span>
                </label>
                <input v-model="product.description" id="description" class="form-control" name="description" type="text" placeholder="Describe your product" required>
              </div>
              <div class="form-group">
                <label for="price">Price </label>
                <input v-model="product.price" id="price" class="form-control" name="price" type="number" placeholder="..." required>
              </div>
              <div class="form-group">
                <label for="picture">Picture </label>
                <picture-input v-model="picture" id="picture" name="picture" ref="pictureInput" @change="onChanged" @remove="onRemoved" :width="300" :removable="true" removeButtonClass="ui red button" :height="300" accept="image/jpeg, image/png, image/gif" buttonClass="ui button primary" :customStrings="{
            upload: '<h1>Upload it!</h1>',
            drag: 'Drag and drop your image here'}" :zIndex="1">
                </picture-input>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-xs-6">
      <div>
        <h1>Localisation</h1>
        <div id="mapid"></div>
      </div>
    </div>
    <button class="btn btn-lg btn--white" @click="sendData">Validate !</button>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import PictureInput from 'vue-picture-input';
import FormDataPost from '../../upload';

export default {
  name: 'newProduct',
  components: {
    PictureInput,
  },
  data() {
    return {
      title: 'Register a New Product',
      product: {
        title: '',
        description: '',
        price: '',
        address: {},
      },
      picture: '',
    };
  },
  methods: {
    onChanged() {
      if (this.$refs.pictureInput.file) this.picture = this.$refs.pictureInput.file;
    },
    onRemoved() {
      this.picture = '';
    },
    sendData() {
      if (this.product.title && this.product.description && this.product.price) {
        const data = new FormData();
        data.append('product', JSON.stringify(this.product));
        data.append('picture', this.picture);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        this.$http
          .post('/products', data, config)
          .then((res) => {
            if (res) {
              swal({
                type: 'success',
                title: 'Congrat !',
                text: res.data.message,
              });
              this.picture = '';
              this.product = {};
            } else {
              alert('Server Error');
            }
          })
          .catch((error) => {
            if (error) {
              swal({
                type: 'error',
                title: 'Oh no ...',
                text: error.response.data.message,
              });
              this.product = {};
              this.onRemoved();
            }
          });
      } else {
        swal({
          type: 'error',
          title: 'Oh no ...',
          text: 'You must fill all the field',
        });
      }
    },
    mapinit() {
      const currentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const markerCurrentLocation = L.marker([
              position.coords.latitude,
              position.coords.longitude,
            ]).addTo(mymap);
            const geocoding = L.esri.Geocoding.reverseGeocode()
              .latlng([position.coords.latitude, position.coords.longitude])
              .run((error, result, response) => {
                const address = result.address;
                this.product.address.completeAddress = address.Match_addr;
                this.product.address.city = address.City;
                this.product.address.postal = address.Postal;
                this.product.address.street = address.Address;
                this.product.address.latitude = position.coords.latitude;
                this.product.address.longitude = position.coords.longitude;
                markerCurrentLocation
                  .bindPopup(`You are here </br> ${address.Match_addr}`)
                  .openPopup();
              });
          });
        } else {
          alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
      };
      currentLocation();
      let mymap = L.map('mapid', {
        center: ['45.99956', '-1.21353'],
        zoom: 18,
      });
      L.tileLayer(
        'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken:
            'pk.eyJ1Ijoia2FzMDQiLCJhIjoiY2pmY2Fkcm5uMjlqbTJybnZ4ZmxrbDJoaCJ9.V1aIrSzguAz3gUlY-Qi6Fw',
        },
      ).addTo(mymap);
    },
  },
  mounted() {
    this.mapinit();
  },
};
</script>

<style scoped>
#mapid {
  height: 100px;
  width: 300px;
  border: 1px solid black;
  }
</style>
