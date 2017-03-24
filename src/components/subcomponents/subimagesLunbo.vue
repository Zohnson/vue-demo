<template>
    <div>
        <mt-swipe :auto="4000" class='myswipe'>
            <mt-swipe-item v-for='item in imgList'>
                <a :href="item.url">
                    <img :src="item.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<style scoped>
    .myswipe {
        height: 250px;
    }

    .myswipe img {
        height: 250px;
        width: 100%;
    }
</style>

<script>
    export default{
        props:['imgList']
    }
</script>