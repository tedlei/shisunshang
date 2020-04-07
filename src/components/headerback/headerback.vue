<template>
  <header>
    <i class="el-icon-arrow-left back" @click="routerback"></i>
    <ul class="clearfix tips">
      <li>商品</li>
      <li>
          详情
      </li>
      <li>评价</li>
    </ul>
  </header>
</template>

<script>
  import { back } from '../../assets/js/conmon';
  export default {
    name: "headerback",
    data() {
      return {

      }
    },
    methods: {
      goAnchor (details) {
        var anchor = this.$el.querySelector(details);
        document.documentElement.scrollTop = anchor.offsetTop;
      },
      routerback(){
        // console.log(1)
        // let state = this.getQueryString('state');
        // if(state==null){
        //   console.log(2)
        //   this.$router.push({path: '/'});
        // }else{
          this.$router.back(-1);
        // }
      
      },
      getQueryString(name) { 
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var l = decodeURI(window.location.search);
				var r = l.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}
    }
  }
</script>

<style scoped lang="scss">
  header {
    font-size: 0.16rem;
    display: flex;
    justify-content: center;
    padding: 0.1rem 0.15rem;
    background-color: #fff;
    position: relative;
    position: fixed;
    width: 100%;
    z-index: 9;

    i {
      font-size: 0.28rem;
      position: absolute;
      left: 0.05rem;
      top: 50%;
      z-index: 60;
      transform: translateY(-50%);
    }

    .tips li {
      padding: 0 0.15rem 0.1rem 0.15rem;
      float: left;
    }

    // .tips li.active {
    //   border-bottom: 3px solid #009900;
    // }
  }
</style>
