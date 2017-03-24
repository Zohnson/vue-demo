<template>
    <div>
        <!--首页轮播图部分-->
        <subimagesLunbo :imgList='imgList'></subimagesLunbo>
        </mt-swipe>
        <!--九宫格导航-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <router-link to="/news/list">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻咨询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <router-link to="/goods/list">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <router-link to="/photo/list">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .mySwipe {
        height: 250px;
        width: 100%;
    }

    .mySwipe img {
        height: 100%;
        width: 100%;
    }


</style>

<script>
    import common from '../../tools/common.js';
    //导入图片轮播图的子组件
    import subimagesLunbo from '../subcomponents/subimagesLunbo.vue'

    export default{
        data(){
            return {
                imgList: []
            };
        },
        created(){
            this.getLunboData();
        },
        methods: {
            getLunboData(){
                const url = common.devapihost + 'api/getlunbo';
                this.$http.get(url).then(res => {
                    this.imgList = res.body.message;
                }, err => {
                    console.log('轮播图请求数据失败....')
                })
            }
        },
        components:{
            subimagesLunbo
        }

    }
</script>