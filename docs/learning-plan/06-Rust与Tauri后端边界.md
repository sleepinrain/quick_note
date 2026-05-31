# 阶段 6：Rust 与 Tauri 后端边界

## 阶段目标

理解 Rust 在 Tauri 项目中的作用。不要为了学习 Rust 强行重写所有功能，而是选择合适的边界逐步接触。

## 前置条件

- 阶段 5 已完成。
- 标签和搜索已经可用。

## 学习重点

- Rust 基础类型
- `struct`
- `enum`
- `Option`
- `Result`
- 错误处理
- `serde`
- Tauri command
- 前端调用后端

## 推荐策略

第一版可以让 SQL 插件负责数据库，Rust 只负责桌面侧能力和少量系统能力。

不建议初期把全部数据层迁移到 Rust，因为这会同时增加 Rust、SQL、Tauri 权限、异步错误处理的复杂度。

## 开发任务

### 1. 阅读现有 `src-tauri` 结构

重点看：

```text
src-tauri/src/main.rs
src-tauri/Cargo.toml
src-tauri/tauri.conf.json
```

理解：

- 应用从哪里启动。
- 插件在哪里注册。
- Tauri command 在哪里声明。

### 2. 增加一个简单 command

示例目标：

前端调用 Rust，返回应用版本号或问候文本。

Rust 侧概念：

```rust
#[tauri::command]
fn get_app_info() -> String {
    "Quick Note".to_string()
}
```

前端侧概念：

```ts
import { invoke } from "@tauri-apps/api/core";

const appInfo = await invoke<string>("get_app_info");
```

具体代码以项目实际 Tauri 版本和文件结构为准。

### 3. 增加带参数 command

示例目标：

前端传入一个标签字符串，Rust 返回标准化后的标签。

这个任务用于练习：

- 参数传递
- 字符串处理
- 返回值

### 4. 增加 Result 返回

示例目标：

前端传入空字符串时，Rust 返回错误。

这个任务用于练习：

- `Result<T, E>`
- 前端捕获错误

### 5. 决定后端边界

阶段结束时需要决定：

- 哪些功能继续留在前端。
- 哪些功能适合迁移到 Rust。

建议第一版 Rust 负责：

- 窗口管理辅助逻辑
- 应用信息
- 系统能力封装
- 后续可能的导入导出

建议第一版前端负责：

- 表单状态
- UI 状态
- 搜索输入解析
- 调用 SQL 插件

## Git 提交要求

建议提交：

```text
feat: add basic tauri commands
```

## 验收标准

- 前端可以成功调用 Rust command。
- command 可以接收参数。
- command 可以返回错误。
- 你能说明前端和 Rust 后端各自负责什么。

## 官方参考文档

- Tauri calling Rust from frontend: https://v2.tauri.app/develop/calling-rust/
- Tauri command concept: https://v2.tauri.app/develop/calling-rust/#commands
- Tauri JavaScript core invoke: https://v2.tauri.app/reference/javascript/api/core/#invoke
- Rust book, common programming concepts: https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html
- Rust book, structs: https://doc.rust-lang.org/book/ch05-00-structs.html
- Rust book, enums and pattern matching: https://doc.rust-lang.org/book/ch06-00-enums.html
- Rust book, error handling: https://doc.rust-lang.org/book/ch09-00-error-handling.html
- Serde documentation: https://serde.rs/

## 完成后更新

完成本阶段后，更新 `99-进度记录.md`：

- 当前阶段改为：阶段 7
- 记录已经添加的 command
- 记录前后端边界决策
- 记录本阶段 commit hash
