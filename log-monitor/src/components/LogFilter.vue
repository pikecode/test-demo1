<template>
  <div class="bg-white shadow-sm border-b border-gray-200 p-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- 搜索框 -->
        <div class="flex-1">
          <input
            type="text"
            :value="searchKeyword"
            @input="onSearchInput"
            placeholder="搜索日志内容..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- 级别筛选 -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="level in levels"
            :key="level"
            @click="onToggleLevel(level)"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              isLevelSelected(level)
                ? levelStyles[level].active
                : levelStyles[level].inactive,
            ]"
          >
            {{ level }}
          </button>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="mt-3 text-sm text-gray-600">
        共 {{ totalCount }} 条日志
        <span v-if="filteredCount !== totalCount">
          ，筛选后 {{ filteredCount }} 条
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LogLevel } from '../types/log'

interface Props {
  searchKeyword: string
  selectedLevels: LogLevel[]
  totalCount: number
  filteredCount: number
}

interface Emits {
  (e: 'update:searchKeyword', value: string): void
  (e: 'toggleLevel', level: LogLevel): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const levels: LogLevel[] = ['INFO', 'WARN', 'ERROR', 'DEBUG']

const levelStyles = {
  INFO: {
    active: 'bg-blue-500 text-white',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  },
  WARN: {
    active: 'bg-yellow-500 text-white',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  },
  ERROR: {
    active: 'bg-red-500 text-white',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  },
  DEBUG: {
    active: 'bg-gray-500 text-white',
    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  },
}

const onSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchKeyword', target.value)
}

const onToggleLevel = (level: LogLevel) => {
  emit('toggleLevel', level)
}

const isLevelSelected = (level: LogLevel) => {
  return props.selectedLevels.includes(level)
}
</script>


