---
title: "Developing a Stress Granule Classifier"
supervisor: ["Sushma Grellscheid", "Carl Jones"]
supervisor_url: ["https://www.uib.no/en/persons/Sushma.Grellscheid", ""]
ects: "30/60"
tags: ["Deep Learning", "Life Sciences", "Applied"]
status: "available"
---
To carry out the multitude of functions "expected" from a human cell, the cell employs a strategy of division of labour, whereby sub-cellular organelles carry out distinct functions. Thus we traditionally understand organelles as distinct units defined both functionally and physically with a distinct shape and size range. More recently a new class of organelles has been discovered that are assembled and dissolved on demand and are composed of liquid droplets or "granules". Granules show many properties characteristic of liquids, such as flow and wetting, but they can also assume many shapes and indeed also fluctuate in shape. One such liquid organelle is a stress granule (SG).

Stress granules are pro-survival organelles that assemble in response to cellular stress and are important in cancer and neurodegenerative diseases like Alzheimer's. They are liquid or gel-like and can assume varying sizes and shapes depending on their cellular composition.

In a given experiment we are able to image the entire cell over a time series of 1000 frames, from which we extract a rough estimation of the size and shape of each granule. Our current method is susceptible to noise and a granule may be falsely rejected if the boundary is drawn poorly in a small majority of frames. Ideally, we would also like to identify potentially interesting features, such as voids, in the accepted granules.

We are interested in applying a machine learning approach to develop a descriptor for a "classic" granule and furthermore classify them into different functional groups based on disease status of the cell. This method would be applied across thousands of granules imaged from control and disease cells. We are a multi-disciplinary group consisting of biologists, computational scientists and physicists.
