<template>
  <footer :style="{color}">
    &copy; 成都印钞有限公司 印钞管理部
  </footer>
</template>
<style lang="less" scoped>
footer {
  padding-bottom: 10px;
  font-size: 14px;
  text-align: center;
}
</style>
<script>
export default {
  props: {
    color: {
      default: "#666"
    }
  }
};
</script>
