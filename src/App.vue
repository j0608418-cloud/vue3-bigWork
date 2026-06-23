<script setup>
// 在vue3 components式aip中
// this已经获取不了当前组件对象，取而代之的是
// 1.获取路由对象 router useRouter
// const router = useRouter()
// 2.获取路由参数 route useRoute
// const route = useRoute
// 而且还需导入
import { useRoute, useRouter } from 'vue-router';
const route = useRoute ()
const router = useRouter()

//仓库统一导出
import { useUserStore } from '@/stores'
const useStore = useUserStore()

// 将包的语言设置为中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <div>
    <!-- 按文档要求设置 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
