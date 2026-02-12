import { shallowRef, ref, onUnmounted } from 'vue'
import type { LogItem } from '../types/log'
import { fetchLogsMock } from '../api/logApi'

const MAX_LOGS = 10000

/**
 * 实时日志获取 Hook
 * 每 3 秒轮询一次新日志
 */
export function useLogFetcher() {
  const logs = shallowRef<LogItem[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const fetchLogs = async () => {
    try {
      isLoading.value = true
      error.value = null
      const newLogs = await fetchLogsMock()
      // 新日志添加到顶部，超出上限时截断尾部
      const merged = [...newLogs, ...logs.value]
      logs.value = merged.length > MAX_LOGS ? merged.slice(0, MAX_LOGS) : merged
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  const startPolling = () => {
    fetchLogs()
    timer = setInterval(fetchLogs, 3000)
  }

  const stopPolling = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

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
