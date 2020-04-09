<template>
    <div class="main_box main_height">
        <header ref="header_h">
            <div @click="opensearch" style="width: 100%;margin:0 0.1rem">
                <search :dmsg="msg"></search>
            </div>
        </header>

        <div class="main_div">
            <ul class="left">
                <li
                    class="left_li"
                    v-for="(item,index) in leftlists"
                    :key="index"
                    :class="num==index?'active':''"
                    @click="getNum(index,item.children)"
                >
                    <span>{{item.text}}</span>

                    <ul v-show="isUlliTwo" class="left_ul">
                        <li
                            v-show="listNum===index"
                            class="left_ul_li"
                            v-for="(item1,index1) in navChildren"
                            :key="index1"
                            @click="isUlliTwoAdd(item1.id)"
                        >{{item1.cate_name}}</li>
                    </ul>
                </li>
            </ul>


            <ul class="right">
                <li class="right_li" v-for="(item,index) in cpylist" :key="index">
                    <router-link
                        class="right_route"
                        :to="{path:'/business/storemsg',query:{id: item.id}}"
                    >
                        <div class="imgDiv">
                            <van-image
                                width="0.78rem"
                                height="0.78rem"
                                fit="cover"
                                :src="item.imgurl"
                            />
                        </div>
                        <div class="right_msg">
                            <p class="p1">
                                <span class="p1_span">{{item.name}}</span>
                                <span v-show="item.label == 1" class="quality">品质商家</span>
                            </p>
                            <div style="margin: 0.02rem 0;" class="address">
                                <span>地址：</span>
                                <span class="fontWrap fontWrapTwo">{{item.address}}</span>
                            </div>
                            <div class="address">
                                <span>电话：</span>
                                <span>{{item.mobile}}</span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

        <router-link to="/mine/nearby">
            <div class="iconDiv">
                <img src="../../assets/img/fjsj.png" alt />
                <div>商家入驻</div>
            </div>
        </router-link>
    </div>
</template>

<script>
import Header from "../header/header";
import Search from "../search/search";
import clientWw from "../../assets/js/conmon";
import Bus from "../../assets/js/bus";
export default {
    name: "business",
    components: { Search, Header },
    data() {
        return {
            msg: "附近商家",
            height: "1rem",
            num: 0,
            isUlliTwo: true,
            isUlliTwoHeight: 1,
            navChildren: [],
            leftlists: [],
            cpylist: [],

            listNum: 0
        };
    },
    methods: {
        //搜索
        opensearch: function() {
            Bus.$emit("searchval", true);
        },
        getNum(index, children) {
            this.listNum = index;
            this.num = index;
            this.navChildren = children;
            this.isUlliTwoHeight = index;
            this.isUlliTwo = true;
            if (index == 0) {
                this.getDataTwo();
            }
        },
        navPush(list) {
            for (var i in list) {
                this.leftlists.push({
                    id: list[i].id,
                    text: list[i].cate_name,
                    children: list[i].sub
                });
            }
            this.leftlists.unshift({
                id: 0,
                text: "全部",
                children: []
            });
        },
        getData() {
            let ad_data = {
                method: "get.user.strre.category.list"
            };
            this.$post("/api/v1/UserStoreCategory", ad_data)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.navPush(res.data);
                        this.getDataTwo();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getDataTwo(id) {
            let ad_data = {};
            if (id) {
                // console.log("有Id")
                ad_data = {
                    method: "get.user.store.list",
                    cate_id: id,
                    page: 0,
                    page_size: 20
                };
            } else {
                ad_data = {
                    method: "get.user.store.list",
                    cate_id: 0,
                    page: 0,
                    page_size: 20
                };
            }
            this.$post("/api/v1/userStore", ad_data)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.cpylist = res.data;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        isUlliTwoAdd(id) {
            this.isUlliTwo = false;
            this.getDataTwo(id);
        }
    },
    created() {
        this.getData();
    },
    mounted() {
        let clientW = clientWw.clientWw();
        let h =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight; //浏览器高度
        let topH = this.$refs.header_h.offsetHeight;
        this.height = (h - topH - (70 * clientW) / 100) / clientW + "rem";
    }
};
</script>

<style lang="scss" scoped>
.main_height {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;
    header {
        display: flex;
        align-items: center;
        padding: 0.1rem 0;
        border-bottom: 1px solid #f2f2f2;
    }
    .main_div {
        width: 100%;
        height: 100%;
        background-color: rgb(242, 242, 242);
        display: flex;
        .left {
            width: 1rem;
            height: 100%;
            background-color: #fff;
            .left_li {
                height: 0.51rem;
                border-bottom: 1px solid #f2f2f2;
                text-align: center;
                line-height: 0.51rem;
                position: relative;
                .left_ul {
                    width: 1rem;
                    border-left: 1px solid #f2f2f2;
                    background-color: #fff;
                    position: absolute;
                    top: 0;
                    right: -1rem;
                    z-index: 10001;
                    .left_ul_li {
                        border-bottom: 1px solid #f2f2f2;
                        color: #000;
                    }
                }
            }
            .active {
                color: #090;
                background-color: #f2f2f2;
                border-left: 3px solid #090 !important;
            }
        }
        .right {
            height: 100%;
            flex: 1;
            overflow-y: auto;
            .right_li {
                background-color: #fff;
                padding: 0.05rem;
                margin-bottom: 0.05rem;
                text-align: left;
                .right_route {
                    display: flex;
                    align-items: center;
                    .right_msg {
                        margin-left: 0.05rem;
                        width: 100%;
                        .p1 {
                            color: #000 !important;
                            font-size: 0.14rem;
                            display: flex;
                            .quality {
                                display: inline-block;
                                line-height: 0.18rem;
                                background-color: #009900;
                                border-radius: 0.18rem;
                                padding: 0 5px;
                                color: #fff;
                                font-size: 0.12rem;
                            }
                            .p1_span {
                                flex: 1;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }

                        .address {
                            display: flex;
                            align-items: center;
                            color: #999;
                            font-size: 0.12rem;
                        }

                        .long {
                            text-align: right;
                            color: #009900;
                            font-size: 0.12rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
