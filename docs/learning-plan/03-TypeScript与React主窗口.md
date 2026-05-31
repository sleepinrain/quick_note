# 阶段 3：TypeScript 与 React 主窗口

## 阶段目标

先做一个普通主窗口，实现内存版笔记管理。此阶段不接 SQLite，不写 Rust 业务逻辑。

## 前置条件

- 阶段 2 已完成。
- Tauri 应用可以本地启动。

## 学习重点

- TypeScript 类型
- React 组件拆分
- React state
- 表单输入
- 列表渲染
- 简单事件处理

## 开发任务

### 1. 定义笔记类型

建议创建：

```text
src/types/note.ts
```

定义：

```ts
export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
```

### 2. 创建主窗口页面

建议创建：

```text
src/pages/MainWindow.tsx
```

主窗口包含：

- 左侧笔记列表
- 右侧笔记编辑区
- 顶部新建按钮

### 3. 拆分组件

建议组件：

```text
src/components/NoteList.tsx
src/components/NoteEditor.tsx
src/components/TagInput.tsx
src/components/EmptyState.tsx
```

组件职责：

- `NoteList`：显示笔记列表，处理选择笔记。
- `NoteEditor`：编辑标题和正文。
- `TagInput`：编辑标签。
- `EmptyState`：没有选中笔记时显示空状态。

### 4. 使用内存状态保存笔记

在 `MainWindow.tsx` 里用 `useState<Note[]>` 暂存笔记。

需要实现：

- 新建笔记
- 选择笔记
- 修改标题
- 修改正文
- 修改标签
- 删除笔记

### 5. 先不做的内容

本阶段不要做：

- SQLite
- Tauri command
- 悬浮窗口
- 托盘
- 全局快捷键
- 复杂样式

## 建议验收用例

手动测试：

1. 启动应用。
2. 点击新建。
3. 输入标题。
4. 输入正文。
5. 添加标签。
6. 再新建一条笔记。
7. 在列表中切换两条笔记。
8. 删除一条笔记。

注意：本阶段刷新或重启后数据丢失是正常的。

## Git 提交要求

建议提交：

```text
feat: add in-memory note editor
```

如果拆得更细：

```text
feat: add note types and main layout
feat: add in-memory note editing
```

## 验收标准

- 应用可以启动。
- 可以创建多条笔记。
- 可以编辑标题、正文、标签。
- 可以删除笔记。
- 列表和编辑区状态同步。
- TypeScript 没有明显类型错误。

## 官方参考文档

- TypeScript handbook, everyday types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- TypeScript object types: https://www.typescriptlang.org/docs/handbook/2/objects.html
- React components: https://react.dev/learn/your-first-component
- React state: https://react.dev/learn/state-a-components-memory
- React rendering lists: https://react.dev/learn/rendering-lists
- React input: https://react.dev/reference/react-dom/components/input
- React textarea: https://react.dev/reference/react-dom/components/textarea

## 完成后更新

完成本阶段后，更新 `99-进度记录.md`：

- 当前阶段改为：阶段 4
- 记录已完成组件
- 记录未解决的 UI 或状态问题
- 记录本阶段 commit hash
