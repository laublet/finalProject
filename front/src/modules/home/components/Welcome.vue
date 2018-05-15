<template>
  <div class="welcome" >
    <div class="row welcome__row">
      <router-link :to="{name: 'productsList'}">
        <button class="btn btn-lg btn--menu">Get the list of products !</button>
      </router-link><br>
      <h2 class="heading-secondary">{{ title }}</h2>
    </div>
    <div id="mapid"></div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'welcome',
  data() {
    return {
      title: 'Welcome',
    };
  },
  mounted() {
    this.mapinit();
  },
  methods: {
    mapinit() {
      const currentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const markerCurrentLocation = L.marker([
              position.coords.latitude,
              position.coords.longitude,
            ]).addTo(mymap);
            this.$store.state.location = position.coords;

            const locations = [['LOCATION_1', 48, 2], ['LOCATION_5', 48.5, 2]];

            for (let i = 0; i < locations.length; i++) {
              const markerLocation = new L.marker([locations[i][1], locations[i][2]]).addTo(mymap);
              const geocodingProduct = L.esri.Geocoding.reverseGeocode()
                .latlng([locations[i][1], locations[i][2]])
                .run((error, result, response) => {
                  const address = result.address;
                  console.log(result.address);
                  console.log(address.Match_addr);
                  markerLocation.bindPopup(`test${  address.Match_addr}`).openPopup();
                });

              const geocoding = L.esri.Geocoding.reverseGeocode()
                .latlng([position.coords.latitude, position.coords.longitude])
                .run((error, result, response) => {
                  const address = result.address;
                  this.$store.state.location = address;
                  this.$store.state.location.latitude = position.coords.latitude;
                  this.$store.state.location.longitude = position.coords.longitude;
                  markerCurrentLocation
                    .bindPopup(`You are here </br> ${  this.$store.state.location.Match_addr}`)
                    .openPopup();
                });
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
};
</script>

<style scoped>

</style>
