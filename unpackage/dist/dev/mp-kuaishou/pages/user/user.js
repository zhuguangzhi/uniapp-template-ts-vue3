"use strict";
var common_vendor = require("../../common/vendor.js");
var common_tools = require("../../common/tools.js");
var store_index = require("../../store/index.js");
var common_assets = require("../../common/assets.js");
require("../../common/util.js");
require("../../common/api.js");
require("../../common/http.js");
require("../../common/config.js");
require("../../common/constant.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const state = common_vendor.reactive({
      time: "",
      flag: 1,
      userInfo: {}
    });
    const copyService = (data) => {
      common_vendor.index.setClipboardData({
        data,
        success: () => {
          common_vendor.index.showToast({
            icon: "success",
            title: "\u590D\u5236\u6210\u529F"
          });
        }
      });
    };
    return {
      state,
      copyService,
      RoutePush: common_tools.RoutePush
    };
  },
  onShow() {
    this.state.userInfo = store_index.store.getters.userInfo;
    console.log("this.state.userInfo", this.state.userInfo);
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.state.userInfo.is_user_vip === "Y"
  }, _ctx.state.userInfo.is_user_vip === "Y" ? {} : {}, {
    b: _ctx.state.userInfo.user_image
  }, _ctx.state.userInfo.user_image ? {
    c: _ctx.state.userInfo.user_image
  } : {
    d: common_assets._imports_0
  }, {
    e: common_vendor.t(_ctx.state.userInfo.nick_name || _ctx.state.userInfo.name),
    f: _ctx.state.userInfo.is_user_vip === "Y"
  }, _ctx.state.userInfo.is_user_vip === "Y" ? {} : {}, {
    g: _ctx.state.userInfo.is_user_vip === "Y"
  }, _ctx.state.userInfo.is_user_vip === "Y" ? {
    h: common_vendor.t(_ctx.state.userInfo.end_time)
  } : {}, {
    i: _ctx.state.userInfo.is_user_vip === "Y"
  }, _ctx.state.userInfo.is_user_vip === "Y" ? {
    j: common_vendor.o(($event) => _ctx.RoutePush("/pages/recharge/recharge?type=0"))
  } : {
    k: common_vendor.o(($event) => _ctx.RoutePush("/pages/recharge/recharge?type=0"))
  }, {
    l: common_assets._imports_1,
    m: common_vendor.o(($event) => _ctx.RoutePush("/pages/recharge/PayRecord?tab=chongzhi")),
    n: common_assets._imports_2,
    o: common_vendor.o(($event) => _ctx.RoutePush("/pages/read/readList"))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/user/user.vue"]]);
ks.createPage(MiniProgramPage);
