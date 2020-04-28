<template>
    <div class="content">
        <div v-show="look">
            <div style="position: relative;color: #fff">
                <img src="../../../assets/img/team.jpg" />
            </div>
            <div class="common_box totalperson">团队总人数:{{team_num}}人</div>
            <div>
                <ul class="team_list">
                    <li
                        v-for="(item,index) in msglists"
                        :key="index"
                        @click="openteam(item.id,item.name)"
                        class="common_box"
                        >
                        <div class="left">{{item.name}}:{{item.num}}人</div>
                        <div class="right">
                            <span>查看</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </li>
                </ul>
            </div>


            <div>
                <ul class="team_list">
                    <li @click="openteamTwo" class="common_box">
                        <div class="left">
                            我的附近商家:
                            {{business_num}}
                            家
                        </div>
                        <div class="right">
                            <span>查看</span>
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from "../../../assets/js/bus";

export default {
    name: "Myteam",
    data() {
        return {
            look: true,
            team_num: 1,
            msglists: [],
            business_num: 0
        };
    },
    methods: {
        getteam: function() {
            let _this = this,
                teammsg = {
                    method: "get.user.team.count"
                };
            this.$post("/api/v1/UserTeam", teammsg)
                .then(response => {
                    _this.team_num = response.data.team_num;
                    _this.msglists = response.data.items;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //推荐商家数量
        getbusiness() {
            let _this = this,
                teammsg = {
                    method: "get.user.recomment.store.count"
                };
            this.$post("/api/v1/userStore", teammsg)
                .then(res => {
                    // console.log(res)
                    this.business_num = res.data.num;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        //查看
        openteam: function(level, name) {
            this.$router.push({
                path: "/mine/teamList",
                query: { level, name }
            });
        },

        //查看2
        openteamTwo() {
            this.$router.push({ path: "/mine/nearby" });
        }
    },
    mounted() {
        var _this = this;
        Bus.$on("val", data => {
            if (data == false) {
                _this.look = true;
            }
        });
        this.getteam();
        this.getbusiness();
    },
    watch: {
        look(value) {
            if (value) Bus.$emit("title", "");
        }
    }
};
</script>

<style scoped lang="scss">
.team_list {
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;

        .right {
            font-size: 0.12rem;
        }

        .right img {
            width: 50px;
            border-radius: 50%;
        }
    }
}

.content {
    .hrDiv {
        height: 0.1rem;
    }
    .ad_list {
        text-align: left;
        li a {
            position: relative;
            padding: 0.1rem;
            margin-bottom: 0.1rem;
            background-color: #fff;
            display: flex;
            border-bottom: 1px solid #f2f2f2;
            .left_img {
                border-radius: 5px;
            }
            .right_msg {
                padding-left: 0.1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .name {
                    font-size: 0.16rem;
                    .tt {
                        font-size: 0.16rem;
                    }
                    .tt_name {
                        font-size: 0.14rem;
                        margin: 0.05rem 0;
                        color: #999999;
                    }
                }

                .time {
                    color: #999999;
                    font-size: 0.14rem;
                }
            }
        }
    }
}
.imgDiv {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    right: 10px;
}
</style>
