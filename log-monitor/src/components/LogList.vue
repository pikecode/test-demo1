<template>
  <div class="flex-1 overflow-hidden bg-white">
    <!-- 空状态 -->
    <div
      v-if="logs.length === 0"
      class="flex flex-col items-center justify-center h-full text-gray-500"
    >
      <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <p class="text-lg">暂无日志数据</p>
    </div>

    <!-- 日志列表 -->
    <div
      v-else
      ref="scrollContainer"
      class="h-full overflow-y-auto"
      @scroll="onScroll"
    >
      <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
        <div :style="{ transform: `translateY(${offsetY}px)` }">
          <LogItem
            v-for="log in visibleLogs"
            :key="log.id"
            :log="log"
            :is-selected="selectedLogId === log.id"
            @click="onLogClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { LogItem as LogItemType } from '../types/log'
import LogItem from './LogItem.vue'

interface Props {
  logs: LogItemType[]
  selectedLogId?: string | null
}

interface Emits {
  (e: 'selectLog', log: LogItemType): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 虚拟滚动配置
const ITEM_HEIGHT = 80 // 每条日志的高度
const BUFFER_SIZE = 5 // 缓冲区大小

const scrollContainer = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(600)

// 计算总高度
const totalHeight = computed(() => props.logs.length * ITEM_HEIGHT)

// 计算可见范围
const visibleRange = computed(() => {
  const start = Math.floor(scrollTop.value / ITEM_HEIGHT)
  const end = Math.ceil((scrollTop.value + containerHeight.value) / ITEM_HEIGHT)
  return {
    start: Math.max(0, start - BUFFER_SIZE),
    end: Math.min(props.logs.length, end + BUFFER_SIZE),
  }
})

// 可见的日志列表
const visibleLogs = computed(() => {
  const { start, end } = visibleRange.value
  return props.logs.slice(start, end)
})

// 偏移量
const offsetY = computed(() => visibleRange.value.start * ITEM_HEIGHT)

// 滚动事件处理
const onScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

// 日志点击事件
const onLogClick = (log: LogItemType) => {
  emit('selectLog', log)
}

// 监听容器大小变化
onMounted(() => {
  if (scrollContainer.value) {
    containerHeight.value = scrollContainer.value.clientHeight
  }
})

// 监听日志列表变化，保持滚动位置
watch(
  () => props.logs.length,
  () => {
    // 新日志添加到顶部时，保持当前视图位置
    // 这里可以根据需要调整滚动行为
  }
)
</script>
