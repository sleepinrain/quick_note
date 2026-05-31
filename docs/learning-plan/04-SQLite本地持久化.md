# 阶段 4：SQLite 本地持久化

## 阶段目标

把内存版笔记改成本地持久化版本。重启应用后，笔记数据仍然存在。

## 前置条件

- 阶段 3 已完成。
- 主窗口可以完成内存版 CRUD。

## 学习重点

- SQLite 基础
- 数据表设计
- Tauri SQL 插件
- 前端数据访问层
- 异步操作和错误处理

## 开发任务

### 1. 安装 Tauri SQL 插件

优先使用官方 SQL 插件，降低初期 Rust 复杂度。

需要完成：

- 安装插件
- 配置 SQLite 驱动
- 配置 Tauri 权限
- 创建数据库连接

### 2. 创建数据库表

第一版表结构：

```sql
CREATE TABLE IF NOT EXISTS notes (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT NOT NULL DEFAULT '',
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
);
```

标签表可以在阶段 5 加入。阶段 4 只做笔记持久化，范围要控制住。

### 3. 创建数据访问层

建议目录：

```text
src/db/
  database.ts
  notes.ts
```

建议方法：

```ts
createNote(input)
updateNote(id, input)
deleteNote(id)
listNotes()
getNote(id)
```

### 4. 替换内存状态

主窗口仍然用 React state 显示数据，但数据来源改成 SQLite：

- 应用启动时调用 `listNotes()`。
- 新建笔记时先写数据库，再刷新列表。
- 编辑笔记时更新数据库，再更新本地 state。
- 删除笔记时删除数据库，再更新本地 state。

### 5. 增加错误显示

至少做到：

- 数据库初始化失败时显示错误。
- 保存失败时不要假装成功。
- 控制台输出具体错误，方便调试。

## Git 提交要求

建议提交：

```text
feat: persist notes with sqlite
```

如果拆分：

```text
chore: add tauri sql plugin
feat: add note persistence layer
feat: connect editor to sqlite storage
```

## 验收标准

- 可以创建笔记。
- 可以编辑笔记。
- 可以删除笔记。
- 重启应用后，已保存笔记仍然存在。
- 数据库错误不会导致空白页面。

## 官方参考文档

- Tauri SQL plugin: https://v2.tauri.app/plugin/sql/
- Tauri capabilities: https://v2.tauri.app/security/capabilities/
- Tauri JavaScript API: https://v2.tauri.app/reference/javascript/api/
- SQLite CREATE TABLE: https://www.sqlite.org/lang_createtable.html
- SQLite INSERT: https://www.sqlite.org/lang_insert.html
- SQLite UPDATE: https://www.sqlite.org/lang_update.html
- SQLite DELETE: https://www.sqlite.org/lang_delete.html
- SQLite SELECT: https://www.sqlite.org/lang_select.html

## 常见问题

### 页面先显示空列表，然后才出现数据

这是异步加载的正常现象。可以加 loading 状态。

### 保存后列表没有更新

检查数据库写入是否成功，以及写入后是否更新了 React state。

### 数据库文件找不到

先确认 Tauri SQL 插件的数据库 URL 和应用数据目录配置。

## 完成后更新

完成本阶段后，更新 `99-进度记录.md`：

- 当前阶段改为：阶段 5
- 记录数据库表结构
- 记录数据库文件位置
- 记录本阶段 commit hash
