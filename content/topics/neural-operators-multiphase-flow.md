---
title: "Neural operators for multiphase flow and geoscience"
supervisor: "Berent Å.S. Lunde"
supervisor_url: "https://www4.uib.no/finn-ansatte/Berent.Ånund.Strømnes.Lunde"
ects: "30/60"
tags: ["Geometric Deep Learning", "Computational", "Applied"]
status: "available"
---
Neural operators learn mappings between infinite dimensional spaces [1]. The main application is to learn surrogate maps for the solution operator of PDEs. The benefit is typically in terms of speed of evaluation, at the cost of some accuracy. Speed is important, as numerically integrating PDEs for real applications is extremely computationally expensive. The truthfulness of the solution is, of course, also important. Implementation and evaluation of trade-offs in neural operators for multiphase flow [2] and in neural fields for geosciences [3] to see if this qualifies for industrial AI is somewhat an open question. Applications may be in exploration, history matching (data assimilation), or forecasting.

## References

[1] Nikola Kovachki, Zongyi Li, Burigede Liu, Kamyar Azizzadenesheli, Kaushik Bhattacharya, Andrew Stuart, and Anima Anandkumar. Neural operator: Learning maps between function spaces with applications to PDEs. Journal of Machine Learning Research, 24(89):1–97, 2023.

[2] Gege Wen, Zongyi Li, Kamyar Azizzadenesheli, Anima Anandkumar, and Sally M. Benson. U-FNO — an enhanced Fourier neural operator-based deep-learning model for multiphase flow. Advances in Water Resources, 163:104180, 2022.

[3] Akshay Vijay Kamath, Samuel T. Thiele, Marie Moulard, Lachlan Grose, Raimon Tolosana-Delgado, Michael Hillier, Florian Wellmann, and Richard Gloaguen. Curlew 1.0: Spatio-temporal implicit geological modelling with neural fields in Python. 2025.
