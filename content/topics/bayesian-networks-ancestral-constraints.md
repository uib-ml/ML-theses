---
title: "Learning Bayesian networks with ancestral constraints"
supervisor: "Pekka Parviainen"
supervisor_url: "https://www4.uib.no/en/find-employees/Pekka.Parviainen"
ects: "30/60"
tags: ["Bayesian networks", "Computational"]
status: "available"
---
Bayesian networks are probabilistic models that are used to represent multivariate distributions. The core of a Bayesian network is its structure, a directed acyclic graph (DAG), that expresses conditional independencies between variables.

Typically, the structure is learned from data. The problem is NP-hard and thus exact algorithms do not scale up, and one often resorts to heuristics that do not give any quality guarantees.

In a recent paper [1], we studied the complexity of learning Bayesian networks under ancestral constraints (for example, when a partial order between variables is known). However, the paper is fully theoretical, and we do not know whether the proposed algorithms are useful in practice.

**Task:** Implement some of the algorithms and assess their practical performance experimentally.

## Reference

[1] Juha Harviainen & Pekka Parviainen: [On Tractability of Learning Bayesian Networks with Ancestral Constraints](https://arxiv.org/pdf/2509.05002). AISTATS 2025.
