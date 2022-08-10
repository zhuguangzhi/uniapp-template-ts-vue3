"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var common_util = require("./common/util.js");
require("./common/api.js");
require("./common/http.js");
require("./common/config.js");
require("./store/index.js");
require("./common/tools.js");
require("./common/constant.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/user.js";
  "./pages/recharge/recharge.js";
  "./pages/recharge/serviceAgreement.js";
  "./pages/recharge/PayRecord.js";
  "./pages/read/read.js";
  "./pages/read/readList.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    common_util.Login();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
