<template>
    <div>
        <!-- 1.0 购物车列表 -->
        <div v-for="(item,index) in shopCartList" class="shopCartListStyle">
            <div class="mySwitch">
                <mt-switch @change="change" v-model="switchValues[index]"></mt-switch>
            </div>
            <div class="thumbImageStyle">
                <img width="75px" height="75px" :src="item.thumb_path">
            </div>
            <div class="shopContent">
                <h4>{{item.title}}</h4>
                <p><span>{{item.sell_price}}</span>&nbsp;&nbsp;商品数量:{{item.goodsCount}}</p>
            </div>
            <div class="deleteStyle">
                <mt-button @click="deleteGoods(item.id)" type="danger" size="small">删除</mt-button>
            </div>
        </div>
        <!-- 2.0 结算 -->
        <div class="jiesuan">
            <h6>总计(不含运费)</h6>
            <p>已经勾选商品&nbsp;<span>{{totalCount}}</span>&nbsp;件,总价&nbsp;<span>{{totalPrice}}</span>&nbsp;元</p>
            <mt-button class="goPayStyle" type="danger" size="normal">去结算</mt-button>
        </div>
    </div>
</template>

<style scoped>
    /**
       购物车列表
   */
    .shopCartListStyle{
        display: flex;
        margin-top: 5px;
        border-bottom: 1px solid rgba(1,1,1,0.3);
        padding: 5px;
    }

    .mySwitch{
        flex: 0 0 02px;
        margin-right: 15px;
        margin-top: 30px;
    }

    .thumbImageStyle{
        flex: 0 0 70px;
        border: 1px solid rgba(92,92,92,0.1);
        margin-right: 15px;
        padding: 3px;
        border-radius: 3px;
    }

    .shopContent{
        flex: 1;
    }

    .shopContent h4{
        color:#0094ff;
        padding: 5px 0;
    }

    .shopContent p{
        color:black;
        font-size: 16px;
        margin-top: 20px;
    }

    .shopContent span {
        color: red;
    }

    .deleteStyle{
        margin-top: 30px;
    }

    /**
        结算
    */
    .jiesuan{
        position: relative;
        margin-top: 20px;
        padding: 10px;
        background: rgba(0,0,0,0.2);
    }

    .jiesuan h6{
        font-size: 14px;
        font-weight: bold;
        color: black;
    }

    .jiesuan p{
        margin-top: 10px;
        font-size: 16px;
        color: black;
    }

    .jiesuan span{
        color: red;
    }

    .goPayStyle{
        position: absolute;
        right: 20px;
        top: 20px;
    }
</style>

<script>
    import common from '../../tools/common.js'
    //导入公共的vue对象
    import {vueObj} from '../../tools/commonVue.js'
    import {getGoods,deleteGoods} from '../../tools/shopCartHelper.js'
    //导入messageBox的一个成员
    import { MessageBox } from 'mint-ui';

    export default{
        data(){
            return {
                shopCartList:[],
                switchValues:[],
                totalPrice:0,
                totalCount:0
            };
        },
        created(){
            this.getshopCartData();
        },
        methods:{
            getshopCartData(){
                //1.获取到localStorage中的商品信息数据
                const goodsArray=getGoods();

                //2.定义一个新的对象  获取商品的id和数量
                const obj={};
                goodsArray.forEach(item=>{
                    if(obj[item.goodsId]){
                        let oldValue=obj[item.goodsId];
                        oldValue+=item.count;
                        obj[item.goodsId]=oldValue;
                    }else{
                        obj[item.goodsId]=item.count;
                    }
                });

                //3.获取到商品id的字符串
                const idArray=[];
                for(let key in obj){
                    idArray.push(key)
                }

                const idString=idArray.join(',');

                //4.发送请求数据
                const url=common.devapihost+'api/goods/getshopcarlist/'+idString;

                this.$http.get(url).then(res=>{
                    for(var i=0;i<res.body.message.length;i++){
                        var item=res.body.message[i];
                        //给数据中的每一个对象添加数量
                        item.goodsCount=obj[item.id];
                        //给图片路径添加上主机Ip前缀
                        item.thumb_path=common.imghost+item.thumb_path
                        this.switchValues[i]=true;
                    }
                     this.shopCartList=res.body.message;
                    this.statisticsCountAndPrice();
                },err=>{

                })

            },
            statisticsCountAndPrice(){
                let totalCount = 0;
                let totalPrice = 0;
                this.switchValues.forEach((item,index)=>{
                    if (item==true){ //代表开关打开了,需要统计
                        //取得index对应的在shopCartList中的对象
                        const goodsObj = this.shopCartList[index];
                        totalCount+=goodsObj.goodsCount;
                        totalPrice+=goodsObj.goodsCount * goodsObj.sell_price;
                    }
                });
                //给模型赋值,页面中的内容就会自动变化了
                this.totalCount = totalCount;
                this.totalPrice = totalPrice;
            },
            change(){
                //当每个开关状态改变的时候
                this.statisticsCountAndPrice();
            },
            deleteGoods(goodsId){
                MessageBox.confirm('确定删除此条商品吗?').then(action => {
                    if(action=='confirm'){
                        //1.将当前购物车页面中对应的数据删除
                        let deleteCount = 0;
                        for(var i=this.shopCartList.length-1;i>=0;i--){
                            if (goodsId == this.shopCartList[i].id){
                                deleteCount = this.shopCartList[i].goodsCount;
                                this.shopCartList.splice(i,1);

                                //删除switchsValue中的数组对应的索引的值
                                this.switchValues.splice(i,1);
                            }
                        }
                        //2.删除localStorage中的数据
                        deleteGoods(goodsId);

                        //3.重新计算我们的商品总个数与商品总价
                        this.statisticsCountAndPrice();

                        //4.0 发送通知，传值
                        vueObj.$emit('shopCount',-deleteCount);
                    }
                });
            }

        }
    }
</script>