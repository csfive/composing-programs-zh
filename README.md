# COMPOSING PROGRAMS

[![Deploy](https://api.netlify.com/api/v1/badges/f3b9b563-03b5-484b-a4d1-ae24463ab40c/deploy-status)](https://app.netlify.com/sites/composingprograms/deploys)
[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](./LICENSE)

伯克利 CS61A 教材 [Composing Programs](https://www.composingprograms.com/) 的中文翻译，也是计算机经典 [SICP](https://book.douban.com/subject/1148282/) 的 Python 版本。

> **在线阅读：<https://composingprograms.netlify.app>**

## 内容

全书 4 章 29 节，均已完成翻译与审校。

**第一章：使用函数构建抽象**

- [1.1 开始](https://composingprograms.netlify.app/1/1)
- [1.2 编程要素](https://composingprograms.netlify.app/1/2)
- [1.3 定义新的函数](https://composingprograms.netlify.app/1/3)
- [1.4 设计函数](https://composingprograms.netlify.app/1/4)
- [1.5 控制](https://composingprograms.netlify.app/1/5)
- [1.6 高阶函数](https://composingprograms.netlify.app/1/6)
- [1.7 递归函数](https://composingprograms.netlify.app/1/7)

**第二章：使用数据构建抽象**

- [2.1 引言](https://composingprograms.netlify.app/2/1)
- [2.2 数据抽象](https://composingprograms.netlify.app/2/2)
- [2.3 序列](https://composingprograms.netlify.app/2/3)
- [2.4 可变数据](https://composingprograms.netlify.app/2/4)
- [2.5 面向对象编程](https://composingprograms.netlify.app/2/5)
- [2.6 实现类和对象](https://composingprograms.netlify.app/2/6)
- [2.7 对象抽象](https://composingprograms.netlify.app/2/7)
- [2.8 效率](https://composingprograms.netlify.app/2/8)
- [2.9 递归对象](https://composingprograms.netlify.app/2/9)

**第三章：计算机程序的解释**

- [3.1 引言](https://composingprograms.netlify.app/3/1)
- [3.2 函数式编程](https://composingprograms.netlify.app/3/2)
- [3.3 异常](https://composingprograms.netlify.app/3/3)
- [3.4 组合语言的解释器](https://composingprograms.netlify.app/3/4)
- [3.5 抽象语言的解释器](https://composingprograms.netlify.app/3/5)

**第四章：数据处理**

- [4.1 引言](https://composingprograms.netlify.app/4/1)
- [4.2 隐式序列](https://composingprograms.netlify.app/4/2)
- [4.3 声明式编程](https://composingprograms.netlify.app/4/3)
- [4.4 逻辑编程](https://composingprograms.netlify.app/4/4)
- [4.5 合一](https://composingprograms.netlify.app/4/5)
- [4.6 分布式计算](https://composingprograms.netlify.app/4/6)
- [4.7 分布式数据处理](https://composingprograms.netlify.app/4/7)
- [4.8 并行计算](https://composingprograms.netlify.app/4/8)

## 本地运行

需要 [Bun](https://bun.sh/)。

```sh
bun install      # 安装依赖
bun run dev      # 本地预览（http://localhost:5173）
bun run build    # 构建到 .vitepress/dist
```

提交前跑一遍完整检查：

```sh
bun run typecheck    # 类型检查
bun run lint         # 代码检查
bun run format:check # 格式检查
bun run test         # 单元测试
```

## 翻译规范

- [`GLOSSARY.md`](./GLOSSARY.md) —— 术语表，逐章校对的基准，**一切术语以此为准**。
- [`TRANSLATION.md`](./TRANSLATION.md) —— 翻译风格约定，含「常见翻译腔（反面清单）」与交付前自检。

修改译文前请先读这两份文档。术语以官方 [Python 中文文档](https://docs.python.org/zh-cn/3/glossary.html) 与 [SICP 中译本](https://book.douban.com/subject/1148282/) 为权威来源。

## 反馈与贡献

欢迎任何形式的参与，详见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

- **发现错漏**：开一个 [issue](https://github.com/csfive/composing-programs-zh/issues)，写明章节、原句与你的建议。
- **提交修改**：发 PR 前请先读 [`TRANSLATION.md`](./TRANSLATION.md)，保持术语一致。

## 技术栈

[VitePress](https://vitepress.dev/) + Vue 3 + TypeScript，包管理用 Bun；`oxlint` / `oxfmt` 做检查与格式化，`vitest` 跑测试，第三、四章的 Scheme 代码块由 [BiwaScheme](https://www.biwascheme.org/) 提供交互运行。

## 贡献者

<a href="https://github.com/csfive/composing-programs-zh/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=csfive/composing-programs-zh" />
</a>

## 许可与致谢

原书 [Composing Programs](https://www.composingprograms.com/) 由 [John DeNero](https://www.dennco.com/) 编写，基于 Harold Abelson 与 Gerald Jay Sussman 的《计算机程序的构造和解释》，以 Creative Commons 署名—相同方式共享（CC BY-SA）许可发布。本译文是其衍生作品，正文同样以相同许可发布；仓库中的站点代码以 [MIT](./LICENSE) 发布。

感谢原作者 John DeNero 与 SICP 的两位作者，也感谢每一位参与翻译和给项目 star 的同学。
