import type { LogItem, LogLevel } from '../types/log'

/**
 * 模拟 API 函数 - 获取日志数据
 * 每次返回 5-10 条随机日志
 */
export const fetchLogsMock = (): Promise<LogItem[]> => {
  return new Promise<LogItem[]>((resolve) => {
    setTimeout(() => {
      const count = Math.floor(Math.random() * 6) + 5 // 5-10 条
      const levels: LogLevel[] = ['INFO', 'WARN', 'ERROR', 'DEBUG']

      const newLogs: LogItem[] = Array.from({ length: count }).map(() => ({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        level: levels[Math.floor(Math.random() * 4)],
        message: `System node-${Math.floor(Math.random() * 100)} reported: ${Math.random()
          .toString(36)
          .substring(7)} event occurred.`,
      }))

      resolve(newLogs)
    }, 500)
  })
}
