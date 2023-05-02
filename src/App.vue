<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions("home", ["categoryListUpdata"]),
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.categoryListUpdata();
  },
};
</script>

<style>
</style>
