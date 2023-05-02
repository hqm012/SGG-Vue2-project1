<template>
  <div>
    <type-nav />
    我是搜索组件, 这是我接的query参数：
    {{ searchTextQ }}
    这是我接的params参数：
    {{ searchTextP }}
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav/TypeNav.vue";
export default {
  components: { TypeNav },
  props: ["searchTextQ", "searchTextP"],
};
</script>

<style>
</style>