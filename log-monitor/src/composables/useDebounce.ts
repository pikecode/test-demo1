import { ref, watch, onScopeDispose, type Ref } from 'vue'

/**
 * 防抖 Hook
 * @param value 需要防抖的响应式值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: Ref<T>, delay: number = 500) {
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(value, (newValue) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debouncedValue.value = newValue
      timer = null
    }, delay)
  })

  onScopeDispose(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  return debouncedValue
}
