
const path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry:"./src/main.js",
    output:{
        path:undefined,//开发模式不需要输出
        filename:"static/js/main.js",
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[ //执行顺序只从右往左的 先执行的css-loader
                    "style-loader",//将Js中css通过创建style标签添加html文件中生效
                    "css-loader" //将css资源编译成commonjs的模块到Js中
                ]
            },
            {
                test:/\.less$/,
                use:[ //执行顺序只从右往左的 先执行的css-loader
                    "style-loader",//将Js中css通过创建style标签添加html文件中生效
                    "css-loader", //将css资源编译成commonjs的模块到Js中
                    "less-loader"
                ]
            },
            {
                test:/\.(png|jpe?g|gif|webp)$/,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        //小于10kb的转base64
                        //优点:减少请求数量 缺点:体积更大
                        maxSize:10*1024
                    }
                } ,
                generator: {
                    //输出的图片名字
                    filename: 'static/images/[name][hash:10][ext][query]'
                  }
            },
            {
                test:/\.(ttf|woff2?|mp3|mp4|avi)$/,
                type:"asset/resource",
                parser:{
                    dataUrlCondition:{
                        //小于10kb的转base64
                        //优点:减少请求数量 缺点:体积更大
                        maxSize:10*1024
                    }
                } ,
                generator: {
                    //输出的图片名字
                    filename: 'static/media/[hash:10][ext][query]'
                  }
            }
        ]
    },
    plugins:[
        new ESLintPlugin({
        context:path.resolve(__dirname,"../src")
       }),
       new HtmlWebpackPlugin({
        //模板:public/index.html文件创建新的html文件 dom结构和原来一致  会自动引入打包的资源
        template:path.resolve(__dirname,'../public/index.html')
       })
],
    devServer:{ //开发服务器 不会输出资源  在内存中编译打包的
        host:"localhost",
        port:'3000',
        open:true,
    },
    mode:"development"
}
