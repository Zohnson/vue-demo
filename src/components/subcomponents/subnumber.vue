<template>
    <div>
        <div>
            <div @click="substrict" class="left">-</div>
            <div class="middle">{{count}}</div>
            <div @click="add" class="right">+</div>
        </div>
    </div>
</template>

<style scoped>
    .left,.middle,.right{
        display: inline-block;
        border: 1px solid rgba(92,92,92,0.2);
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-bottom: 10px;
    }

    .middle{
        width: 40px;
    }
</style>

<script>
    export default{
        data(){
            return {
              count:1
            };
        },
        methods:{
            substrict(){
                if(this.count<=1){
                    return;
                }
                this.count--;
                this.notify();
            },
            add(){
                this.count+=1;
                this.notify();
            },
            notify(){
                 this.$emit('goodCount',this.count);
            }
        }
    }
</script>