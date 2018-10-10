<template>
  <div id="app">
    <transition v-if="showApp || isAnswered" :name="transitionName">
      <router-view class="app-container" />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import qs from "qs";
import wx from "weixin-js-sdk";
import * as db from "./util/db";
import { axios } from "./util/axios";
import { Toast } from "vant";
import lib from "./util/index";

export default {
  data() {
    return {
      transitionName: "slide-left",
      code: "",
      apiId: "wx762c9153df774440",
      isAnswered: false 
    };
  },
  computed: {
    ...mapState(["sport", "_KEY"]),
    userInfo: {
      get() {
        return this.$store.state.userInfo;
      },
      set(userInfo) {
        this.setStore({ userInfo });
      }
    },
    // 签名用URL
    url() {
      return window.location.href.split("#")[0];
    },
    // 跳转URL
    redirectUrl() {
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        this.apiId
      }&redirect_uri=${encodeURIComponent(
        this.url
      )}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
    },
    shareUrl() {
      // 被分享的链接必须在安全域名中，不能直接分享为 redirectUrl
      // return window.location.href.split("#")[0].split("?")[0];
      let { origin, pathname } = window.location;
      return origin + pathname;
    }, 
    showApp() {
      return typeof this.userInfo.openid != "undefined";
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/") {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    },
    showApp(val) {
      if (val) {
        Toast.clear();
      }
    }
  },
  methods: {
    ...mapMutations(["setStore"]), 
    wxInit() {
      if (!this.needRedirect()) {
        this.getWXUserInfo();
      }
    },
    needRedirect() {
      if (window.location.href.indexOf("#/setting") > 0) {
        this.isAnswered = true;
        return false;
      }

      // 原代码在from=singleMessage等场景会失效
      let { search } = window.location;
      if (typeof search == "undefined" || search == "") {
        window.location.href = this.redirectUrl;
        return true;
      }
      let params = qs.parse(search.slice(1));
      if (typeof params.code == "undefined") {
        window.location.href = this.redirectUrl;
        return true;
      }
      this.code = params.code;
      return false;
    },
    // 获取微信用户信息（昵称，地区）
    getWXUserInfo() {
      let userInfo;
      let wx_userinfo = localStorage.getItem(this._KEY.weixin);

      // localStorage内容需更新
      if (
        null == wx_userinfo ||
        typeof wx_userinfo == "undefined" ||
        typeof wx_userinfo.token == "undefined" ||
        typeof wx_userinfo.timeStamp == "undefined"
      ) {
        this.getWXInfo();
        return;
      }

      // 时长校验
      let timeStamp = lib.getTimestamp();
      let needRefresh = timestamp - wx_userinfo.timeStamp > 1800;
      if (needRefresh) {
        this.getWXInfo();
        return;
      }

      userInfo = JSON.parse(wx_userinfo);
      this.userInfo = userInfo;
    },
    getWXInfo() {
      axios({
        params: {
          s: "/weixin/user_info",
          code: this.code
        }
      }).then(data => {
        this.userInfo = data;
        /*
          20180831:
          Reflect,includes慎用，低版本手机转码报错
        */
        // if (Reflect.get(data, "nickname")) {
        if (typeof data.nickname != "undefined") {
          localStorage.setItem(this._KEY.weixin, JSON.stringify(data));
        }
      });
    },
    wxPermissionInit() {
      axios({
        params: {
          s: "/weixin/signature",
          url: this.url
        }
      }).then(data => {
        this.wxReady(data);
        this.initWxShare(); 
      });
    },
    wxReady(obj) {
      let config = {
        debug: false,
        appId: obj.appId,
        timestamp: obj.timestamp,
        nonceStr: obj.nonceStr,
        signature: obj.signature,
        jsApiList: [
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          // "onMenuShareQQ",
          // "onMenuShareWeibo",
          // "onMenuShareQZone",
          "hideMenuItems"
          // "getNetworkType"
        ]
      };
      wx.config(config);
    },
    initWxShare() {
      wx.ready(() => {
        let option = {
          title: this.sport.name,
          desc: this.sport.name,
          link: this.shareUrl,
          imgUrl: "https://www.cbpc.ltd/public/cdn/cbc.jpg",
          type: "",
          dataUrl: "",
          success: function() {},
          cancel: function() {}
        };
        wx.onMenuShareAppMessage(option);
        wx.onMenuShareTimeline(option);
        // wx.onMenuShareQQ(option);
        // wx.onMenuShareWeibo(option);
        // wx.onMenuShareQZone(option);

        // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        wx.hideMenuItems({
          menuList: [
            "menuItem:editTag",
            "menuItem:delete",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:readMode",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email"
          ]
        });
      });
    }, 
    simulateUserInfo() {
      setTimeout(() => {
        this.userInfo = {
          openid: "oW0w1v4qftC8xUP3q-MPIHtXB7hI",
          nickname: "宾不厌诈",
          sex: 1,
          language: "zh_CN",
          city: "成都",
          province: "四川",
          country: "中国",
          headimgurl:
            "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKDfy7icjzBBUzP90JZ5E8FIkE9dDOxgdQ7Qb9wHv8Bp3D9O4V7fzGleVvB1bJSKz4TqqDnBmuzFTw/132",
          privilege: [],
          timestamp: 1535994566,
          ip: "172.31.85.39",
          token: "6487423c151badc681e7793bbd335e9d99dcec18"
        };
        localStorage.setItem(this._KEY.weixin, JSON.stringify(this.userInfo));
      }, 3000);
    } 
  },
  created: async function() {
    if (window.location.href.indexOf("#/setting") > 0) {
      this.isAnswered = true;
      return false;
    }
    this.wxPermissionInit();
    
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: "spinner",
      message: "载入个人信息"
    });

    // 开发模式下，初始化值
    if (process.env.NODE_ENV == "development") {
      // 模拟登录
      this.simulateUserInfo();
      return;
    }

    // 正式环境微信载入
    this.wxInit();
  }
};
</script>

<style  lang="less">
@import './assets/animate.less';

body {
  background-color: #f2f2f2;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation; //移动端 300ms延迟
}

.app-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

@slide-distance: 100%;

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(@slide-distance);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translateX(@slide-distance);
}

.van-radio,
.van-checkbox {
  padding: 6px 0;
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.van-checkbox__label {
  margin-left: 0px !important;
}
</style>
