// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,

// })

module.exports = {
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {  //匹配所有以'api'开头的请求路径  当以api开头时走代理
             target: 'http://gmall-h5-api.atguigu.cn',  //代理目标的基础路径
            //  pathRewrite:{'^/api':''},  //代理服务器向目标服务器发送请求时去掉前缀
            //  ws: true,//用于支持websocket
            //  changeOrigin: true//用于控制请求头中的host值
      }     
    }
  }
}
