<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor
      v-for="floorItem in floorList"
      :key="floorItem.id"
      :floorData="floorItem"
    ></Floor>
    <Brand />
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

import { mapState, mapActions } from "vuex";

export default {
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  methods: {
    ...mapActions("home", ["floorListUpdata"]),
  },
  mounted() {
    this.floorListUpdata();
  },
};
</script>

<style>
</style>