<template>
    <div>
        <subcomment :commentId='this.$route.params.goodsId'></subcomment>
    </div>
</template>

<style scoped>
</style>

<script>
    //导入子组件
    import subcomment from '../subcomponents/subcomment.vue'

    export default{
        components:{
            subcomment
        }
    }
</script>