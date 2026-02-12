<template>
  <transition name="slide">
    <div
      v-if="log"
      class="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <!-- 头部 -->
      <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800">日志详情</h2>
        <button
          @click="onClose"
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 内容 -->
      <div class="p-6 space-y-6">
        <!-- ID -->
        <div>
          <label class="text-xs font-semibold text-gray-500 uppercase">ID</label>
          <p class="mt-1 text-sm font-mono text-gray-800 break-all">{{ log.id }}</p>
        </div>

        <!-- 时间戳 -->
        <div>
          <label class="text-xs font-semibold text-gray-500 uppercase">时间</label>
          <p class="mt-1 text-sm text-gray-800">{{ formatTimestamp(log.timestamp) }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ log.timestamp }}</p>
        </div>

        <!-- 级别 -->
        <div>
          <label class="text-xs font-semibold text-gray-500 uppercase">级别</label>
          <div class="mt-1">
            <span
              :class="[
                'inline-block px-3 py-1 rounded-full text-sm font-bold',
                levelStyles[log.level],
              ]"
            >
              {{ log.level }}
            </span>
          </div>
        </div>

        <!-- 消息 -->
        <div>
          <label class="text-xs font-semibold text-gray-500 uppercase">消息内容</label>
          <p class="mt-1 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
            {{ log.message }}
          </p>
        </div>
      </div>
    </div>
  </transition>

  <!-- 遮罩层 -->
  <transition name="fade">
    <div
      v-if="log"
      @click="onClose"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>
  </transition>
</template>

<script setup lang="ts">
import type { LogItem } from '../types/log'

interface Props {
  log: LogItem | null
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const levelStyles = {
  INFO: 'bg-blue-100 text-blue-800',
  WARN: 'bg-yellow-100 text-yellow-800',
  ERROR: 'bg-red-100 text-red-800',
  DEBUG: 'bg-gray-100 text-gray-800',
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  })
}

const onClose = () => {
  emit('close')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

