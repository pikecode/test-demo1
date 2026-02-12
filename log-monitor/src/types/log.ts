/**
 * 日志级别类型
 */
export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

/**
 * 日志项接口
 */
export interface LogItem {
  id: string
  timestamp: number
  level: LogLevel
  message: string
}

/**
 * 日志过滤选项
 */
export interface LogFilterOptions {
  keyword: string
  levels: LogLevel[]
}
