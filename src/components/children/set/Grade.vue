<template>
    <div class="content">
        <van-cell-group>
            <van-field label="我的等级：" :value="user.level_name" readonly input-align="right"/>
        </van-cell-group>
        <van-field
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
            checked: false
        }
    },
    methods: {
        changeAdd(value){
            // console.log(value)
            let add_data = {
                method: "set.user.vip.auto.renew",
                type: value?1:0
            };
            // console.log(add_data);
            this.$post("/api/v1/UserStoreCategory", add_data)
                .then(res => {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    created(){
        let user = JSON.parse(this.$store.getters.getuserinfo);
        this.user = user;
        console.log(user)
    },
    computed: {
        
    },
    watch: {
        
    }
}
</script>
<style lang="scss" scoped>
    
</style>