# Quick Note

Quick Note 是一个用于学习和实践桌面应用开发的本地笔记项目。

## 项目目标

通过构建一个完整的桌面笔记应用，学习并实践：

- Git / GitHub 项目管理工作流
- Tauri 2 桌面应用开发
- React + TypeScript 前端开发
- SQLite 本地数据持久化
- 基础测试、打包和发布流程

## 当前阶段

阶段 2：环境准备与项目初始化。

当前重点是跑通一个 Tauri + React + TypeScript 桌面空应用，还不实现笔记功能。

## 技术栈计划

- 桌面框架：Tauri 2
- 前端框架：React + TypeScript + Vite
- 样式：Tailwind CSS
- 数据库：SQLite
- 包管理器：npm

## 环境要求

- Node.js LTS
- npm
- Rust toolchain
- Visual Studio C++ Build Tools
- Microsoft Edge WebView2 Runtime

## 本地开发

安装依赖：

```bash
npm install
```

启动桌面开发模式：

```bash
npm run tauri dev
```

如果 PowerShell 因执行策略拦截 `npm.ps1`，可以改用：

```powershell
npm.cmd install
npm.cmd run tauri dev
```
