"use strict";
var common_vendor = require("../../common/vendor.js");
var common_api = require("../../common/api.js");
var store_index = require("../../store/index.js");
var common_tools = require("../../common/tools.js");
require("../../common/http.js");
require("../../common/config.js");
require("../../common/constant.js");
require("../../common/util.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "readList",
  setup(__props) {
    const userId = store_index.store.getters.userId;
    let readlist = common_vendor.ref(null);
    const initData = async () => {
      const res = await common_api.BookApi.ReadList({
        user_id: userId,
        page: 1,
        rows: 100
      });
      if (common_tools.IsEmptyObject(res.data))
        return;
      readlist.value = res.data;
    };
    const gotoRead = (fId, bId) => {
      common_tools.RoutePush(`/pages/read/read?totype=1&bid=${bId}`);
    };
    common_vendor.onMounted(() => {
      initData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(readlist), (item, index, i0) => {
          return {
            a: common_vendor.t(item.book_title),
            b: common_vendor.t(item.pen_name),
            c: common_vendor.t(item.content),
            d: common_vendor.o(($event) => gotoRead(item.flow_id, item.book_id)),
            e: index
          };
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44a99cf8"], ["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/read/readList.vue"]]);
ks.createPage(MiniProgramPage);
