# anti-fake-invest

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# todo

1.  👌 前台错误上报
2.  👌 关键结点快照存储：提交失败时答案存储
3.  👌 邮编信息移至前台
4.  👌 静态资源转移至 bootcdn

    - 文件大小记录
    - gzip 最大的 3 个源文件
    - 189kb 505kb
    - 63.9kb 136kb
    - 61.3kb 127kb

5.  👌 记录每分钟用户数
6.  👌 首屏图片分离为内容与背景，减少答题页背景图
7.  👌 增加调试组件，增加 vConsole
8.  👌 记录页面渲染完毕时间，用户手机类型，微信版本号，网络信息
9.  👌 非微信浏览器处理
10. 👌 每 10 分钟渲染首屏，保留测试页面，存储首屏图及渲染时间
11. 🚩 增加运维观测屏
12. 👌 使用 webp 减少图片大小
13. 👌 backend 应用服务器快速复制与部署
14. 👌 MySQL 数据库读写分离
15. 🚩 数据库压力测试
16. 👌 域名从云虚拟主机迁移至 ECS

17. 👌 抽奖流程
    前台 90%用户不中奖直接置为不中奖,减少后端运算压力。剩下 10%进入按抽奖流程抽奖；

18. 👌 数据提交流程
    前台报错时上传用户快照；

19. 👌 用户中奖信息填写前后台交互;
20. 👌 webp 自动转换，目前资源大小 193kb

21. 👌 题库更新后，更新后台初始化表单(题目列表，答案列表)

# 硬件配置

1.  👌 主服务器扩带宽，从服务器走内网，开一台远程连接方便管理
2.  👌 CDN 只计算 gzip 后大小

# 解决问题

1.  👌 移动端 300ms 延迟不再使用 fastclick.js,

```css
body {
  touch-action: manipulation;
}
```

# 资源消耗

截止至 20180812,安卓(70%以上用户)，webp 加载

1.  10 道图片题共 102KB，平均每个用户抽 2.4 题，约 24KB。
2.  主页+答题页+未中奖页（99%的人）图片 54.4KB。
3.  主页+答题页+中奖页（1%的人）图片 54.9KB。
4.  主页+答题页+未中奖页（99%的人）CSS 及 JS 资源 77KB。
5.  中奖用户增加 18kb JS 资源。

未中奖：165KB，中奖 183KB
