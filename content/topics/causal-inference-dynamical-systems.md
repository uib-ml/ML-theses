---
title: "Causal inference for dynamical systems"
supervisor: "Tom Michoel"
supervisor_url: "https://www4.uib.no/en/find-employees/Tom.Luk.R.Michoel"
ects: "30/60"
tags: ["Causality", "Probabilistic Modelling", "Theoretical"]
status: "available"
---
In causal inference, the observational distribution of a set of variables of interest is usually modelled by a set of structural equations on a directed acyclic graph representing the causal interactions in the system. However, in many systems, the assumption of acyclicity is too restrictive due to the presence of feedback mechanisms. In such cases it is more natural to assume that the observational distribution is the stationary distribution of a stochastic dynamical system on a potentially cyclic graph of causal interactions.

So far this class of causal models has only been studied for linear dynamical systems where the stationary distribution is a multivariate normal distribution, and even in this case most questions around causal identification and causal discovery remain unanswered. Moreover, in many situations, particularly in biology, there is a need to work with discrete random variables representing molecule counts. The aim of this project is to study both theoretically and empirically whether causal effects can be identified and causal interactions discovered from the stationary distribution of count-based stochastic processes in the simplest case where the number of molecules of a given species can only increase or decrease one at a time (so-called one-step processes), and apply newly found insights and learning algorithms to reconstruct causal gene networks from single-cell gene expression data.

## See also

- Varando G, Hansen NR. [Graphical continuous Lyapunov models](https://proceedings.mlr.press/v124/varando20a.html).
- L Wang et al. [Dictys: dynamic gene regulatory network dissects developmental continuum with single-cell multiomics](https://www.biorxiv.org/content/10.1101/2022.09.14.508036v1.abstract).
- Lorch L, Krause A, Schölkopf B. [Causal Modeling with Stationary Diffusions](https://proceedings.mlr.press/v238/lorch24a).
