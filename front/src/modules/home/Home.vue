<template>
  <div>
    <div class="productslist" >
      <h2 class="heading-tertiary">{{ titleTwo }}</h2>
      <div class="row productslist__row">
        <product style="cursor: pointer" v-for="product in products.slice(0, 10)" :key="product._id" :namingProps="product"></product>
      </div>
    </div>
    <div class="welcome" >
      <div class="row welcome__row">
        <!-- <router-link :to="{name: 'productsList'}">
          <button class="btn btn-lg btn--menu">Get the list of products !</button>
        </router-link><br> -->
        <h2 class="heading-secondary">{{ titleOne }}</h2>
      </div>
      <div id="mapid"></div>
    </div>
  </div>
</template>

<script>
import Product from '@/sharedComponents/Product';
import swal from 'sweetalert2';
import Welcome from './components/Welcome';

export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome',
      titleOne: 'Welcome',
      titleTwo: 'Here is your AwesomeProductsList',
      products: [],
      productsLocation: [],
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
          res.data.content.forEach((element) => {
            const locations = [element.title, element.address.latitude, element.address.longitude];
            this.productsLocation.push(locations);
          });
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
    mapinit() {
      const currentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const markerCurrentLocation = L.marker([
              position.coords.latitude,
              position.coords.longitude,
            ]).addTo(mymap);
            this.$store.state.location = position.coords;

            const locations = this.productsLocation;
            // console.log(locations);
            for (let i = 0; i < locations.length; i++) {
              if (locations[i][1] == null || locations[i][2] == null) {
              } else {
                const markerLocation = new L.marker([locations[i][1], locations[i][2]]).addTo(
                  mymap,
                );
                const geocodingProduct = L.esri.Geocoding.reverseGeocode()
                  .latlng([locations[i][1], locations[i][2]])
                  .run((error, result, response) => {
                    const address = result.address;
                    // console.log(result.address);
                    // console.log(address.Match_addr);
                    markerLocation
                      .bindPopup(`${locations[i][0]} <br> ${address.Match_addr}`)
                      .openPopup();
                  });

                const geocoding = L.esri.Geocoding.reverseGeocode()
                  .latlng([position.coords.latitude, position.coords.longitude])
                  .run((error, result, response) => {
                    const address = result.address;
                    this.$store.state.location = address;
                    this.$store.state.location.latitude = position.coords.latitude;
                    this.$store.state.location.longitude = position.coords.longitude;
                    markerCurrentLocation
                      .bindPopup(`You are here </br> ${this.$store.state.location.Match_addr}`)
                      .openPopup();
                  });
              }
            }
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
  created() {
    this.getProducts();
  },
  mounted() {
    this.mapinit();
  },
};
</script>

<style scoped>

</style>
