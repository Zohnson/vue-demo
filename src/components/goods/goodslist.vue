<template>
    <div>
        <div class="mui-content" style="background-color:#fff">
            <ul class="mui-table-view mui-grid-view" >
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for='item in goodslist'>
                    <router-link :to="'/goods/info/'+item.id">
                        <div class="goodsContent">
                            <img class="mui-media-object" v-lazy="item.img_url">
                            <div class="mui-media-body">
                                <p v-text="item.title"></p>
                                <div class="price">
                                    <span>￥{{item.sell_price}}</span>
                                    <s>￥{{item.market_price}}</s>
                                </div>
                                <div class="tips">
                                    <div class="tip_left">热卖中</div>
                                    <div class="tip_right">剩{{item.stock_quantity}}件</div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    /**
       mint-ui中图片懒加载需要的样式
   */
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

    /**
        商品相关
    */
    .goodsContent{
        padding: 5px;
        border: 1px solid rgba(92,92,92,0.3);
        border-radius: 5px;
        box-shadow: 0px 0px 4px #666;
    }

    ul{
        padding-right: 0px;
    }

    .mui-table-view-cell>a:not(.mui-btn){
        white-space : inherit;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        height: 100px;
    }

    .mui-media-body p{
        color:#000;
        font-size: 12px;
        text-align: left;
        /*以下4句是实现文字显示两行，超出的在第二行用...替代关键代码*/
        /* http://www.css88.com/webkit/-webkit-line-clamp/ */
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .price{
        text-align: left;
        padding: 10px 0 10px 0;
        margin-top: 5px;
        border-bottom: 1px solid #f0f0f0;
        border-top: 1px solid #f0f0f0;
        background: #f0f0f0;
    }

    .price span{
        color: red;
    }

    .price s{
        margin-left: 10px;
        font-size: 12px;
        color: #5c5c5c;
    }

    .tips{
        font-size: 12px;
        height: 50px;
        display: flex;
    }

    .tips .tip_left{
        padding: 10px 0 10px 0;
        flex : 0 0 45px;
        background: #f0f0f0;
        color : #5c5c5c;
    }

    .tips .tip_right{
        padding: 10px 10px 10px 0;
        flex : 1;
        text-align: right;
        background: #f0f0f0;
        color : #5c5c5c;
    }
</style>

<script>
    import common from '../../tools/common.js'
    export default{
        data(){
            return {
                goodslist:[]
            };
        },
        created(){
            this.getgoodslistData();
        },
        methods:{
            getgoodslistData(){
                const url=common.devapihost+'api/getgoods?pageindex=1'
                this.$http.get(url).then(res=>{
//                    console.log(res.body.message);
                    this.goodslist=res.body.message;
                },err=>{

                    console.log("获取商品图片列表的数据失败....")
                })
            }
        }
    }
</script>