# 参与贡献

感谢你愿意花时间。这份指南说明三件事：怎么报告问题、怎么改译文、怎么改站点。

## 报告错漏

- 直接用 [issue 模板](https://github.com/csfive/composing-programs-zh/issues/new/choose)，或开普通 issue 也行。
- 尽量写清楚：**哪一节**（如 1.2 编程要素）、**原文哪一句**、**现在的中文**、**问题在哪**（误译 / 漏译 / 术语不一致 / 读起来别扭）、以及**你的建议**。
- 一处一个问题，方便逐条跟进。

## 修改译文

1. 先读 [`TRANSLATION.md`](./TRANSLATION.md)（风格）与 [`GLOSSARY.md`](./GLOSSARY.md)（术语，**一切以此为准**）。
2. 只改正文；外部链接、图片与章节结构保持不变。
3. 改动术语时，同步更新 `GLOSSARY.md`，并按 `TRANSLATION.md` 里的命令重新生成派生副本 `.baoyu-skills/baoyu-translate/glossary.md`。
4. 本地跑一遍检查：

```sh
bun install

bun run dev          # 预览，http://localhost:5173
bun run typecheck    # 类型检查
bun run lint         # 代码检查
bun run format:check # 格式检查（bun run format 可自动格式化）
bun run test         # 单元测试
```

## 修改站点与组件

- 站点代码在 `.vitepress/`；第三、四章的 Scheme 交互块见 `.vitepress/scheme` 和 `.vitepress/theme/components/SchemeRunBlock.vue`。
- 新增或修改逻辑时，请补上 `vitest` 测试（`*.test.ts`），不要降低现有覆盖。

## 提交信息

用约定式提交，作用域写章节或模块：

- `docs(1.2): 修正……` —— 译文改动
- `fix(scheme): ……` —— 交互块等修复
- 其余按 `feat:` / `refactor:` / `chore:` / `ci:` 归类

## Pull Request

- 在描述里关联对应 issue（如 `Closes #123`）。
- CI 会跑 typecheck / lint / format / test / build，全部通过后再合并。
