<template>
  <div class="home">
    <div class="container">
      <h3>{{sport.name}}</h3>
      <van-cell-group>
        <van-switch-cell v-for="({dept,name},idx) of teamList[teamId].users" :key="idx" v-model="checked[idx]" :title="`${idx+1}.${name}(${dept})`" />
      </van-cell-group>
      <div class="action">
        <van-button type="primary">提交</van-button>
        <van-button>重置</van-button>
      </div>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import dayjs from 'dayjs';
import FooterComponent from '@/components/FooterComponent';
import teamList from '@/util/teamList';
import { SwitchCell,CellGroup,Button } from 'vant';
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/cell.css';
import 'vant/lib/vant-css/switch-cell.css';
import 'vant/lib/vant-css/switch.css';
import 'vant/lib/vant-css/button.css';

export default {
  name: 'home',
  components:{FooterComponent,VanButton:Button,VanSwitchCell:SwitchCell,VanCellGroup:CellGroup},
  data(){
    return{
      teamList,
      checked:[],
      teamId:0
    }
  },
  computed: {
    ...mapState(["userInfo", "sport"]),
    
  },
  methods: {
    ...mapMutations(["setStore"]),
    enter(key){
      console.log(key)
    }
  },
  beforeMount(){
    this.teamId = this.$route.params.idx;
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    h3 {
      text-align: center;
      font-weight: lighter;
      font-size: 1.5rem;
    }
    .van-cell {
      margin: 3px 0;
      border-bottom: 1px solid #eee;
    }
    .action {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      button {
        width: 100px;
      }
    }
  }
}
</style>
