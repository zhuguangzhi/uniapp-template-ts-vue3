"use strict";
var common_vendor = require("../../common/vendor.js");
var store_index = require("../../store/index.js");
var common_api = require("../../common/api.js");
var common_tools = require("../../common/tools.js");
var common_util = require("../../common/util.js");
require("../../common/constant.js");
require("../../common/http.js");
require("../../common/config.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const state = common_vendor.reactive({
      urltype: 0,
      bookId: "",
      list: []
    });
    const userId = store_index.store.getters.userId;
    const weaerback = async (money) => {
      let param = {
        user_id: userId,
        money: 0.01,
        fromtype: state.urltype,
        bid: state.bookId
      };
      let createPayRes = await common_api.PayApi.CreateOrder(param);
      if (common_tools.IsEmptyObject(createPayRes.data))
        return;
      ks.pay({
        serviceId: "1",
        orderInfo: {
          order_no: createPayRes.data.order_no,
          order_info_token: createPayRes.data.order_info_token
        },
        success: async (e) => {
          const userInfo = await common_util.UpdataUserInfo();
          if (common_tools.IsEmptyObject(userInfo))
            return false;
          let pages = getCurrentPages();
          pages[pages.length - 2];
          if (userInfo.is_user_vip != "Y") {
            common_tools.Message("\u5145\u503C\u5F02\u5E38");
            setTimeout(function() {
              common_vendor.index.hideLoading();
              common_vendor.index.navigateBack({
                delta: 1
              });
            }, 2e3);
            return;
          }
          common_tools.Message("\u5145\u503C\u6210\u529F");
          setTimeout(function() {
            if (state.urltype == 1) {
              const page = getCurrentPages();
              const prePage = page[page.length - 2];
              prePage.$vm.initData();
            }
            common_vendor.index.navigateBack({
              delta: 1
            });
          }, 2e3);
        }
      });
    };
    const initData = async () => {
      let data = await common_api.User.RechargeConfig({});
      state.list = data.data || [];
    };
    common_vendor.onMounted(async () => {
      initData();
      const option = await common_tools.GetCurrentRouteOptions();
      state.urltype = option.type;
      state.bookId = option.bid == "null" ? 0 : option.bid;
    });
    return {
      state,
      weaerback
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.state.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.n(`price${index}`),
        b: common_vendor.t(item.money),
        c: common_vendor.t(item.title),
        d: common_vendor.o(($event) => _ctx.weaerback(item.money)),
        e: item.is_hot == "Y"
      }, item.is_hot == "Y" ? {} : {}, {
        f: index
      });
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/recharge/recharge.vue"]]);
ks.createPage(MiniProgramPage);
