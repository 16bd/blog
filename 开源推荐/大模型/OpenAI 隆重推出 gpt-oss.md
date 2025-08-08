# 隆重推出 gpt-oss

Gpt-oss-120b 和 gpt-oss-20b 推动了开放推理模型领域的技术边界

![](https://mmbiz.qpic.cn/mmbiz_png/Wkpr3rA9wF327t7TSmA3ka6YrAHhlQAxCeoq6NWTwVkYOvW4YagWdxicshg7chYxuSleGoJs6VoER2gjaDurcsg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1)
## 简介

我们发布了 gpt-oss-120b 和 gpt-oss-20b——两款性能卓越的开放轻量级语言模型，可在低成本下实现强大的实际应用性能。这些模型在灵活的 Apache 2.0 许可证下提供，与同等规模的开放模型相比，在推理任务中表现更优，展现出强大的工具使用能力，并针对在消费级硬件上高效部署进行了优化。它们通过强化学习与 OpenAI 最先进内部模型（包括 o3 及其他前沿系统）所启发的技术相结合进行训练。

Gpt-oss-120b 模型在核心推理基准测试中与 OpenAI o4-mini 模型几乎持平，同时能在单个 80GB GPU 上高效运行。Gpt-oss-20b 模型在常见基准测试中与 OpenAI o3‑mini 模型取得类似结果，且可在仅配备 16GB 内存的边缘设备上运行，使其成为设备端应用、本地推理或无需昂贵基础设施的快速迭代的理想选择。这两个模型在工具使用、少样本函数调用、CoT推理（如在 Tau-Bench 智能体评估套件中的结果所示）以及 HealthBench 测试中表现强劲（甚至超越了 OpenAI o1 和 GPT‑4o 等专有模型）。

这些模型与我们的[回复 API⁠（在新窗口中打开）](https://platform.openai.com/docs/api-reference/responses) 兼容，并专为在智能体工作流中使用而设计，具备卓越的指令执行能力、工具使用能力（如网页搜索或 Python 代码执行）以及推理能力——包括根据任务需求调整推理力度的能力，尤其适用于无需复杂推理且/或需要极低延迟最终输出的任务。它们完全可定制，提供完整的思维链 (CoT)，并支持[结构化输出⁠（在新窗口中打开）](https://platform.openai.com/docs/guides/structured-outputs?api-mode=responses)。

安全是我们发布所有模型时秉持的核心原则，对于开放模型而言尤为重要。除了对模型进行全面的安全培训和评估外，我们还通过在我们的[《防范准备框架》⁠（在新窗口中打开）](https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf)下测试一个经过对抗性微调的 gpt-oss-120b 版本，引入了额外的评估层。Gpt-oss 模型在内部安全基准测试中的表现与我们的前沿模型相当，为开发者提供了与我们近期专有模型相同的安全标准。我们将在研究论文和模型卡片中分享该工作的成果及更多细节。我们的方法论已由外部专家审核，标志着在为开源模型设定新安全标准方面迈出了重要一步。

我们也与早期合作伙伴如 [AI Sweden⁠（在新窗口中打开）](https://www.ai.se/en)、[Orange⁠（在新窗口中打开）](https://www.orange.com/en) 和 [Snowflake⁠（在新窗口中打开）](https://www.snowflake.com/en/) 合作，探索开放模型的实际应用场景，包括为数据安全在本地部署这些模型，以及在专用数据集上进行微调。我们很高兴能提供这些业界领先的开放模型，赋能所有人——从个人开发者到大型企业再到政府机构——在自有基础设施上运行并定制 AI。结合我们 API 中提供的模型，开发者可以根据需求选择所需的性能、成本和延迟，以支持 AI 工作流程。

## 预训练与模型架构

gpt-oss 模型采用我们最先进的预训练和后训练技术进行训练，特别注重推理能力、效率以及在各种部署环境中的实际应用性。虽然我们已经公开发布了包括 [Whisper⁠](https://openai.com/zh-Hans-CN/index/whisper/) 和 [CLIP⁠](https://openai.com/index/clip/) 在内的其他模型，但 gpt-oss 模型是我们自 GPT‑2[1]以来的首个开放大型语言模型。

每个模型都是一个 Transformer，它利用专家混合 (MoE[2]) 来减少处理输入所需的活跃参数数量。Gpt-oss-120b 每个令牌激活 51 亿个参数，而 gpt-oss-20b 激活 36 亿个参数。这两个模型的总参数数分别为 1,170 亿和 210 亿。这些模型采用交替的密集和局部带状稀疏注意力模式，与 GPT‑3 [3] 类似。为了提高推理和内存效率，这些模型还使用分组多查询注意力，分组大小为 8。我们使用旋转位置嵌入 (RoPE[4]) 进行位置编码，并原生支持长达 128k 的上下文长度。

我们使用了一个高质量、主要为英文的纯文本数据集对模型进行了训练，重点关注 STEM、编程和通用知识领域。我们使用了 OpenAI o4-mini 和 GPT‑4o 所用令牌化器的超集进行数据令牌化，即 ‘o200k_harmony'，该令牌化器我们今日也一并开源。

有关我们模型架构和训练的更多信息，请阅读模型卡片。

## 后训练

模型采用了与 O4-mini 类似的训练流程进行后训练，包括监督式微调阶段和高计算量强化学习阶段。我们的目标是使模型符合[《OpenAI 模型规范》⁠（在新窗口中打开）](https://cdn.openai.com/spec/model-spec-2024-05-08.html)，并使其在生成答案前能够应用 [CoT 推理⁠](https://openai.com/zh-Hans-CN/index/learning-to-reason-with-llms/)和工具使用能力。通过采用与我们最先进的专有推理模型相同的技术，这些模型在训练后展现出卓越的性能。

与 OpenAI o 系列推理模型在 API 中的实现类似，这两个开放模型支持三种推理强度——低、中、高——它们在延迟与性能之间进行权衡。开发人员可以通过在系统消息中输入一句话，轻松设置推理难度。

#### 评估

我们对 gpt-oss-120b 和 gpt-oss-20b 在标准学术基准测试中进行了评估，以衡量其在编程、竞赛数学、医疗和智能体工具使用方面的能力，并与其他 OpenAI 推理模型（包括 o3、o3‑mini 和 o4-mini）进行了比较。

Gpt-oss-120b 在竞赛编程 (Codeforces)、通用问题解决 (MMLU 和 HLE) 以及工具调用 (TauBench) 方面表现优于 OpenAI o3‑mini，并与 OpenAI o4-mini 持平或超越其性能。此外，它在健康相关查询 ([HealthBench⁠](https://openai.com/index/healthbench/)) 和竞赛数学 (AIME 2024 和 2025) 方面表现得比 o4-mini 更好。尽管 gpt-oss-20b 的规模较小，但在这些相同的评估中，它与 OpenAI o3‑mini 持平或超越后者，甚至在竞赛数学和医疗方面表现得更好。

