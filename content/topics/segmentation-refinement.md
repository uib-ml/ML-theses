---
title: "Segmentation refinement"
supervisor: ["Preben Bentdal", "Nello Blaser"]
supervisor_url: ["https://www4.uib.no/finn-ansatte/preben-johnsen.bentdal", "https://www4.uib.no/en/find-employees/nello.blaser"]
ects: "30/60"
tags: ["Deep Learning", "Computational"]
status: "available"
---
Neural network predictions do not necessarily satisfy known constraints of a problem. Such constraints can describe relationships between predictions or the shape of an object. This project explores how to incorporate this knowledge as soft or hard constraints on a models outputs. Here you will develop a refinement step for an existing segmentation model. This step will use the models predictions and prior knowledge about the target structure, with the aim of improving the segmentation without retraining the network [1]. Depending on your interests, we can begin with spatial regularization [2] and then explore more specific constraints on the shape of the segmentation [3].

Medical imaging is one possible starting point. Examples include segmenting skin lesions, the optic disc and cup in retinal images or the heart muscle in MRI scans.  You are also welcome to propose an application of your own in another field.

References:
[1] P. J. Bentdal, N. Blaser and X.-C. Tai. Propagate, Then Sharpen: Post-Hoc Refinement of Frozen Node Classifiers. 2026
https://arxiv.org/abs/2609.35080

[2] X.-C. Tai, H. Liu and R. Chan. PottsMGNet: A Mathematical Explanation of Encoder-Decoder Based Neural Networks.  SIAM Journal on Imaging Sciences 2024
https://doi.org/10.1137/23M1586355

[3] J. Liu, K. Zhang, X.-C. Tai and S. Luo. Convex Shape Prior for Deep Convolution Neural Network-Based Image Segmentation. Journal of Mathematical Imaging and Vision, 2025. 
https://doi.org/10.1007/s10851-025-01274-6