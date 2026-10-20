---
title: "Lake Volume from Shoreline Shape"
supervisor: "Nello Blaser"
supervisor_url: "https://www.uib.no/en/persons/Nello.Blaser"
ects: "30/60"
tags: ["Geometric Deep Learning", "Applied"]
status: "available"
---
Lake depth and volume are unknown for most of the world's roughly 1.4 million lakes larger than 10 ha. Global datasets such as HydroLAKES [1] therefore fill them in with statistical models based mainly on surface area and the slope of the surrounding terrain, treating the shape of the shoreline at most through simple scalar indices. This project asks how much information the full shoreline contour carries about lake volume, or equivalently mean depth, beyond what surface area alone explains. We will train RotaTouille [2], a deep learning framework for closed planar curves that is equivariant to rotations and to cyclic shifts of the contour's starting point. Its invariant variant is a natural fit, since a lake's volume does not depend on how the outline is oriented or where its parametrization begins. Models will be trained on HydroLAKES polygons matched to measured depths and volumes, for example from LAGOS [3] and national lake surveys, rather than on the dataset's modelled values. We will compare a contour-only model against an area-only baseline, and a terrain-based model [3, 4] against the same model with contour features added, to measure the depth information in shape alone and on top of the best existing predictors. 

## References

[1] Mathis Loïc Messager, Bernhard Lehner, Günther Grill, Irena Nedeva, and Oliver Schmitt. Estimating the volume and age of water stored in global lakes using a geo-statistical approach. *Nature Communications*, 7:13603, 2016. https://doi.org/10.1038/ncomms13603

[2] Odin Hoff Gardaa and Nello Blaser. RotaTouille: Rotation equivariant deep learning for contours. In *The Fourth Learning on Graphs Conference*, 2025. https://openreview.net/forum?id=VbCLyz3uW7

[3] Samantha K. Oliver, Patricia A. Soranno, C. Emi Fergus, Tyler Wagner, Luke A. Winslow, Caren E. Scott, Katherine E. Webster, John A. Downing, and Emily H. Stanley. Prediction of lake depth across a 17-state region in the United States. *Inland Waters*, 6(3):314–324, 2016. https://pubs.usgs.gov/publication/70193676

[4] Jeffrey W. Hollister, W. Bryan Milstead, and M. Andrea Urrutia. Predicting maximum lake depth from surrounding topography. *PLoS ONE*, 6(9):e25764, 2011. https://doi.org/10.1371/journal.pone.0025764
