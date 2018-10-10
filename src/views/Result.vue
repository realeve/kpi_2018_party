<template>
  <div class="home">
    <div class="container">
      <h3>{{sport.name}}投票结果</h3>
      <ul>
        <li v-for="({dept,name},idx) of users" :key="idx">
          <span>{{idx+1}}.{{name}}({{dept}})</span>
          <span>x 票</span>
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
import teamList from '@/util/teamList'; 
export default {
  name: 'home', 
  components:{FooterComponent},
  data(){
    return{
      teamList,
      teamId:-1
    }
  },
  computed: {
    ...mapState(["userInfo", "sport"]),
    users(){
      return this.teamId>-1?this.teamList[this.teamId].users:[];
    },
  },
  methods: {
    ...mapMutations(["setStore"]),
    loadDefault(){
      
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
    ul {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0;
      margin: 15px 0;
      li {
        list-style: none;
        line-height: 50px;
        font-size: 1rem;
        background: #fafafa;
        margin: 1px 0 0 0;
        padding: 0 20px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
