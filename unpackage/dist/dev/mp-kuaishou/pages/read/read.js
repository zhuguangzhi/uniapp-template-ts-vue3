"use strict";
var common_vendor = require("../../common/vendor.js");
var common_tools = require("../../common/tools.js");
var common_api = require("../../common/api.js");
var store_index = require("../../store/index.js");
require("../../common/util.js");
require("../../common/http.js");
require("../../common/config.js");
require("../../common/constant.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const state = common_vendor.reactive({
      book: [],
      bookId: null,
      userId: null,
      flowId: null,
      to_type: null,
      scrollTop_tion: 0,
      showVipButton: false
    });
    state.userId = store_index.store.getters.userId;
    const initData = async () => {
      console.log("\u51FA\u73B0\u4E86");
      common_tools.showLoading("\u52A0\u8F7D\u4E2D...");
      const BookRes = await common_api.BookApi.Chapter({
        user_id: state.userId,
        book_id: state.bookId
      });
      if (common_tools.IsEmptyObject(BookRes.data))
        return;
      const BookInfo = BookRes.data;
      console.log("BookInfo", BookInfo);
      state.scrollTop_tion = BookInfo.line;
      if (BookInfo.is_user_vip === "Y" || BookInfo.is_vip === "N") {
        state.book = BookInfo.content;
        common_vendor.index.hideLoading();
        return;
      }
      state.book = BookInfo.content.splice(0, BookInfo.vip_line - 1);
      state.showVipButton = true;
      common_vendor.index.hideLoading();
    };
    common_vendor.onMounted(async () => {
      const options = await common_tools.GetCurrentRouteOptions();
      state.flowId = options.id;
      state.to_type = options.totype;
      state.bookId = options.bid || 0;
      initData();
    });
    const saveReadRecord = async () => {
      await common_api.BookApi.AddReadRecord({
        user_id: state.userId,
        book_id: state.bookId,
        line: state.scrollTop_tion
      });
    };
    const onPageScroll = (e) => {
      state.scrollTop_tion = e.detail.scrollTop;
    };
    return {
      state,
      saveReadRecord,
      onPageScroll,
      RoutePush: common_tools.RoutePush,
      initData
    };
  },
  onHide() {
    this.saveReadRecord();
  },
  onUnload() {
    this.saveReadRecord();
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(_ctx.state.book, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    b: _ctx.state.showVipButton
  }, _ctx.state.showVipButton ? {
    c: common_vendor.o(() => {
      _ctx.RoutePush(`/pages/recharge/recharge?type=1&bid=${_ctx.state.bookId}`);
    })
  } : {}, {
    d: common_vendor.o((...args) => _ctx.onPageScroll && _ctx.onPageScroll(...args)),
    e: _ctx.state.scrollTop_tion
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-95d93a74"], ["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/read/read.vue"]]);
ks.createPage(MiniProgramPage);
