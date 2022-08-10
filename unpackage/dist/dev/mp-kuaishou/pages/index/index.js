"use strict";
var common_vendor = require("../../common/vendor.js");
var common_config = require("../../common/config.js");
var common_api = require("../../common/api.js");
require("../../common/http.js");
require("../../store/index.js");
require("../../common/tools.js");
require("../../common/util.js");
require("../../common/constant.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const state = common_vendor.reactive({
      base: common_config.CoverUrl,
      list: []
    });
    const initData = async () => {
      let res = await common_api.BookApi.Flows({
        openFrom: "toutiao",
        page: 1,
        rows: 100
      });
      console.log("book", res);
      state.list = res.data;
    };
    common_vendor.onMounted(() => {
      initData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.list, (item, index, i0) => {
          return {
            a: `${state.base}/${item.book_id}/${item.cover}`,
            b: common_vendor.t(item.recommend),
            c: `../read/read?bid=${item.book_id}&totype=0`,
            d: index
          };
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/index/index.vue"]]);
ks.createPage(MiniProgramPage);
