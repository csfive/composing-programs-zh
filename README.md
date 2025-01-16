# COMPOSING PROGRAMS ![Netlify Status](https://api.netlify.com/api/v1/badges/f3b9b563-03b5-484b-a4d1-ae24463ab40c/deploy-status)

这是一个翻译项目，原书为伯克利 CS61A 的配套教材 [Composing Programs](https://www.composingprograms.com/)，也是计算机一大圣经 [SICP](https://book.douban.com/subject/1148282/) 的 Python 版本。

项目现在为维护状态，如果您发现了翻译的错漏或含混之处，可以提交 issue 或者 PR，我会抽时间 review 或者修改。同时感谢所有参与翻译的同学，也感谢每一个给项目 star 的同学。

## 运行开发服务器

### 克隆仓库

```bash
git clone https://github.com/csfive/composing-programs-zh.git --depth=1
```

### 安装包管理工具 [pnpm](https://pnpm.io/)

使用 `pnpm -v` 判断自己是否已安装 pnpm，若未安装，可参考官网 [Installation | pnpm](https://pnpm.io/installation#using-winget) 安装 pnpm。

### 安装依赖并构建

```bash
cd composing-programs-zh
pnpm install
pnpm run build
```

### 运行开发服务器

```bash
pnpm run dev
```

随后在终端的输出中找到 `Local:` 后的链接，点击即可访问。

## 贡献者列表

<a href="https://github.com/csfive/composing-programs-zh/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=csfive/composing-programs-zh" />
</a>
