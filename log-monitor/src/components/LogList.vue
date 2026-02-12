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
      <!-- 撑开总高度的占位容器 -->
      <div :style="{ height: totalHeight + 'px', position: 'relative' }">
        <!-- 绝对定位的可见区域 -->
        <div
          :style="{
            position: 'absolute',
            top: offsetY + 'px',
            left: 0,
            right: 0,
          }"
        >
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
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

// 虚拟滚动配置 — 必须与 LogItem 的 h-[72px] 一致
const ITEM_HEIGHT = 72
const BUFFER_COUNT = 10 // 上下各多渲染 10 条

const scrollContainer = ref<HTMLElement | null>(null)
const scrollTop = ref(0)
const containerHeight = ref(600)
let prevLogCount = 0
let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null

// ---- 计算属性 ----

const totalHeight = computed(() => props.logs.length * ITEM_HEIGHT)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER_COUNT)
)

const endIndex = computed(() =>
  Math.min(
    props.logs.length,
    Math.ceil((scrollTop.value + containerHeight.value) / ITEM_HEIGHT) + BUFFER_COUNT
  )
)

const visibleLogs = computed(() => props.logs.slice(startIndex.value, endIndex.value))

const offsetY = computed(() => startIndex.value * ITEM_HEIGHT)

// ---- 事件处理 ----

const onScroll = () => {
  // 用 rAF 节流，每帧最多更新一次
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    if (scrollContainer.value) {
      scrollTop.value = scrollContainer.value.scrollTop
    }
  })
}

const onLogClick = (log: LogItemType) => {
  emit('selectLog', log)
}

// ---- 新日志到达时补偿滚动位置 ----

watch(
  () => props.logs.length,
  (newLen) => {
    const added = newLen - prevLogCount
    if (added > 0 && prevLogCount > 0 && scrollContainer.value) {
      // 新日志插入到顶部，把当前滚动位置向下推相应距离
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop += added * ITEM_HEIGHT
        }
      })
    }
    prevLogCount = newLen
  }
)

// ---- 生命周期 ----

onMounted(() => {
  if (scrollContainer.value) {
    containerHeight.value = scrollContainer.value.clientHeight

    // 监听容器尺寸变化
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerHeight.value = entry.contentRect.height
      }
    })
    resizeObserver.observe(scrollContainer.value)
  }
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
})
</script>
