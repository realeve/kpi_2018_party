<template>
  <div class="home">
    <div class="container">
      <h3>{{sport.name}} <small>{{curMonth}}</small></h3>
      <ul>
        <li v-for="({key,name},idx) of teamList" :key="key" @click="enter(idx)">
          {{idx+1}}.{{name}}
        </li>
      </ul>
    </div>
    <footer-component />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import dayjs from 'dayjs';
import FooterComponent from '@/components/FooterComponent';
import teamList from '@/util/teamList'
import * as db from '@/util/db';
export default {
  name: 'home',
  components:{FooterComponent},
  data(){
    return{
      teamList
    }
  },
  computed: {
    ...mapState(["userInfo", "sport"]),
    curMonth(){
      return dayjs().format('YYYY-MM');
    }
  },
  methods: {
    ...mapMutations(["setStore"]),
    enter(key){
      this.$router.push(`/users/${key}`);
    } ,
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
    ul {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0;
      margin: 20px 0;
      li {
        list-style: none;
        line-height: 60px;
        font-size: 1rem;
        background: #ececec;
        margin: 1px 0 0 0;
        padding: 0 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
