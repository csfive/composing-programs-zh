# 阶段1 模拟器

:::info
译者：

来源：[Hog - Phase 1: Simulator](https://inst.eecs.berkeley.edu/~cs61a/fa20/proj/hog/#phase-1-simulator)

对应：Project 01 -  Phase 1
:::

在第一阶段，你会为贪吃猪游戏开发一个模拟器。

## 问题0

`dice.py` 文件表示使用使用非纯，非零参数函数的骰子。这些函数都是非纯函数，因为它们在每次调用时都可能有不同的返回值。`dice.py` 的文档描述了项目中使用的两种不同类型的骰子：

- 骰子可以是公平合理的，这意味着它们以相等的概率产生每个可能的结果。示例： `six_sided` 。

- 对于使用骰子的测试函数，确定性测试骰子总是循环通过作为参数传递给 `make_test_dice` 函数的固定序列的值。

在编写任何代码之前，请阅读 `dice.py` 文件，并通过解锁以下测试来检查你的理解。

```shell
python3 ok -q 00 -u
```

这将显示如下所示的提示：

```
=====================================================================
Assignment: Project 1: Hog
Ok, version v1.5.2
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 0 > Suite 1 > Case 1
(cases remaining: 1)

>>> test_dice = make_test_dice(4, 1, 2)
>>> test_dice()
?
```

你应该键入你期望的输出。要做到这一点，你需要首先根据上面的描述弄清楚 `test_dice` 将做什么。

**你可以通过键入 `exit()` 退出解锁程序。已知在 `Windows` 上键入 `Ctrl-C` 退出解锁程序会导致问题，所以别这样做。**

<details>
    <summary>提示视频</summary>
    <h3>问题 0 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/skF68ta4-OY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>

> 译者注：有条件的同学观看时，可以打开翻译字幕
</details>

## 问题1

在 `hog.py` 中实现 `roll_dice` 函数。它有两个参数：一个名为 `num_rolls` 的正整数，它给出要掷的骰子数，和一个 `dice` 函数。它返回在一个回合中掷骰子的次数所得到的点数：结果的总和或`1`（狼吞虎咽规则）。

> 狼吞虎咽规则：

- **狼吞虎咽**规则。如果任何骰子的结果是`1`，则当前玩家的回合得分为`1`。

    <details>
        <summary>示例</summary>

    - 示例 1：当前玩家掷骰子 `7` 个，其中 `5` 个是 `1`。他们在本回合得 `1` 分。

    - 示例 2：当前玩家掷出 `4` 个骰子，全部为 `3`。由于没有触发狼吞虎咽规则，他们在本回合得了 `12` 分。

    </details>


要获得掷骰子的单个结果，请调用 `dice()` 。你应该在 `roll_dice` 的函数体中明确地调用 `dice()` `num_rolls` 次。**记住，即使在掷骰过程中触发狼吞虎咽规则，也要完全地调用 `dice()` 次。**通过这种方式，你可以正确地模拟将所有骰子一起掷骰。

**理解这个问题：**

在编写任何代码之前，请解锁测试以验证你对问题的理解。**注意：在解锁相应问题的测试用例之前，你将无法使用`OK`测试代码。**

```shell
python3 ok -q 01 -u
```

**编写代码并检查你的工作**：

解锁完成后，开始实现你的解决方案。你可以通过以下方式检查你的正确性：

```shell
python3 ok -q 01
```

<details>
    <summary>提示视频</summary>
    <h3>问题 1 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/cDBAo6OLTyA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>
</details>

<details>
    <summary>调试小贴士</summary>
    
如果测试没有通过，就该进行调试了。你可以直接使用`Python`来观察你函数的行为。首先，启动`Python`解释器并加载 `hog.py` 文件。

```shell
python3 -i hog.py
```

然后，你可以在任意数量的骰子上调用你的 `roll_dice` 函数。 `roll_dice` 函数有一个[默认参数值](../../sicp-python/ch1/1-4#_1-4-2-%E5%8F%82%E6%95%B0%E9%BB%98%E8%AE%A4%E5%80%BC)为 `dice` ，这是一个随机的六面骰子函数。因此，下面对 `roll_dice` 的调用模拟了滚动四个公平合理的六面骰子。

```
>>> roll_dice(4)
```

你会发现，每次调用前面的表达式时，结果都可能不同，因为它模拟的是随机掷骰子。你也可以使用预先确定骰子结果的测试骰子。例如，当你知道骰子会出现`3`和`4`时，滚动两次应该会给出总和为`7`的结果。

```
>>> fixed_dice = make_test_dice(3, 4)
>>> roll_dice(2, fixed_dice)
7
```

> 在大多数系统中，可以通过按向上箭头键，然后按Enter或Return键来再次计算同一表达式。为了计算以前的命令，可以重复按向上箭头。
> 如果发现问题，需要更改 `hog.py` 文件，保存它，退出Python，再次启动Python，然后开始计算表达式。按向上箭头可以让你访问以前的表达式，即使在重新启动Python之后也是如此。

继续调试代码并运行 `ok` 测试，直到它们全部通过。你应该按照相同的过程来理解问题、实现解决方案、测试和调试此项目中的所有问题。

> 还有一个调试技巧：若要在 `ok` 测试失败时自动启动交互式解释器，请使用 `-i` 。例如， `python3 ok -q 01 -i` 将运行问题1 的测试，然后在测试失败时启动一个加载 `hog.py` 的交互式解释器。

</details>

## 问题2

实现无偿培根 (`free_bacon`) ，取对手当前的得分 (`score`) 并返回掷0骰子所获得的点数。假设得分 (`score`) 小于100。

> 无偿培根(`Free Bacon`)规则：

- **无偿培根**。选择掷 `0` 骰子的玩家得分 `k+3` 分，其中 `k` 是小数点后 `pi` 的 `n` 位数字， `n` 是对手的总分。作为特例，如果对手的分数是 `n = 0` ，那么 `k = 3` （`pi`小数点前的数字）。

    <details>
        <summary>示例</summary>

    - 示例 1：对手得分为 `0`，当前玩家掷骰子为 `0`。当前玩家将获得 `3 + 3 = 6` 分。
    - 示例 2：对手得分为 `1`，当前玩家掷骰子为 `0`。当前玩家将获得 `1 + 3 = 4` 分。
    - 示例 3：对手得分为 `2`，当前玩家掷骰子为 `0`。当前玩家将获得 `4 + 3 = 7` 分。
    - 示例 4：对手得分为 `42`，当前玩家掷骰子为 `0`。当前玩家将获得 `9 + 3 = 12` 分。

    </details>

所提供的代码包括作为整数的 `FIRST_101_DIGITS_OF_PI` 常量，其在本地存储为 `pi` 。解决这个问题的一种方法是修剪 `pi` 直到它只有 `score+1` 位，然后返回比 `pi` 最后一位多`3`位。

**提示**：如果 `n` 小于 `pow(10, k+1)` 但大于或等于 `pow(10, k)`, 那么整数 `n` 有 `k+1` 位。

你可以用任何你想要的方式来实现这个功能。你不是非得遵循此推荐的方法或使用所提供的起始代码。但是，**你不能在你的实现中使用for循环或方括号 `[ ]`，因为我们还没有讲过这些内容。**

在编写任何代码之前，请解锁测试以验证你对问题的理解。

```shell
python3 ok -q 02 -u
```

解锁完成后，开始实施解决方案。你可以通过以下方式检查你的正确性：

```shell
python3 ok -q 02
```

你还可以通过在终端中输入 `python3 -i hog.py` ，然后使用各种输入调用 `free_bacon` 来交互式地测试 `free_bacon` 。

<details>
    <summary>提示视频</summary>
    <h3>问题 2 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/s4hM5HqMA2c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>
</details>

## 问题3

实现 `take_turn` 函数，该函数返回给定的骰子(`dice`) 滚动 `num_rolls` 次获得的一个回合的分数。

如果可以的话，你的 `take_turn` 实现应该都调用 `roll_dice` 和 `free_bacon` 这两个函数。

在编写任何代码之前，请解锁测试以验证你对问题的理解。

```shell
python3 ok -q 03 -u
```

解锁完成后，开始实施解决方案。你可以通过以下方式检查你的正确性：

```shell
python3 ok -q 03
```

<details>
    <summary>提示视频</summary>
    <h3>问题 3 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/Rg_MMYioXEM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>
</details>

## 问题4a

实现 `swine_align` ，它获取当前玩家和对手的分数，并返回当前玩家是否会由于猪之看齐规则而进行另一回合。注意：在一个分数为`0`的特殊情况下，返回 `False` 。

> 猪之看齐规则：

- 猪之看齐规则。回合的分数添加到当前玩家的分数后，如果两个玩家的分数均为正数，并且当前玩家分数的最大公约数（`GCD`）和对手的分数至少为 `10`，则再进行一次回合。

    <details>
        <summary>示例</summary>

    - 示例 1：在第一个玩家的回合结束时，玩家的分数为`8`和`36`。两个分数的最大公约数是`4`，所以第一个玩家不会因为猪之看齐规则再进行另一回合。
    - 示例 2：在第一个玩家的回合结束时，玩家的分数为`20`和`30`。两个分数的最大公约数是`10`，所以第一个玩家进行一个额外的回合。
    - 示例 3：在第一个玩家的回合结束时，玩家的得分分别为`24`和`36`。分数的最大公约数是`12`，所以第一个玩家需要一个额外的回合。第一个玩家掷出`12`，现在比分是`36`和`36`。分数的最大公约数是`36`，所以第一个玩家再进行另一回合。
    - 示例 4：在第一个玩家的回合结束时，玩家的分数为`15`和`0`。猪之看齐规则只适用于当两个玩家的分数都是正数（不是`0`），所以第一个玩家不会由于猪之看齐规则再进行另一回合。

    </details>

> 提示：当且仅当 **n** 是 **d** 的倍数, 表达式 **n % d == 0** 为真。

在编写任何代码之前，请解锁测试以验证你对问题的理解。

```shell
python3 ok -q 04a -u
```

解锁完成后，开始实施解决方案。你可以通过以下方式检查你的正确性：

```shell
python3 ok -q 04a
```

<details>
    <summary>提示视频</summary>
    <h3>问题 4a 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/tCHw2Dn8Ruc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>
</details>

## 问题4b

实现 `pig_pass` ，该函数获取当前玩家和对手的分数，并返回当前玩家是否会因猪之突破规则（Pig Pass）而将进行一个额外的回合。

> 猪之突破规则：

- **猪之突破（Pig Pass）**。在回合的分数被添加到当前玩家的分数之后，如果当前玩家的分数低于对手的分数并且它们之间的差小于`3`，则当前玩家进行另一回合。

    <details>
        <summary>示例</summary>

    - 示例 1：在第一个玩家的回合结束时，对手得分为`10`，当前玩家得分为`11`。由于`11 > 10`，当前玩家不会由于猪之突破规则而再进行另一回合。
    - 示例 2：在第一个玩家的回合结束时，对手得分为`10`，当前玩家得分为`7`。因为 `10 - 7 = 3 >= 3` ，当前玩家不会因猪之突破规则而再进行另一回合。
    - 示例 3：在第一个玩家的回合结束时，对手得分为`30`，当前玩家得分为`28`。因为`30 - 28 = 2 < 3`，当前玩家将进行另一回合。
    - 示例 4：在第一个玩家的回合结束时，对手得分为`30`，当前玩家得分为`28`。与示例 3一样，当前玩家进行另一回合。如果当前玩家掷出`1`，现在得分为`29`，再次触发猪之突破规则，当前玩家还另外再进行一回合。

    </details>

在编写任何代码之前，请解锁测试以验证你对问题的理解。

```shell
python3 ok -q 04b -u
```

解锁完成后，开始实施解决方案。你可以通过以下方式检查你的正确性：

```shell
python3 ok -q 04b
```

<details>
    <summary>提示视频</summary>
    <h3>问题 4b 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/oYDbmJvun_M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>
</details>

## 问题5

实现 `play` 函数，它模拟了一个完整的贪吃猪游戏。玩家轮流掷骰子，直到其中一个玩家达到目标(`goal`)分数。

为了确定每回合掷出多少骰子，每个玩家使用各自的策略（玩家`0`使用 `strategy0` ，玩家`1`使用 `strategy1` ）。一个策略(`strategy`)是一个函数，它在给定玩家的分数和对手的分数的情况下，返回当前玩家将在当前回合中掷出的骰子数。**每回合只能调用一次策略函数（否则会破坏`GUI`）。**不要担心策略函数的实现。你会在阶段`3`做这些。

当游戏结束时， `play` 返回两个玩家的最终总得分，玩家`0`的得分在前，玩家`1`的得分在后。

提示：

- 你应该调用你已经实现的函数。
- 使用三个参数调用 `take_turn` 。每回合只调用一次 `take_turn` 。
- 调用 `extra_turn` 以确定当前玩家是否将进行另一轮，无论是由于猪之看齐规则还是猪之突破规则。
- 你可以通过调用提供的函数 `other` 来获取其他玩家的号码（`0`或`1`）。
- 现在可以忽略 `play` 函数的 `say` 参数。你将在项目的阶段`2`中使用它。

规则说明：一个玩家可以进行两次以上的连续回合。例如，如果他们第一回合后的分数是`10`对`20`，他们会因为猪之看齐规则而再次前进。如果他们得了`8`分，现在比分是`18`比`20`，他们会因为猪之突破规则而第三次进行回合。如果他们得到`12`分，现在比分是`30`比`20`，他们第四次连续进行回合。

注：猪之看齐和猪之突破规则通过在数学上不可能同时激活。

在编写任何代码之前，请解锁测试以验证你对问题的理解。

```shell
python3 ok -q 05 -u
```

解锁完成后，开始实施解决方案。你可以通过以下方式检查你的正确性：

```shell
python3 ok -q 05
```

一旦你完成了，你将能够玩这个游戏的图形版本。我们提供了一个名为 `hog_gui.py` 的文件，你可以从终端运行它：

```shell
python3 hog_gui.py
```

`GUI`依赖于你的实现，因此如果你的代码中有任何错误，它们将反映在`GUI`中。这意味着你还可以将`GUI`用作调试工具；不过，最好先做测试。

注意：贪吃猪图形界面现在可以工作！要获得更新版本，请从此网页重新下载`zip`文件，并从新副本上的 `hog_gui.py` 和 `gui_files/` 拖出。

检查以确保你完成了阶段`1`中的所有问题：

```
python3 ok --score
```

<details>
    <summary>提示视频</summary>
    <h3>问题 5 提示视频</h3>
    <span>这个视频为解决贪吃猪这个阶段的问题提供了一些有用的指导。</span><br><br>
    <iframe width="560" height="315" src="https://youtube.com/embed/P2UhBrv-bSM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" data-immersive-translate-effect="1"></iframe>
</details>

恭喜！你已经完成了这个项目的阶段 `1` 部分！
