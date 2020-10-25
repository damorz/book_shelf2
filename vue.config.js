/* eslint-disable no-undef */
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    public: 'localhost:8081',
    disableHostCheck: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/book_shelf/' : '/'
}