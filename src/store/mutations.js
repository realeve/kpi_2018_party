// 使用typeof，则 null、对象、数组返回的都是object
let getType = o =>
    Object.prototype.toString
    .call(o)
    .match(/\w+/g)[1]
    .toLowerCase();

let mutations = {
    /* 20180719:借鉴自react umi.js,对 setMutations的二次封装，对提交的payload数据分解同时替换，可大量减少模板代码。

      假设 有 store = {
        addInfo:{
          zipcode:'',
          county_id:''
        }
      }

      仅对zipcode更新时可这样写
      this.setStore({
        addInfo: {
          zipcode: 123
        }
      });
      
      同时更新时可以：      
      this.setStore({
        addInfo: {
          zipcode: 123，
          county_id:234
        }
      });
      */
    setStore(state, payload) {
        Object.keys(payload).forEach(key => {
            let val = payload[key];
            // console.log(key, val);
            if (getType(val) == 'object') {
                state[key] = Object.assign({}, state[key], val);
            } else {
                // bug fixed
                state[key] = val;
            }
        })
    }
}

export default mutations