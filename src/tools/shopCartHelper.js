const key='goods';

//保存商品信息数据
export function saveGoods(goodsObj){
    //1.读取原先的数据
   const goodsArray=JSON.parse(localStorage.getItem(key)||'[]')
    //2.将获取到的新数据添加到原先的数据
    goodsArray.push(goodsObj);
   //3.将数据保存到localStorage
    localStorage.setItem(key,JSON.stringify(goodsArray));
}

//从localStorage中获取商品信息数据
export function getGoods(){
    return JSON.parse(localStorage.getItem(key)||'[]')
}

//从localStorage中删除商品信息数据
export function deleteGoods(goodsId) {
    //1.0 先将旧的数据读取出来
    const goodsArray = JSON.parse(localStorage.getItem(key) || '[]');

    //2.0 删除，从后往前删
    for(var i=goodsArray.length-1 ; i>=0;i--){
        if(goodsId==goodsArray[i]['goodsId']){
            goodsArray.splice(i,1);
        }
    }

    //3.0 将最新的数据再存到localStorage中
    localStorage.setItem(key,JSON.stringify(goodsArray));
}