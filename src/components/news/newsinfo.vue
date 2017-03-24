<template>
    <div>
        <!-- 1.0 标题 -->
        <div class="title">
            <h4 class="mainTitle">
                {{newsInfo.title}}
            </h4>
            <span class="subTitle">
                {{newsInfo.add_time | dateFmt('YYYY-MM-DD')}}&nbsp;{{newsInfo.click}}次浏览
                &nbsp;分类：民生经济
            </span>
        </div>

        <!-- 2.0 内容-->
        <div v-html="newsInfo.content" class="content"></div>

        <!--3.0显示评论子组件-->
        <subcomment :commentId='this.$route.params.newsId'></subcomment>
    </div>
</template>

<style scoped>
    .title {
        padding: 5px;
        border-bottom: 2px solid rgba(92, 92, 92, 0.2);
    }

    .mainTitle {
        color: #0094ff;
    }

    .subTitle {
        margin-top: 10px;
        color: #777777;
        font-size: 14px;
    }

    .content {
        padding: 5px;
    }
</style>

<script>

    import common from '../../tools/common.js'

    //导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue';

    export default{
        data(){
            return {
                newsInfo: {}
            };
        },
        created(){
            this.getnewsinfo();
        },
        methods: {
            getnewsinfo(){
//              console.log(1111);
                const newsId = this.$route.params.newsId;
                const url = common.devapihost + 'api/getnew/' + newsId
                this.$http.get(url).then(res => {
                    this.newsInfo = res.body.message[0];
                }, err => {
                    console.log('请求新闻详情数据失败....')
                })
            }
        },
        components: {
            subcomment//注册评论子组件
        }
    }
</script>