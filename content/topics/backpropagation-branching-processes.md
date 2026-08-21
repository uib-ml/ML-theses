---
title: "Backpropagation in branching stochastic processes"
supervisor: "Tom Michoel"
supervisor_url: "https://www4.uib.no/en/find-employees/Tom.Luk.R.Michoel"
ects: "30/60"
tags: ["Probabilistic Modelling", "Life Sciences", "Theoretical"]
status: "available"
---
Branching stochastic processes are mathematical models for self-replicating entities in biology (which could be cells, individuals in a population, or distinct species depending on the context). In such processes individuals have one or more internal degrees of freedom whose dynamics is described by a stochastic differential equation (SDE). After a certain lifetime, an individual dies and splits into multiple independent offspring individuals. This process is repeated indefinitely, producing a collection of N(t) individuals at time t.

To fit such models to data, researchers have traditionally relied on mathematically tractable, but biologically simplistic assumptions about the underlying dynamics. However, the emergence of "scientific machine learning" (SciML), which combines principles from machine learning (composability, automatic differentiation, neural nets as universal function approximators, etc.) with classical dynamical systems modelling, is expanding the traditional notion of what it means for a model to be "tractable". A candidate idea for applying SciML to learn more realistic branching processes with non-linear dynamics would be to combine backpropagation through the lineage tree to infer the hidden states of extinct ancestors with forward simulation of neural SDEs. The aim of this project is to develop the theoretical basis for this and related ideas, and use the new models and algorithms to learn kinetic parameters and causal interactions from clonal gene expression data.

## See also

- [SciML](https://sciml.ai/)
- [BranchingProcesses.jl](https://github.com/tmichoel/BranchingProcesses.jl)
