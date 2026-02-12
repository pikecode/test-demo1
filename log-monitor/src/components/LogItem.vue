<template>
  <div
    @click="onClick"
    :class="[
      'p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors',
      isSelected && 'bg-blue-50',
    ]"
  >
    <div class="flex items-start gap-3">
      <!-- 级别标签 -->
      <span
        :class="[
          'px-2 py-1 rounded text-xs font-bold flex-shrink-0',
          levelStyles[log.level],
        ]"
      >
        {{ log.level }}
      </span>

      <!-- 日志内容 -->
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-800 break-words">{{ log.message }}</p>
        <p class="text-xs text-gray-500 mt-1">
          {{ formatTimestamp(log.timestamp) }}
        </p>
      </div>

      <!-- ID -->
      <span class="text-xs text-gray-400 font-mono flex-shrink-0">
        {{ log.id.slice(0, 8) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LogItem } from '../types/log'

interface Props {
  log: LogItem
  isSelected?: boolean
}

interface Emits {
  (e: 'click', log: LogItem): void
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
  })
}

const onClick = () => {
  emit('click', props.log)
}
</script>
