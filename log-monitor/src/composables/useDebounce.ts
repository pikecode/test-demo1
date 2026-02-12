import { ref, watch } from 'vue'

/**
 * 防抖 Hook
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay: number = 500) {
  const debouncedValue = ref<T>(value) as { value: T }
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(
    () => value,
    (newValue) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    }
  )

  return debouncedValue
}
