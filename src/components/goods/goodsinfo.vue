<template>
    <div>
        <!--1.0 轮播图子组件-->
        <subimagesLunbo :imgList='imageList'></subimagesLunbo>

        <!-- 2.0 购买信息 -->
        <div class="purchase">
            <h4>{{goodsInfo.title}}</h4>
            <p>市场价:￥<s>{{goodsInfo.market_price}}</s>
                &nbsp;&nbsp;销售价:￥<span>{{goodsInfo.sell_price}}</span></p>
            <subnumber @goodCount="getGoodsCount"></subnumber>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button @click="addToShopCart" size="small" type="danger">加入购物车</mt-button>
        </div>

        <!-- 3.0 商品参数 -->
        <div class="goodsParams">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:{{goodsInfo.stock_quantity}}</li>
                <li>上架时间:{{goodsInfo.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</li>
            </ul>
        </div>

        <!-- 4.0 图文信息和商品评论 -->
        <div class="footer">
            <mt-button @click="goPictureAndText" plain size="large" type="primary">图文介绍</mt-button>
            <mt-button @click="goComment" class="goodsCommentStyle" plain size="large" type="danger">商品评论</mt-button>
        </div>
    </div>
</template>

<style scoped>
    .subimagesilder,.purchase,.goodsParams,.footer{
        margin:10px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid rgba(92,92,92,0.1);
    }

    .purchase h4{
        color: #0094ff;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid rgba(92,92,92,0.2);
        padding-bottom: 10px;
    }

    .purchase p{
        font-size: 14px;
        color: black;
    }

    .purchase span{
        font-size: 16px;
        color: red;
    }

    .goodsParams h5{
        border-bottom: 1px solid rgba(92,92,92,0.2);
        padding-bottom: 10px;
    }

    .goodsParams li{
        list-style: none;
        font-size: 16px;
    }

    .goodsParams ul{
        padding: 0;
    }

    .goodsCommentStyle{
        margin-top: 20px;
    }
</style>

<script>

    import common from '../../tools/common.js'
    //导入轮播图子组件
    import subimagesLunbo from '../subcomponents/subimagesLunbo.vue'
    //导入商品数量子组件
    import subnumber from '../subcomponents/subnumber.vue'
    //导入公共的vue对象
    import {vueObj} from '../../tools/commonVue.js'
    //导入商品信息数据保存的方法
    import {saveGoods} from '../../tools/shopCartHelper.js'

    export default{
        data(){
            return {
                goodsInfo:{},
                imageList:[],
                goodsCount:1

            };
        },
        created(){
            this.getgoodsInfoData();
            this. getthumimages();
        },
        methods:{
            //获取商品轮播图
            getthumimages(){
              const params=this.$route.params.goodsId;
              const url=common.devapihost+'api/getthumimages/'+params;
              this.$http.get(url).then(res=>{
                  res.body.message.forEach(item=>{
                      item.img=common.imghost+item.src;
                  })
                  this.imageList=res.body.message;
              },err=>{

              })
            },
            //获取商品信息
            getgoodsInfoData(){
                const params=this.$route.params.goodsId;
                const url=common.devapihost+'api/goods/getinfo/'+params;
                this.$http.get(url).then(res=>{
                    this.goodsInfo=res.body.message[0];
                },err=>{

                })
            },
            goPictureAndText(){
                this.$router.push({name:'goodsDes',params:{goodsId:this.$route.params.goodsId}})
            },
            goComment(){
                this.$router.push({name:'goodscomment',params:{goodsId:this.$route.params.goodsId}})
            },
            getGoodsCount(count){
                this.goodsCount=count;
            },
            addToShopCart(){
                //1.改变底部通栏购物车的数量小图标
                vueObj.$emit('shopCount',this.goodsCount);

                //2.将商品信息数据保存到了localStoage
                const goodsObj={goodsId:this.$route.params.goodsId,count:this.goodsCount};
                saveGoods(goodsObj);
            }
        },
        components:{
            subimagesLunbo,
            subnumber
        }
    }
</script>