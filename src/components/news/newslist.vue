<template>
    <div>
        <!-- 新闻列表 -->
        <div class="mui-content">
            <ul class="mui-table-view">
                <li v-for="item in newsList" class="mui-table-view-cell mui-media">
                    <router-link :to="'/news/info/'+item.id">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            {{item.title}}
                            <p class='mui-ellipsis'>
                                {{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}
                                <span>
                                    点击数：{{item.click}}
                                </span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .mui-ellipsis{
        margin-top: 20px;
        font-size: 12px;
        color: #0094ff;
    }

    .mui-ellipsis > span{
        position: absolute;
        top: 50px;
        right: 20px;
    }

    .mui-table-view-cell img{
        height: 63px;
        max-width: 63px;
    }
</style>

<script>
    import common from '../../tools/common.js';
    export default{
        data(){
            return {
                newsList:[]
            };
        },
        created(){
            this.getNewsList()
        },
        methods:{
            getNewsList(){
                const url=common.devapihost+'api/getnewslist';
                this.$http.get(url).then(res=>{
                    this.newsList=res.body.message;
                },err=>{
                    connsole.log('请求新闻资讯数据失败...')
                })
            }
        }
    }
</script>