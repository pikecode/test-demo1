<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLogFetcher } from './composables/useLogFetcher'
import { useLogFilter } from './composables/useLogFilter'
import LogFilter from './components/LogFilter.vue'
import LogList from './components/LogList.vue'
import LogDetail from './components/LogDetail.vue'
import type { LogItem } from './types/log'

// 使用日志获取 Hook
const { logs, isLoading, error, startPolling, stopPolling } = useLogFetcher()

// 使用日志过滤 Hook
const {
  searchKeyword,
  selectedLevels,
  filteredLogs,
  setSearchKeyword,
  toggleLevel,
} = useLogFilter(logs)

// 选中的日志
const selectedLog = ref<LogItem | null>(null)

// 选择日志
const selectLog = (log: LogItem) => {
  selectedLog.value = log
}

// 关闭详情
const closeDetail = () => {
  selectedLog.value = null
}

// 组件挂载时开始轮询
onMounted(() => {
  startPolling()
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- 头部 -->
    <header class="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <h1 class="text-2xl font-bold">日志监控系统</h1>
        <p class="text-sm text-blue-100 mt-1">实时日志监控与分析工具</p>
      </div>
    </header>

    <!-- 过滤栏 -->
    <LogFilter
      :search-keyword="searchKeyword"
      :selected-levels="selectedLevels"
      :total-count="logs.length"
      :filtered-count="filteredLogs.length"
      @update:search-keyword="setSearchKeyword"
      @toggle-level="toggleLevel"
    />

    <!-- 加载状态 -->
    <div
      v-if="isLoading && logs.length === 0"
      class="flex-1 flex items-center justify-center"
    >
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">加载中...</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="error"
      class="flex-1 flex items-center justify-center"
    >
      <div class="text-center text-red-600">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-lg font-semibold">加载失败</p>
        <p class="text-sm mt-2">{{ error.message }}</p>
      </div>
    </div>

    <!-- 日志列表 -->
    <LogList
      v-else
      :logs="filteredLogs"
      :selected-log-id="selectedLog?.id"
      @select-log="selectLog"
    />

    <!-- 日志详情 -->
    <LogDetail
      :log="selectedLog"
      @close="closeDetail"
    />
  </div>
</template>
