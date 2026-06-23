<script setup>
//父传子来定义title内容
defineProps({
  title: {
    required: true,
    type: String
  }
})
//父传子传递的值可以实时改变，且可以将值放在标签里面当成属性
//而插槽可以放置多个文本内容可以传递父类的一整个组件
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽来定义小按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 默认插槽来获得文章具体内容 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
