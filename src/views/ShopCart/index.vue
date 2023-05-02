<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartListItem in cartListInfo"
          :key="cartListItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartListItem.isChecked"
              @change="CheckCart(cartListItem.skuId, cartListItem.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartListItem.imgUrl" />
            <div class="item-msg">
              {{ cartListItem.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">{{ cartListItem.sourceType }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartListItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="foo('-1', -1, cartListItem)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartListItem.skuNum"
              minnum="1"
              class="itxt"
              @change="foo('0', +$event.target.value, cartListItem)"
            />
            <a class="plus" @click="foo('1', 1, cartListItem)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              cartListItem.skuNum * cartListItem.skuPrice
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleCart(cartListItem.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="checkInfo.isAllCheck"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleAllCheck">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkInfo.checkCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPri }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getUUID } from "@/utils/uuid";
import { reqAddToCart, reqDeleteCart, reqCheckCart } from "@/api";
export default {
  name: "ShopCart",
  computed: {
    ...mapState("detail", ["cartListInfo"]),
    totalPri() {
      let num = 0;
      this.cartListInfo.forEach((element) => {
        num += element.skuNum * element.skuPrice;
      });
      return num;
    },
    checkInfo() {
      let isAllCheck = this.cartListInfo.every((item) => item.isChecked === 1);
      let checkCount = this.cartListInfo.reduce((result, item) => {
        return result + item.isChecked;
      }, 0);
      return { isAllCheck, checkCount };
    },
  },
  methods: {
    ...mapActions("detail", ["reqCartListInfo"]),
    foo(param1, changeNum, cartListItem) {
      switch (param1) {
        case "-1":
          if (cartListItem.skuNum > 1) {
            changeNum = -1;
          } else {
            changeNum = 0;
          }
          break;

        case "1":
          changeNum = 1;
          break;

        case "0":
          if (isNaN(changeNum) || changeNum < 1) {
            changeNum = 0;
          } else {
            changeNum = parseInt(changeNum) - cartListItem.skuNum;
          }
          break;
      }
      // console.log(changeNum);
      reqAddToCart(cartListItem.skuId, changeNum, getUUID()).then(() => {
        this.reqCartListInfo(getUUID());
      });
    },
    deleCart(skuId) {
      reqDeleteCart(getUUID(), skuId);
      this.reqCartListInfo(getUUID());
    },
    async CheckCart(skuId, isChecked) {
      await reqCheckCart(getUUID(), skuId, Number(!isChecked));
      this.reqCartListInfo(getUUID());
    },
    deleAllCheck() {
      let arrProm = [];
      this.cartListInfo.forEach((item) => {
        if (item.isChecked === 1) {
          // reqDeleteCart(getUUID(), item.skuId);
          arrProm.push(reqDeleteCart(getUUID(), item.skuId));
        }
      });
      console.log(arrProm);
      Promise.all(arrProm).then(() => {
        this.reqCartListInfo(getUUID());
      });
    },
  },
  mounted() {
    const uuid = getUUID();
    this.reqCartListInfo(uuid);
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>