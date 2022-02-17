// vue.config.js
module.exports = {
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title= 'Fried Egg'
            return args
        })
    },
    devServer: {
        proxy: {
          '/server-eggs': {
            target: 'http://10.2.4.69:3000/',
            changeOrigin: true,
            pathRewrite: {
              '^/server-eggs': ''
            }
          }
        }
    }
}