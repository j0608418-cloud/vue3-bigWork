<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService, artDelChannelService } from '../../api/article'
import ChannelEdit from './components/ChannelEdit.vue'
// 定义文章列表
const channelList = ref([])
const loading = ref(false)
// 创建一个ref变量来获取channelEdit子组件的方法
const dialog = ref()

// 获取文章内容
const getChannelList = async () => {
  // loading开关记得设置
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除该分类么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <!-- 通过elementPlus的特性不用注册直接导入 -->
  <page-container title="文章分类">
    <!-- 具体插槽 -->
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <!-- 下面那个就是默认插槽导入的  v-loading在数据没有出来前加一个加载动画-->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <!-- type:"index"为序号 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- 编辑功能 elementplus使用默认插槽来完成
        row 就是 channelList 的一项（理解为item）， $index 下标 -->
        <template #default="{ row, $index }">
          <!-- :icon="Edit"编辑按钮 -->
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <!-- 定制没有数据的样式 -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <!-- 编辑组件  再接受子组件传来的修改成功-->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
