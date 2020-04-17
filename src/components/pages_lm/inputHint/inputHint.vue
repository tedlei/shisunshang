<template>
  <div class="inhi-app" id='inputId' v-if="show">
      <div class="inhi_input">
          <van-field class="input" type="number" v-model="value" placeholder="请输入数字" />
            <div class="inhi_btn">
                <van-button style="width:40%;" @click="tapSave(false)" type="default">取消</van-button>
                <van-button style="width:40%;" @click="tapSave(true)" type="default">确认</van-button>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        tapSave(boo){
            let {value,max,min,obj} = this;
            value = parseInt(value);
            max = parseInt(max);
            min = parseInt(min);
            if(!boo){
                this.tc('用户取消')
                this.show = false;
                return;
            }else{
                if(value>max)value = max;
                if(value<min) value = min;
                obj(value);
                this.show = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.inhi-app{
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.2) ;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    z-index: 100001;
    .inhi_input{
        padding-top: 10px;
        width: 300px;
        height: 130px;
        background-color: #ffffff;
        position: relative;
        .input{
            width: 70%;
            margin: auto;
            border-bottom: 1px solid #666;
        }
        .inhi_btn{
            width:100%;
            padding: 5%;
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: 3px;
        }
    }
}
</style>