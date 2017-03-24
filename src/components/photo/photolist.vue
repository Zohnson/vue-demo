<template>
    <div>
        <!-- 1.0 分类列表 -->
        <div class="category">
            <ul class="categoryuiStyle" ref="categoryui">
                <li @click="getPhotoListDataByCategoryId(0)">全部</li>
                <li @click="getPhotoListDataByCategoryId(item.id)" v-for="item in categoryList">{{item.title}}</li>
            </ul>
        </div>
        <!-- 2.0 图片列表 -->
        <div class="photoListStyle">
            <ul>
                <li v-for="item in photoList">
                    <router-link :to="'/photo/info/'+item.id">
                        <img :src="item.img_url">
                        <div class="photoContent">
                            <h4>
                                {{item.title}}
                            </h4>
                            <p>
                                {{item.zhaiyao}}
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    /***
     分类的样式
 */
    .category{
        overflow-x: auto;
    }

    .categoryuiStyle{
        margin: 0;
        padding: 0 5px;
        width: 1200px;
    }

    li{
        list-style: none;
        color:#0094ff;
        display: inline;
        padding: 0 5px;
    }

    /**
        图片列表的样式
    */
    .photoListStyle img{
        height: 300px;
        width : 100%;
    }

    .photoListStyle ul{
        padding: 0;
    }

    .photoListStyle li{
        position: relative;
    }

    .photoContent{
        padding: 5px;
        background-color: rgba(0,0,0,0.1);
        position: absolute;
        bottom: -12px;
        left: 0;
        right: 0;
    }

    h4{
        font-size: 14px;
        color: #fff;
        font-weight: bold;
    }

    .photoContent p{
        font-size: 12px;
        color: #fff;
    }
</style>

<script>
    import common from '../../tools/common.js'
    export default{
        data(){
            return {
                categoryList:[],
                photoList:[]
            };
        },
        created(){
           this.getCategoryData();
           this.getPhotoListDataByCategoryId(0)
        },
        methods:{
            getCategoryData(){
                const url=common.devapihost+'api/getimgcategory'
                this.$http.get(url).then(res=>{
                    this.categoryList=res.body.message;
                    const totalwidth=(res.body.message+1)*76;
                    this.$refs.categoryui.style.width=totalwidth+'px';

                },err=>{
                    console.log('请求图片分类数据失败....');
                })
            },
            getPhotoListDataByCategoryId(categoryId){
               const url=common.devapihost+'api/getimages/'+categoryId;
               this.$http.get(url).then(res=>{
                   res.body.message.forEach(item=>{
                       item.img_url=common.imghost+item.img_url;
                   })
                   this.photoList=res.body.message;

               },err=>{
                   console.log('请求图片列表数据失败....');
               })
            }
        }

    }
</script>