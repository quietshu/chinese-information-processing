丁戍，13307130299

### 使用古腾堡语料库模块处理austen-emma.txt。这本书中有多少个词？多少个不同的词？

代码：ex1.py

词数：192427

不重复词数：7811

### 写一个程序，输出一个文本中50 个最常见的Bigram，忽略包含stopword的bigram。

代码：ex2.py

### 改进随机文本生成程序，选择特定的文体，如：布朗语料库中的一部分或者《创世纪》或者古腾堡语料库中的文本。在此语料上训练一个模型，产生随机文本。可能要实验不同的起始单词。文本的可理解性如何？讨论这种方法产生随机文本的长处和短处。

代码：ex3.py，使用了 genesis 语料库

为了避免死循环（the land of the land of...），在每次生成下一个单词的时候，随机在 K 个可能的连接词里挑出一个来。可以生成类似下面的结果：

A  man , that I have given thy servant Jacob said , and the LORD , that I pray for he had made a son , I have I pray thee , and said to him ; And he had done this place . Then Jacob ' s son

优点：随机，不会有固定结果，不会陷入死循环

劣势：依然不能具有句子__含义__，只是根据 bigram 生成了 bigram 串
