// var Vue=required('vue');

//导入vue包（使用的是es6新语法）
import Vue from 'vue';
//导入vue-router路由包
import VueRouter from 'vue-router';
//导入vue-resource包
import VueResource from 'vue-resource';
//导入预览图片的第三方包
import VuePreview from 'vue-preview';


//导入项目的入口组件
import App from './App.vue'

//导入mint-ui相关的插件
import Mint from 'mint-ui'
//导入mint-ui相关的样式
import 'mint-ui/lib/style.css';
//导入Mint-UI框架的懒加载
import { Lazyload } from 'mint-ui';
//导入自己设置的样式
import '../static/css/site.css'

//导入MUI相关的插件
import '../static/mui/css/mui.min.css';
import '../static/mui/css/icons-extra.css'


//使用懒加载
Vue.use(Lazyload);


//导入和使用全局的时间过滤器
import moment from 'moment';
Vue.filter('dateFmt',(input,dateFmtString)=>{
    dateFmtString=dateFmtString||'YYYY-MM-DD HH:mm:ss';
    return moment(input).format(dateFmtString);
})

//使用集成图片的第三方包
Vue.use(VuePreview);

//使用mint-ui
Vue.use(Mint);

//使用vue-Resource
Vue.use(VueResource)

//使用路由
Vue.use(VueRouter)




//导入组件
import home from './components/home/home.vue'
import member from './components/member/member.vue'
import shopcart from './components/shopcart/shopcart.vue'
import settings from './components/settings/settings.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsDes from './components/goods/goodsDes.vue'
import goodscomment from './components/goods/goodscomment.vue'

//创建并且配置好路由
const vueRouter=new VueRouter({
    routes:[
        {name:'/',path:'/',redirect:'home'},
        {name:'home',path:'/home',component:home},
        {name:'member',path:'/member',component:member},
        {name:'shopcart',path:'/shopcart',component:shopcart},
        {name:'settings',path:'/settings',component:settings},
        {name:'newslist',path:'/news/list',component:newslist},
        {name:'newsinfo',path:'/news/info/:newsId',component:newsinfo},
        {name:'photolist',path:'/photo/list',component:photolist},
        {name:'photoinfo',path:'/photo/info/:photoId',component:photoinfo},
        {name:'goodslist',path:'/goods/list',component:goodslist},
        {name:'goodsinfo',path:'/goods/info/:goodsId',component:goodsinfo},
        {name:'goodsDes',path:'/goods/des/:goodsId',component:goodsDes},
        {name:'goodscomment',path:'/goods/comment/:goodsId',component:goodscomment},
    ],
    linkActiveClass:'mui-active'
})



//创建Vue对象
new Vue({
    router:vueRouter,
    //渲染哪一个组件作为项目的入口组件
    render:c=>c(App)
}).$mount('#app')

