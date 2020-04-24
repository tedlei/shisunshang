<template>
    <div class="list-app">
        <div class="team_dtl">
            <div class="table">
                <p>头像</p>
                <p>用户</p>
                <p>注册时间</p>
                <p>推荐人</p>
            </div>

            <van-list
                v-model="loading"
                :finished="finished"
                offset="50"
                finished-text="没有更多了"
                @load="openteam"
                class="list_main"
                >
                <div class="list_h" v-for="(item,index) in team_dtllists" :key="index">
                    <div class="headImg list_div">
                        <img :src="item.portrait" v-if="item.portrait!=null" />
                        <img :src="require(`../../../assets/img/news_head.png`)" v-else />
                    </div>

                    <div class="list_name list_div" style="min-width:1rem">
                        <div>{{item.name}}</div>
                        <div>{{item.phone}}</div>
                    </div>

                    <div class="list_div">{{item.add_time}}</div>
                    <div class="list_div">
                        {{item.referee_name == null ? '-':item.referee_name.substr(0,1)+'XX'}}
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
import Bus from "../../../assets/js/bus";
export default {
    data() {
        return {
            team_dtllists: [],
            loading: false,
            finished: false,
            page: 0
        };
    },
    created() {
        // this.openteam();
    },
    methods: {
        openteam: function() {
            let { level, name } = this.$route.query;
            let { team_dtllists, page } = this;
            Bus.$emit("title", "我的" + name);
            let teammsg = {
                method: "get.user.team.list",
                level,
                page: this.page,
                page_size: 10
            };
            this.$post("/api/v1/UserTeam", teammsg)
                .then(response => {
                    this.loading = false;
                    let items = response.data.items;
                    if (items.length > 0) {
                        console.log(items.length)
                        this.page += items.length;
                        console.log(this.page)
                        this.team_dtllists = team_dtllists.concat(items);
                    }
                    if (items.length < 10) {
                        this.finished = true;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    destroyed() {
        Bus.$emit("title", "");
    }
};
</script>

<style lang="scss" scoped>
.list-app {
    padding-top: 0.48rem;
    .team_dtl {
        padding-bottom: 0.3rem;
        .table {
            width: 100%;
            padding: 15px;
            background-color: #090;
            display: flex;
            justify-content: space-between;
            p {
                width: 30%;
                color: #fff;
            }
            p:nth-child(1),
            p:nth-child(4) {
                width: 20%;
            }
        }
        .list_main {
            .list_h {
                width: 100%;
                padding: 15px;
                border-top: 1px solid #aaa;
                background-color: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .list_div {
                    width: 30%;
                }
                .list_div:nth-child(1),
                .list_div:nth-child(4) {
                    width: 20%;
                }
                .list_name > div:nth-child(1) {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .headImg > img {
                    width: 0.35rem;
                    height: 0.35rem;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>