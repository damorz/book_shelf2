module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    public: 'localhost:8081',
    disableHostCheck: true,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.CI_PROJECT_NAME + '/'
    : '/'
}