---
title: "Parameterized complexity to improve graph neural network heuristics"
supervisor: "Nello Blaser"
supervisor_url: "https://www.uib.no/en/persons/Nello.Blaser"
ects: "30/60"
tags: ["Topological Machine Learning", "Computational"]
status: "available"
---

Graph neural networks can be used as heuristics to solve NP-hard problems on graphs [1]. However, these heuristics do not necessarily make use of structural parameters of these problems. A notable exception is the Neural Trees for Learning on Graphs algorithm [2].
Consider vertex cover as an example problem. It is known that vertex cover is FPT when parameterized by treewidth. How can we use exploit this to improve graph neural network heuristics for vertex cover? More generally, how can different known parameters (cutwidth, bandwidth, etc.) be encoded in a graph neural network? And does doing so improve results for problems that are known to be FPT with respect to these parameters?

## References
[1] Li, Z., Chen, Q., & Koltun, V. (2018). Combinatorial Optimization with Graph Convolutional Networks and Guided Tree Search. Advances in Neural Information Processing Systems.
[2] Rajat Talak, Siyi Hu, Lisa Peng, Luca Carlone (2021). Neural Trees for Learning on Graphs. Advances in Neural Information Processing Systems. 