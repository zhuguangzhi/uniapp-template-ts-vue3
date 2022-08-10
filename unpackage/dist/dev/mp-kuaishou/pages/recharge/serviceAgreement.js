"use strict";
var common_vendor = require("../../common/vendor.js");
var common_api = require("../../common/api.js");
require("../../common/http.js");
require("../../common/config.js");
require("../../store/index.js");
require("../../common/tools.js");
require("../../common/util.js");
require("../../common/constant.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "serviceAgreement",
  setup(__props) {
    let list = common_vendor.ref(null);
    const getData = async () => {
      list.value = await common_api.PayApi.Agreement();
    };
    common_vendor.onMounted(getData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(list))
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-438e06d8"], ["__file", "D:/YaoChi/Code/\u65B0\u5FEB\u624B\u5C0F\u7A0B\u5E8F/\u5C0F\u7A0B\u5E8F/QingDian/pages/recharge/serviceAgreement.vue"]]);
ks.createPage(MiniProgramPage);
