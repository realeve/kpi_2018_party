<template>
  <div class="home">
    <div class="container">
      <h3>{{sport.name}}</h3>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell v-for="({dept,name},idx) of users" :key="idx" :title="`${idx+1}.${name}(${dept})`" @click="radio = idx">
            <van-radio :name="idx" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div class="action" v-show="radio>-1">
        <van-button type="primary" @click="submit">提交</van-button>
        <van-button @click="radio=-1">重置</van-button>
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
import { Cell,CellGroup,Button,RadioGroup,Radio,Toast } from 'vant';
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/cell.css';
import 'vant/lib/vant-css/radio.css';
import 'vant/lib/vant-css/button.css';
import 'vant/lib/vant-css/toast.css';
import * as db from '@/util/db';

export default {
  name: 'home',
  components:{FooterComponent,VanButton:Button,VanCellGroup:CellGroup,VanCell:Cell,VanRadio:Radio,VanRadioGroup:RadioGroup},
  data(){
    return{
      teamList,
      radio:-1,
      teamId:-1
    }
  },
  computed: {
    ...mapState(["userInfo", "sport"]),
    users(){
      return this.teamId>-1?this.teamList[this.teamId].users:[];
    },
    curUser(){
      let empty = {
        dept:'',
        name:''
      };
      if(this.users.length===0 || this.radio===-1){
        return empty
      }
      return this.users[this.radio]||empty;
    },
    curTeamName(){
      return this.teamId>-1?this.teamList[this.teamId].name:'';
    }
  },
  methods: {
    ...mapMutations(["setStore"]),
    loadAnswerStatus:async function(){
      let rec_month  = dayjs().format('YYYY-MM'); 
      let {openid} = this.userInfo;
      
      if('undefined' === typeof openid){
        return;
      }
      let {id:sid} = this.sport;
      let {data:[{team_name}]} = await db.getCbpcPrintPartyKpiVoted({
        rec_month, sid, openid
      })
      if(team_name){
        let teamId = teamList.findIndex(({name})=>name===team_name);
        this.$router.push('/result/'+teamId);
      }
    },
    submit:async function(){
      let rec_month  = dayjs().format('YYYY-MM'); 

      let {openid,nickname,headimgurl} = this.userInfo
      let params={
        username:this.curUser.name,
        dept:this.curUser.dept,
        team_name:this.curTeamName,
        sid:this.sport.id,
        rec_month,
        openid,
        nickname,
        headimgurl,
        rec_time:dayjs().format('YYYY-MM-DD HH:mm:SS')
      }
      let {data:[{affected_rows}]}=await db.addCbpcPrintPartyKpi(params);
      if(affected_rows<1){
        Toast.fail('提交失败');
      }else{
        this.$router.push('/result/'+this.teamId);
      }
    }
  },
  beforeMount(){
    this.teamId = this.$route.params.idx;
  },
  mounted(){
    this.loadAnswerStatus()
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
