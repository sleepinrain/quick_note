# 阶段 1：GitHub 与项目管理

## 阶段目标

先建立项目管理基础。这个阶段不写应用功能，重点是学会用 Git 和 GitHub 管理代码、任务和版本。

## 为什么先做这个

如果等代码写多了再补 GitHub，容易出现提交混乱、历史不可读、问题难定位。先建立工作流，后续每一步都有记录。

## 前置条件

- 已安装 Git。
- 已注册 GitHub 账号。
- 本地可以访问 GitHub。

## 学习重点

- Git 仓库初始化
- commit 的意义
- branch 的意义
- GitHub 远程仓库
- issue 记录任务
- pull request 的基本流程
- README 的作用

## 开发任务

### 1. 初始化 Git 仓库

在项目目录执行：

```bash
git init
git status
```

如果仓库已经存在，只需要执行：

```bash
git status
```

### 2. 创建基础项目说明

创建或更新 `README.md`，至少包含：

- 项目名称
- 项目目标
- 当前阶段
- 技术栈计划
- 如何运行，暂时可以写“待补充”

建议第一版 README 内容保持简洁，不要写成完整产品文档。

### 3. 创建 `.gitignore`

先加入常见内容：

```gitignore
node_modules/
dist/
target/
.env
.env.local
*.log
```

后续创建 Tauri 项目后，再根据实际生成内容补充。

### 4. 完成第一次提交

```bash
git add README.md .gitignore docs/
git commit -m "docs: add learning plan"
```

### 5. 创建 GitHub 远程仓库

在 GitHub 新建仓库，推荐仓库名：

```text
quick_note
```

然后按 GitHub 页面提示添加远程地址：

```bash
git remote add origin <你的仓库地址>
git branch -M main
git push -u origin main
```

### 6. 创建第一批 issues

建议创建这些 issues：

- Stage 2: Initialize Tauri React project
- Stage 3: Build note list and editor
- Stage 4: Add SQLite persistence
- Stage 5: Add tags and search
- Stage 6: Learn Rust command boundary
- Stage 7: Add desktop shell features
- Stage 8: Add tests and release build

## Git 提交要求

本阶段至少 1 次 commit：

```text
docs: add learning plan
```

如果 README 和 GitHub issue 分开做，也可以拆成：

```text
docs: add project readme
docs: add learning plan
```

## 验收标准

- 本地目录已经是 Git 仓库。
- GitHub 上已经有远程仓库。
- `README.md` 存在。
- `.gitignore` 存在。
- `docs/learning-plan` 已提交。
- GitHub 上至少有 3 个 issues。
- `git status` 显示工作区干净，或只剩下你明确知道的未提交文件。

## 官方参考文档

- Git book, getting started: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- Git book, recording changes: https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository
- GitHub create a repo: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- GitHub issues: https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
- GitHub pull requests: https://docs.github.com/en/pull-requests
- GitHub Markdown: https://docs.github.com/en/get-started/writing-on-github

## 完成后更新

完成本阶段后，更新 `99-进度记录.md`：

- 当前阶段改为：阶段 2
- 已完成事项记录 GitHub 仓库地址
- 记录本阶段 commit hash
