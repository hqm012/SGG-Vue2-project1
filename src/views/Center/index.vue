<template>
  <div class="order-main">
    <div class="container">
      <div class="order-body">
        <!--左侧列表-->
        <CenterLeftNav />
        <!-- 右侧内容 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeftNav from "./CenterLeftNav";
import MyOrder from "./MyOrder";
export default {
  name: "Center",
  components: { CenterLeftNav, MyOrder },
};
</script>

<style lang="less" scoped>
.order-main {
  .container {
    margin: 0 auto;
    width: 1200px;

    .order-body {
      padding: 10px;
      color: #333;

      &:after {
        content: "";
        display: block;
        clear: both;
      }

      //右边
    }
  }
}
</style>