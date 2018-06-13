<template>
  <nav class="navbar navbar-default ournav" id="background">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div>
          <ul class="nav navbar-nav">
            <router-link tag="li" :to="{name: 'home'}"><a>SimplonCoin</a></router-link>
          </ul>
        </div>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" :to="{name: 'newProduct'}"><a>Register a product</a></router-link>
          <router-link tag="li" :to="{name: 'productsList'}"><a>List of products</a></router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <router-link tag="li" :to="{name: 'messagesList'}"><a>Your Inbox</a></router-link>
          <router-link tag="li" :to="{name: 'profileEdit'}"><a>{{ User }}</a></router-link>
          <li><a href="#" @click="routerLogout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      User: localStorage.getItem('User'),
    };
  },
  methods: {
    routerLogout() {
      localStorage.removeItem('Clef');
      localStorage.removeItem('User');
      this.$router.push('/login');
    },
    Token() {
      const getToken = localStorage.getItem('Clef');
      if (getToken === null) {
        this.$router.push('/login');
      }
    },
  },
  created() {
    this.Token();
  },
};
</script>

<style scoped>

</style>
