import { ref, computed } from 'vue'
import type { LogItem, LogLevel } from '../types/log'
import { useDebounce } from './useDebounce'

/**
 * 日志过滤 Hook
 * 支持关键词搜索和级别筛选
 */
export function useLogFilter(logs: { value: LogItem[] }) {
  const searchKeyword = ref('')
  const selectedLevels = ref<LogLevel[]>(['INFO', 'WARN', 'ERROR', 'DEBUG'])

  // 防抖处理搜索关键词
  const debouncedKeyword = useDebounce(searchKeyword, 500)

  /**
   * 过滤后的日志列表
   */
  const filteredLogs = computed(() => {
    let result = logs.value

    // 按级别过滤
    if (selectedLevels.value.length > 0 && selectedLevels.value.length < 4) {
      result = result.filter((log) => selectedLevels.value.includes(log.level))
    }

    // 按关键词搜索
    const keyword = debouncedKeyword.value.trim().toLowerCase()
    if (keyword) {
      result = result.filter((log) => log.message.toLowerCase().includes(keyword))
    }

    return result
  })

  /**
   * 设置搜索关键词
   */
  const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword
  }

  /**
   * 切换日志级别选择
   */
  const toggleLevel = (level: LogLevel) => {
    const index = selectedLevels.value.indexOf(level)
    if (index > -1) {
      selectedLevels.value.splice(index, 1)
    } else {
      selectedLevels.value.push(level)
    }
  }

  /**
   * 选择所有级别
   */
  const selectAllLevels = () => {
    selectedLevels.value = ['INFO', 'WARN', 'ERROR', 'DEBUG']
  }

  /**
   * 清除所有级别选择
   */
  const clearAllLevels = () => {
    selectedLevels.value = []
  }

  return {
    searchKeyword,
    selectedLevels,
    filteredLogs,
    setSearchKeyword,
    toggleLevel,
    selectAllLevels,
    clearAllLevels,
  }
}
