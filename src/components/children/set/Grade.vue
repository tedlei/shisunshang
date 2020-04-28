<template>
    <div class="content">
        <van-cell-group>
            <van-field label="我的等级：" :value="user.level_name" readonly input-align="right"/>
            <van-field v-if="user.level_name!='顾客'" label="到期时间：" :value="add_time" readonly input-align="right"/>
        </van-cell-group>
        <van-field
            v-if="user.level_name!='顾客'"
          v-model="sms"
          center
          clearable
          readonly
          label="自动续费："
            >
            <template #button>
                <van-switch v-model="checked" active-color="#07c160" inactive-color="#cccccc" @change="changeAdd"/>
            </template>
        </van-field>
    </div>
</template>

<script>
    export default {
    components: {},
    data () {
        return {
            user: {},
            smsTwo: '',
            sms: '',
            add_time: '',
            checked: false
        }
    },
    methods: {
        formatDateTime(inputTime) {
            let date = new Date(inputTime*1000);
            var year = date.getFullYear();
            var month = date.getMonth()+1; //月份+1   
            var day = date.getDate(); 
            var hour = date.getHours(); 
            var minutes = date.getMinutes(); 
            if(minutes<10) minutes= '0'+minutes;
            var second = date.getSeconds();
            return  year+"-"+month+"-"+day+" "+hour+":"+minutes;
           
        },
        yugi(str1, str2){
            var reg = /[^\d]+/;
            var arr1 = str1.split(reg);
            var arr2 = str2.split(reg);
            var d1 = new Date(arr1[0],arr1[1],arr1[2]);
            var d2 = new Date(arr2[0],arr2[1],arr2[2]);
            return d1 - d2;
        },
        changeAdd(value){
            // console.log(value)
            let add_data = {
                method: "set.user.vip.auto.renew",
                type: value?1:0
            };
            // console.log(add_data);
            this.$post("/api/v1/user", add_data)
                .then(res => {
                    console.log(res);
                    this.user.is_level_renew = value?1:0;
                    this.$store.commit('userinfo',JSON.stringify(this.user));
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created(){
        let user = JSON.parse(this.$store.getters.getuserinfo);
        this.user = user;
        this.checked = user.is_level_renew==0?false:true;
        if(user.level_end_time==0){
            this.add_time = '永久';
        }else{
            this.add_time = this.formatDateTime(user.level_end_time);
            // console.log(this.yugi("2019/9/10","2018/12/20"));
            
        }
    },
    computed: {
        
    },
    watch: {
        
    }
}
</script>
<style lang="scss" scoped>
    
</style>