<template>
    <div>
            <!-- 1.0 提交评论 -->
            <div class="postCommentStyle">
                <h4 class="postCommentTitle">
                    提交评论
                </h4>
                <div class="submitTextArea">
                <textarea ref='commenttextArea' placeholder="请输入要评论的内容"  rows="3">

                </textarea>
                    <mt-button @click='postComment' type="primary" size="large">提交评论</mt-button>
                </div>
            </div>

            <!-- 2.0 评论列表 -->
            <div class="commentListStyle">
                <h4 class="commentListTitle">
                    评论列表
                </h4>
                <div  v-for='item in commentList' class="commentContent">
                    <h5>{{item.content}}</h5>
                    <p>
                    <span class="commentUser">
                      {{item.user_name}}
                    </span>
                        <span class="commentTime">
                        {{item.add_time|dateFmt('YYYY-MM-DD')}}
                    </span>
                    </p>
                </div>
                <mt-button  @click='loadMore' plain class="loadmore" type="danger" size="large">加载更多</mt-button>
            </div>
    </div>
</template>

<style scoped>
    h4{
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding: 5px 5px 10px 5px;
    }

    .submitTextArea{
        padding: 5px;
    }

    .commentListStyle{
        padding: 5px;
        margin-top: 20px;
        border-top: 1px solid rgba(92,92,92,0.3);
    }
    .commentContent{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    h5{
        font-size: 16px;
        color: black;
    }

    .commentUser,.commentTime{
        margin-top: 10px;
        color:#0094ff;
        float: left;
        width: 50%;
    }

    .commentTime{
        float: right;
    }

    .commentContent{
        height: 70px;
        overflow-y: auto;
    }

    .loadmore{
        margin-top: 15px;
    }
</style>

<script>
    import common from '../../tools/common.js';
    import {Toast} from 'mint-ui'

    export default{
        data(){
            return {
               pageIndex:1,
               commentList:[]
            };
        },
        created(){
            this.getCommentListData(this.pageIndex,true);
        },
        methods:{
            //提交评论
            postComment(){
                const commentContent=this.$refs.commenttextArea.value;
                if(!commentContent||commentContent.trim().length<=0){
                    Toast('请输入评论信息...')
                    return;
                }

                const url=common.devapihost+'api/postcomment/'+this.commentId;

                this.$http.post(url,{content:commentContent},{emulateJSON:true}).then(res=>{

                    this.$refs.commenttextArea.value='';
                    Toast(res.body.message);
                    this.pageIndex=1;
                    this.getCommentListData(this.pageIndex,true);

                },err=>{
                    console.log("提交评论信息失败......")
                })

            },
            //加载评论列表
            getCommentListData(pageIndex,isload){
                const url=common.devapihost+'api/getcomments/'+this.commentId+'?pageindex='+pageIndex;
                    this.$http.get(url).then(res=>{
                        if(isload){
                            this.commentList=res.body.message;
                        }else{
                            if(res.body.message.length <= 0){
                                Toast("没有评论数据啦...")
                                return;
                            }
                            this.commentList=this.commentList.concat(res.body.message);
                        }
                    },err=>{
                        console.log("获取评论信息数据失败....")
                    })

            },
            loadMore(){
                this.pageIndex++;
                this.getCommentListData(this.pageIndex,false);
            }
        },

        props:['commentId']
    }
</script>