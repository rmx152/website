import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/vue-deploy/" : "/",

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
