import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

//数据持久化
const pinia = createPinia()
pinia.use(persist)


export default pinia

//仓库统一导出（前置处理）
export * from './modules/user'


