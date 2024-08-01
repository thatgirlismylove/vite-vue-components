import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import josn from './package.json'

// 生成 ts 类型声明文件
// import dts from 'vite-plugin-dts'

const pkgName = josn.name

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // dts({ rollupTypes: true }),
  ],
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),
      name: pkgName,
      formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: (formatName) => `${pkgName}.${formatName}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
