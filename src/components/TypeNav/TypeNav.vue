<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveCur" @mouseenter="navShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="navTrans">
          <div class="sort" v-show="navIsShow">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(categoryListItem, index) in categoryList.slice(0, 15)"
                :key="categoryListItem.categoryId"
              >
                <h3
                  @mouseenter="addCur(index)"
                  :class="{ cur: index == hoverIndex }"
                >
                  <a
                    :data-categoryname="categoryListItem.categoryName"
                    :data-category1Id="categoryListItem.categoryId"
                    >{{ categoryListItem.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in categoryListItem.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryname="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.id">
                          <a
                            :data-categoryname="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  data() {
    return {
      hoverIndex: -1,
      navIsShow: true,
    };
  },
  name: "TypeNav",
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 鼠标移入控制search的nav展示
    navShow() {
      this.navIsShow = true;
    },

    // goSearch跳转到搜索页
    goSearch(e) {
      let elDataLi = e.target.dataset;
      if (elDataLi.categoryname) {
        let queryObj = { categoryName: elDataLi.categoryname };
        if (elDataLi.category1id) {
          queryObj.category1Id = elDataLi.category1id;
        } else if (elDataLi.category2id) {
          queryObj.category2Id = elDataLi.category2id;
        } else if (elDataLi.category3id) {
          queryObj.category3Id = elDataLi.category3id;
        }
        if (this.$route.params) {
          this.$router.push({
            name: "search",
            query: queryObj,
            params: this.$route.params,
          });
        } else {
          this.$router.push({
            name: "search",
            query: queryObj,
          });
        }
      }
    },

    // 添加移入移出背景变红
    addCur: throttle(function (index) {
      this.hoverIndex = index;
    }, 100),
    moveCur() {
      this.hoverIndex = -1;
      if (!this.$route.path.indexOf("/search")) {
        this.navIsShow = false;
      }
    },
  },
  mounted() {
    if (this.$route.path == "/home" || this.$route.path == "/") {
      this.navIsShow = true;
    } else {
      this.navIsShow = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }

    .navTrans-enter,
    .navTrans-leave-to {
      height: 0;
      transition: 1s;
    }
    .navTrans-enter-to,
    .navTrans-leave {
      height: 461px;
      transition: 1s;
    }
  }
}
.cur {
  background-color: #e1251b;
}
.cur a {
  color: #fff;
}
</style>