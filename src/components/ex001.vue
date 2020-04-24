<template>
    <div v-if="classlist.length>1">
        <div></div>
        <van-tabs v-model="active" @click="onClick">
            <van-tab :title="item.cate_name" :name='item.id' v-for="item of classlist" :key="item.id">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <div class="goodsDiv" v-for="(item,index) of goodslist" :key='index'>
                        <div>
                            {{item.id}}
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
        
    </div>
</template>

<script>
export default {
    components:{},
    props:{},
    data(){
      return {
            classlist: [
                {id: 0, cate_name:'全部'}
            ],
            classId: 0,
            page: 0,
            active: 0,
            goodslist: [],
            loading: false,
            finished: false,
      }
    },
    watch:{},
    computed:{},
    methods:{
        //获取分类
        getclass(){
            let parms = {
                method: 'get.goods.category.list',
            };
            this.$post('/api/v1/goodsCategory', parms)
                .then((res) => {
                    // console.log(res)
                    for(let item of res.data){
                        this.classlist.push(item)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
        },
        //分类点击
        onClick(name, title){
            console.log(name)
            this.classId = name;
            this.page= 0;
            this.goodslist = [];
            // 清空列表数据
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        
        //获取数据
        onLoad(  ) {
            console.log(111111111)
            let parms = {
                method: 'get.goods.map.list',
                map: 'vip',
                page: this.page,
                page_size: 10,
                cate_id: this.classId==0?'':this.classId
            };
            // console.log(parms);
            this.$post('/api/v1/goods', parms)
                .then((res) => {
                    if(res.data){
                         this.page += res.data.length;
                        // console.log(this.page);
                        this.goodslist = [...this.goodslist, ...res.data];
                        // 加载状态结束
                        this.loading = false;
                        // 数据全部加载完成
                        if (res.data.length< 10) {
                            this.finished = true;
                        }
                    }else{
                        // console.log('我是null')
                        this.finished = true;
                    }
                    // console.log(res)
                   
                }).catch(function (error) {
                    console.log(error);
            })

        },
    },
    created(){
       this.getclass();
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
    .goodsDiv{
        display: inline-block;
        height: 300px;
        width: 50%;
        padding: 0.2rem;
        line-height: 300px;
        color: #fff;
        >div{
            border: 2px solid red;;
            background-color: #121452;
        }
    }
</style>