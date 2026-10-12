# 术语表（GLOSSARY）

本表用于统一《Composing Programs》中文版（CS Five）的术语译法，是逐章校对译文的基准。

## 权威来源

1. **Python 官方中文文档《术语对照表》** —— <https://docs.python.org/zh-cn/3/glossary.html>
   语言、运行时、内置类型相关术语一律以它为准。
2. **《计算机程序的构造和解释》(SICP) 中译本（裘宗燕 译）** 及 SICP 通行译法
   程序设计、求值模型、解释器相关术语以它为准。
3. **中文计算机教材通行译法**
   以上两者未覆盖时采用。

## 使用约定

1. 术语首次出现时写作「中文（English）」，之后只用中文。
2. 同一英文词全篇**只用一个**中文译法（见下表）；反之，同一中文词不应同时对应多个英文词。
3. 表格中「来源」列：`Py` = Python 官方中文文档，`SICP` = SICP 中译本/通行，`通` = 通用教材通行译法。
4. 拿不准或发现旧译与本表冲突时，先在 issue 里确认，再改。

---

## 1. 语言与求值基础

| English               | 中文               | 来源 | 说明                                                      |
| --------------------- | ------------------ | ---- | --------------------------------------------------------- |
| expression            | 表达式             | Py   |                                                           |
| statement             | 语句               | Py   | 与「表达式」严格区分                                      |
| name                  | 名称               | 通   | 不译作「名字」                                            |
| value                 | 值                 | 通   |                                                           |
| variable              | 变量               | Py   |                                                           |
| binding               | 绑定               | Py   | 不译作「约束」（constraint 才是「约束」）                 |
| assignment            | 赋值               | 通   |                                                           |
| evaluate / evaluation | 求值               | Py   | 不译作「计算」（compute/calculation 才是「计算」）        |
| operator              | 运算符             | Py   |                                                           |
| operand               | 操作数             | 通   |                                                           |
| call expression       | 调用表达式         | SICP |                                                           |
| subexpression         | 子表达式           | SICP |                                                           |
| literal               | 字面值             | 通   |                                                           |
| identifier            | 标识符             | 通   |                                                           |
| keyword               | 关键字             | 通   |                                                           |
| syntax                | 语法               | 通   |                                                           |
| semantics             | 语义               | 通   |                                                           |
| comment               | 注释               | 通   |                                                           |
| return                | 返回               | 通   |                                                           |
| scope                 | 作用域             | Py   | 与「环境」区分                                            |
| namespace             | 命名空间           | Py   |                                                           |
| environment           | 环境               | SICP | 求值模型中的 environment                                  |
| frame                 | 帧                 | Py   | 全局帧 / 局部帧；不译作「框架」（framework 才是「框架」） |
| global                | 全局               | Py   |                                                           |
| local                 | 局部               | 通   |                                                           |
| interpreter           | 解释器             | Py   |                                                           |
| interpreted           | 解释型的           | Py   |                                                           |
| interactive           | 交互式的           | Py   |                                                           |
| REPL                  | 读取-求值-打印循环 | Py   | read-eval-print loop                                      |
| prompt                | 提示符             | Py   | `>>>`                                                     |

## 2. 函数与抽象

| English               | 中文          | 来源 | 说明                                                             |
| --------------------- | ------------- | ---- | ---------------------------------------------------------------- |
| function              | 函数          | Py   |                                                                  |
| procedure             | 过程          | SICP | 强调「可被施加的过程」时用「过程」                               |
| parameter             | 形参          | Py   | 函数定义中的命名实体；本书原文 formal parameter 译作「形式参数」 |
| argument              | 参数          | Py   | 调用时传入的值；注意与形参区分                                   |
| call                  | 调用          | 通   |                                                                  |
| apply                 | 施加 / 应用   | SICP | 将过程施加于参数                                                 |
| return value          | 返回值        | 通   |                                                                  |
| pure function         | 纯函数        | SICP |                                                                  |
| higher-order function | 高阶函数      | SICP |                                                                  |
| composition           | 复合          | SICP | 复合函数、复合数据                                               |
| currying              | 柯里化        | 通   |                                                                  |
| decorator             | 装饰器        | Py   |                                                                  |
| closure               | 闭包          | 通   |                                                                  |
| predicate             | 谓词          | 通   |                                                                  |
| recursion / recursive | 递归 / 递归的 | 通   |                                                                  |
| iteration / iterative | 迭代 / 迭代的 | 通   |                                                                  |
| memoization           | 记忆化        | 通   |                                                                  |
| abstraction           | 抽象          | 通   |                                                                  |
| primitive             | 基本的        | 通   | 基本表达式、基本函数                                             |
| compound              | 复合的        | 通   |                                                                  |
| default argument      | 默认参数      | Py   |                                                                  |

## 3. 数据与序列

| English            | 中文          | 来源 | 说明                   |
| ------------------ | ------------- | ---- | ---------------------- |
| data abstraction   | 数据抽象      | SICP |                        |
| constructor        | 构造函数      | 通   |                        |
| selector           | 选择函数      | 通   |                        |
| mutator            | 修改函数      | 通   |                        |
| sequence           | 序列          | Py   |                        |
| list               | 列表          | Py   |                        |
| tuple              | 元组          | Py   | 具名元组 named tuple   |
| dictionary         | 字典          | Py   |                        |
| mapping            | 映射          | Py   |                        |
| set                | 集合          | Py   |                        |
| string             | 字符串        | Py   |                        |
| index              | 索引          | Py   | 从 0 开始              |
| slice              | 切片          | Py   |                        |
| subscript          | 下标          | Py   | `items[3]` 中的 `3`    |
| linked list        | 链表          | 通   |                        |
| tree               | 树            | 通   |                        |
| node               | 节点          | 通   |                        |
| leaf               | 叶节点        | 通   |                        |
| range              | 范围          | Py   |                        |
| iterator           | 迭代器        | Py   |                        |
| iterable           | 可迭代对象    | Py   |                        |
| generator          | 生成器        | Py   |                        |
| generator function | 生成器函数    | Py   |                        |
| stream             | 流            | 通   |                        |
| hash / hashable    | 哈希 / 可哈希 | Py   |                        |
| list comprehension | 列表推导式    | Py   |                        |
| closure property   | 闭包性质      | SICP | 与「闭包 closure」不同 |

## 4. 对象与类

| English                 | 中文         | 来源 | 说明                   |
| ----------------------- | ------------ | ---- | ---------------------- |
| object                  | 对象         | Py   |                        |
| class                   | 类           | Py   |                        |
| instance                | 实例         | 通   |                        |
| attribute               | 属性         | Py   |                        |
| method                  | 方法         | Py   |                        |
| inheritance             | 继承         | 通   |                        |
| multiple inheritance    | 多重继承     | 通   |                        |
| message passing         | 消息传递     | SICP |                        |
| dispatch                | 分派         | SICP | 消息分派；类型分派见下 |
| interface               | 接口         | 通   |                        |
| abstract base class     | 抽象基类     | Py   |                        |
| method resolution order | 方法解析顺序 | Py   | MRO                    |

## 5. 解释器与求值模型

| English             | 中文          | 来源 | 说明                        |
| ------------------- | ------------- | ---- | --------------------------- |
| evaluator           | 求值器        | SICP |                             |
| parse / parser      | 解析 / 解析器 | 通   |                             |
| lexical analysis    | 词法分析      | Py   | 词法分析器 lexical analyzer |
| token               | 词元          | Py   |                             |
| syntax tree         | 语法树        | 通   |                             |
| expression tree     | 表达式树      | SICP |                             |
| environment model   | 环境模型      | SICP |                             |
| environment diagram | 环境图        | SICP |                             |
| evaluation rule     | 求值规则      | SICP |                             |
| applicative order   | 应用序        | SICP | 正则序 normal order         |
| lexical scoping     | 词法作用域    | 通   |                             |
| free variable       | 自由变量      | Py   |                             |
| bound variable      | 约束变量      | 通   |                             |
| tail recursion      | 尾递归        | 通   |                             |
| recursion depth     | 递归深度      | 通   |                             |
| stack               | 栈            | 通   |                             |

## 6. 数据处理与逻辑编程

| English                 | 中文       | 来源 | 说明     |
| ----------------------- | ---------- | ---- | -------- |
| SQL                     | SQL        | 通   | 保留原文 |
| table                   | 表         | 通   |          |
| join                    | 连接       | 通   |          |
| declarative programming | 声明式编程 | 通   |          |
| logic programming       | 逻辑编程   | 通   |          |
| fact                    | 事实       | 通   |          |
| rule                    | 规则       | 通   |          |
| query                   | 查询       | 通   |          |
| clause                  | 子句       | 通   |          |
| unification             | 合一       | 通   |          |
| pattern matching        | 模式匹配   | 通   |          |

## 7. 并发与分布式

| English          | 中文       | 来源 | 说明                                 |
| ---------------- | ---------- | ---- | ------------------------------------ |
| concurrency      | 并发       | Py   |                                      |
| parallelism      | 并行       | Py   | 与「并发」严格区分                   |
| thread           | 线程       | Py   |                                      |
| lock             | 锁         | Py   |                                      |
| deadlock         | 死锁       | Py   |                                      |
| race condition   | 竞争条件   | Py   |                                      |
| synchronization  | 同步化     | Py   | 同步化原语 synchronization primitive |
| atomic operation | 原子化操作 | Py   |                                      |
| barrier          | 屏障       | 通   |                                      |
| distributed      | 分布式     | 通   |                                      |
| message passing  | 消息传递   | 通   | 与 §4 同义                           |
| MapReduce        | MapReduce  | 通   | 保留原文                             |

## 8. 算法与效率

| English            | 中文   | 来源 | 说明 |
| ------------------ | ------ | ---- | ---- |
| order of growth    | 增长阶 | 通   |      |
| complexity         | 复杂度 | 通   |      |
| big-Theta notation | Θ 记号 | 通   |      |
| exponentiation     | 幂运算 | 通   |      |
| recursion tree     | 递归树 | 通   |      |

## 9. 其他

| English     | 中文                 | 来源 | 说明                     |
| ----------- | -------------------- | ---- | ------------------------ |
| exception   | 异常                 | Py   |                          |
| error       | 错误                 | 通   |                          |
| traceback   | 回溯                 | Py   | 堆栈回溯 stack backtrace |
| assert      | 断言                 | 通   |                          |
| debugging   | 调试                 | 通   |                          |
| test        | 测试                 | 通   |                          |
| duck typing | 鸭子类型             | Py   |                          |
| EAFP        | 求原谅比求许可更容易 | Py   |                          |
| LBYL        | 先看后跳             | Py   |                          |
| Pythonic    | Pythonic             | Py   | 保留原文                 |
| framework   | 框架                 | 通   | 与「帧 frame」区分       |

---

## 待统一 / 待补齐（校对时逐章处理）

以下为初步扫描得到的、需要在逐章校对中重点核对或补齐的项，**不作为最终结论**：

- `namespace` 命名空间：旧译基本未使用，多处以「环境」笼统带过，需在解释器相关章节引入。
- `free variable` 自由变量 / `bound variable` 约束变量：旧译未显式使用，需补齐。
- `predicate` 谓词：旧译极少，需确认用法。
- `scope` 作用域 与 `environment` 环境：需确保二者不被混用。
- `evaluate` 求值 与 `compute/calculation` 计算：需逐处核对，避免把「求值」写成「计算」。
- `parameter` 形参 与 `argument` 参数：需在涉及函数调用处核对区分。
