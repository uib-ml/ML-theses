---
title: "Estimating the number of modes of an unknown function"
supervisor: ["Pekka Parviainen", "Nello Blaser"]
supervisor_url: ["https://www.uib.no/en/persons/Pekka.Parviainen", "https://www.uib.no/en/persons/Nello.Blaser"]
ects: "30/60"
tags: ["Topological Machine Learning", "Probabilistic Modelling", "Theoretical"]
status: "available"
---
Mode seeking considers estimating the number of local maxima of a function f. Sometimes one can find modes by, e.g., looking for points where the derivative of the function is zero. However, often the function is unknown and we have only access to some (possibly noisy) values of the function.

In topological data analysis, we can analyze topological structures using persistent homologies. For 1-dimensional signals, this can translate into looking at the birth/death persistence diagram, i.e. the birth and death of connected topological components as we expand the space around each point where we have observed our function. These observations turn out to be closely related to the modes (local maxima) of the function. A recent paper [1] proposed an efficient method for mode seeking.

In this project, the task is to extend the ideas from [1] to get a probabilistic estimate on the number of modes. To this end, one has to use probabilistic methods such as Gaussian processes.

## Reference

[1] U. Bauer, A. Munk, H. Sieling, and M. Wardetzky. Persistence barcodes versus Kolmogorov signatures: Detecting modes of one-dimensional signals. Foundations of Computational Mathematics 17:1–33, 2017.
