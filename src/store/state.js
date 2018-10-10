const state = {
  isLoading: false,
  userInfo: {},
  sport: {
    id: 1,
    isLogin: true,
    name: '党支部先进评选',
    loadWXInfo: true
  },
  cdnUrl:
    process.env.NODE_ENV !== 'production'
      ? '//localhost:90/api/'
      : '//api.cbpc.ltd/',
  sportUrl: '//www.cbpc.ltd/public/topic/201810/',
  _KEY: {
    weixin: 'wx_userinfo' //微信身份信息
  }
};

export default state;
