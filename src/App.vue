<template>
    <div class='tmpl'>
        <!--页面顶部通栏-->
        <mt-header fixed title="vue-demo"></mt-header>
        <div class='back' v-if='isShow'>
            <a @click="goback" >
                &lt;&lt;
            </a>
        </div>
        <!--页面中间内容部分-->
        <router-view></router-view>
        <!--页面底部通栏-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-email"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcart">
                <span class="mui-icon mui-icon-contact">
                     <span id="badgeId" class="mui-badge">{{totalCount}}</span>
                </span>

                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/settings">
                <span class="mui-icon mui-icon-gear"></span>
                <span class="mui-tab-label">设置</span>
            </router-link>
        </nav>
    </div>
</template>

<style scoped>
    .back{
         position:fixed;
         top:10px;
         left:10px;
         z-index: 1;
    }
    .back a{
         font-size:22px;
         color:#fff;
         /*font-weight:bold;*/
    }
</style>

<script>
    //导入公共的vue对象
    import {vueObj} from './tools/commonVue.js'

    import {getGoods} from './tools/shopCartHelper.js';

    vueObj.$on('shopCount',function(count){
        var badgeId=document.getElementById('badgeId');
        var oldCount=badgeId.innerText-0;
        oldCount+=count;
        badgeId.innerText=oldCount;
    })

    export default{
        data(){
            return {
                isShow:false,
                totalCount:0
            };
        },
        watch:{
            $route:function(newValue,oldValue){
                if(newValue.path.toLowerCase()=='/home'||
                    newValue.path.toLowerCase()=='/member' ||
                    newValue.path.toLowerCase()=='/shopcart' ||
                    newValue.path.toLowerCase()=='/settings'){
                    this.isShow=false;
                }else{
                    this.isShow=true;
                }
            }
        },
        created(){
          window.addEventListener('load',this.windOnload),
              this.getTotalCount()
        },
        methods:{
            goback(){
                this.$router.go(-1);
            },
            windOnload(){
                if(this.$route.path.toLocaleLowerCase()=='/home'||
                    this.$route.path.toLocaleLowerCase()=='/member'||
                    this.$route.path.toLocaleLowerCase()=='/shopcart'||
                    this.$route.path.toLocaleLowerCase()=='/settings'
                ){
                    this.isShow=false;
                }else{
                    this.isShow=true;
                }
            },
            getTotalCount(){
                var goodsArray = getGoods();
                let totalCount = 0;
                for(var i=0;i<goodsArray.length;i++){
                    const goodsObj = goodsArray[i];
                    totalCount += goodsObj.count;
                }
                this.totalCount = totalCount;
            }
        }
    }
</script>