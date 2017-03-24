
var htmlWebpackPlugin = require('html-webpack-plugin');

const path=require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders:[
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|ttf|gif|svg)$/,
                loader: 'url-loader?limit=4000'
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            title:'index',
            filename:'index.html', //在内存中生成的网页的名称
            template:'./dist/indexTemplate.html' //生成网页名称的依据
        })
    ]
}

