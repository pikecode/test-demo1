# Web 端日志监控工具

一个基于 Vue 3 + TypeScript + Vite 的实时日志监控系统，支持大量数据的高性能渲染、实时搜索过滤和详情查看。

## 功能特性

- ✅ **实时数据获取**: 每 3 秒自动轮询新日志
- ✅ **高性能渲染**: 虚拟滚动技术，支持 5000+ 条日志流畅展示
- ✅ **智能搜索**: 支持关键词模糊搜索，500ms 防抖优化
- ✅ **级别过滤**: 支持按 INFO/WARN/ERROR/DEBUG 筛选
- ✅ **详情查看**: 侧边栏展示完整日志信息
- ✅ **响应式设计**: 适配桌面和移动端

## 技术栈

- **框架**: Vue 3.4+ (Composition API, `<script setup>`)
- **语言**: TypeScript 5.0+ (strict mode)
- **构建工具**: Vite 5.0+
- **样式方案**: Tailwind CSS 3.0+
- **代码规范**: ESLint + Prettier

## 项目结构

```
src/
├── types/
│   └── log.ts                  # 日志类型定义
├── api/
│   └── logApi.ts               # API 模拟函数
├── composables/
│   ├── useLogFetcher.ts        # 实时数据获取
│   ├── useLogFilter.ts         # 搜索过滤逻辑
│   └── useDebounce.ts          # 防抖 Hook
├── components/
│   ├── LogList.vue             # 虚拟滚动列表
│   ├── LogItem.vue             # 单条日志组件
│   ├── LogDetail.vue           # 日志详情面板
│   └── LogFilter.vue           # 搜索过滤栏
├── App.vue                     # 主应用组件
└── main.ts                     # 应用入口
```

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 核心功能说明

### 1. 实时数据获取

使用 `useLogFetcher` Composable 实现：
- 每 3 秒自动轮询新日志
- 新日志自动添加到列表顶部
- 支持启动/停止轮询
- 自动错误处理

### 2. 高性能列表渲染

使用虚拟滚动技术：
- 只渲染可视区域的 DOM 节点
- 支持 5000+ 条数据流畅滚动
- 动态计算可见范围
- 缓冲区优化

### 3. 搜索与过滤

使用 `useLogFilter` Composable 实现：
- 关键词模糊搜索
- 多级别筛选
- 500ms 防抖优化
- 实时计算过滤结果

### 4. 日志详情

点击日志条目查看详情：
- 侧边栏展示
- 完整信息显示
- 平滑动画效果
- 遮罩层交互

## 性能优化

1. **虚拟滚动**: 只渲染可视区域，减少 DOM 节点
2. **防抖搜索**: 避免频繁触发过滤计算
3. **计算属性缓存**: 自动缓存过滤结果
4. **TypeScript 严格模式**: 编译时类型检查

## 开发规范

### Git Commit 规范

遵循 Conventional Commits:

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具配置
```

### 代码风格

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 官方风格指南

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

MIT

## 作者

开发团队

## 更新日志

### v1.0.0 (2026-02-12)

- ✅ 初始版本发布
- ✅ 实现实时日志获取
- ✅ 实现高性能虚拟滚动
- ✅ 实现搜索过滤功能
- ✅ 实现日志详情查看
