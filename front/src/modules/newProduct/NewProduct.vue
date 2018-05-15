<template>
  <div>
    <productForm></productForm>
    <localisationForm></localisationForm>
    <profileForm></profileForm>
  </div>
</template>

<script>
import ProductForm from './components/ProductForm';
import LocalisationForm from './components/LocalisationForm';
import ProfileForm from './components/ProfileForm';

export default {
  name: 'newProduct',
  // data() {
  //     return {
  //       title: 'Here are your products registered',
  //     };
  //   },
  components: {
    ProductForm,
    LocalisationForm,
    ProfileForm,
  },
};
</script>

<style scoped>

</style>
