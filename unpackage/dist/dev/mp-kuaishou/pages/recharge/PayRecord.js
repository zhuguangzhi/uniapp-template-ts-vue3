"use strict";
var common_vendor = require("../../common/vendor.js");
var common_tools = require("../../common/tools.js");
var store_index = require("../../store/index.js");
var common_api = require("../../common/api.js");
require("../../common/util.js");
require("../../common/constant.js");
require("../../common/http.js");
require("../../common/config.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const state = common_vendor.reactive({
      tabName: "xiaofei",
      czList: [],
      czTotal: null,
      czPage: 1,
      czLoad: false,
      xfList: [],
      xfTotal: null,
      xfPage: 1,
      xfLoad: false
    });
    const userId = store_index.store.getters.userId;
    const initData = async (type) => {
      let total, page, load, list, url;
      type === "CZ" ? [total = "czTotal", list = "czList", page = "czPage", load = "czLoad", url = "RechargeRecord"] : [total = "xfTotal", list = "xfList", page = "xfPage", load = "xfLoad", url = "BuyRecord"];
      let para = {
        user_id: userId,
        page: state[page],
        rows: 12
      };
      let record = await common_api.PayApi[url](para) || null;
      if (common_tools.IsEmptyObject(record.data)) {
        state[load] = false;
        return;
      }
      if (record.extra.count < record.extra.rows)
        state[load] = false;
      state[total] = record.extra.count;
      record.data.forEach((item) => state[list].push(item));
      console.log("state[list]", state[list]);
    };
    const MoreList = (type) => {
      let total, page, load, list;
      type === "CZ" ? [total = "czTotal", list = "czList", page = "czPage", load = "czLoad", "RechargeRecord"] : [total = "xfTotal", list = "xfList", page = "xfPage", load = "xfLoad", "BuyRecord"];
      let length = state[list].length;
      if (length >= state[total]) {
        state[load] = false;
        return;
      } else {
        state[page]++;
        initData(type);
      }
    };
    common_vendor.onMounted(() => {
      const options = common_tools.GetCurrentRouteOptions();
      state.tabName = options.tab;
      initData(state.tabName === "xiaofei" ? "XF" : "CZ");
    });
    return {
      state,
      MoreList
    };
  },
  onReachBottom() {
    if (this.state.tabName === "xiaofei") {
      this.MoreList("XF");
    } else {
      this.MoreList("CZ");
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.state.czList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.number),
        b: common_vendor.t(item.create_date),
        c: common_vendor.t(item.type == "day" ? "\u5929\u5361" : item.type == "week" ? "\u5468\u5361" : item.type == "month" ? "\u6708\u5361" : item.type == "quarter" ? "\u5B63\u5361" : "\u5E74\u5361"),
        d: index
      };
    }),
    b: _ctx.state.czLoad,
    c: !_ctx.state.czLoad,
    d: _ctx.state.tabName === "chongzhi",
    e: common_vendor.f(_ctx.state.xfList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.book_title),
        b: common_vendor.t(item.chapter_name),
        c: common_vendor.t(item.create_date),
        d: common_vendor.t(item.create_time),
        e: common_vendor.t(item.pay_price),
        f: index
      };
    }),
    f: _ctx.state.xfLoad,
    g: !_ctx.state.xfLoad,
    h: _ctx.state.tabName === "xiaofei"
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d137d6c"], ["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/recharge/PayRecord.vue"]]);
ks.createPage(MiniProgramPage);
