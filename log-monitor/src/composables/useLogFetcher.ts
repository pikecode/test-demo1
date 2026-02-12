import { ref, onUnmounted } from 'vue'
import type { LogItem } from '../types/log'
import { fetchLogsMock } from '../api/logApi'

/**
 * 实时日志获取 Hook
 * 每 3 秒轮询一次新日志
 */
export function useLogFetcher() {
  const logs = ref<LogItem[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  /**
   * 获取新日志
   */
  const fetchLogs = async () => {
    try {
      isLoading.value = true
      error.value = null
      const newLogs = await fetchLogsMock()
      // 将新日志添加到列表顶部
      logs.value = [...newLogs, ...logs.value]
    } catch (err) {
      error.value = err as Error
      console.error('Failed to fetch logs:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 开始轮询
   */
  const startPolling = () => {
    // 立即获取一次
    fetchLogs()
    // 每 3 秒轮询一次
    timer = setInterval(fetchLogs, 3000)
  }

  /**
   * 停止轮询
   */
  const stopPolling = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // 组件卸载时清理定时器
  onUnmounted(() => {
    stopPolling()
  })

  return {
    logs,
    isLoading,
    error,
    startPolling,
    stopPolling,
  }
}
