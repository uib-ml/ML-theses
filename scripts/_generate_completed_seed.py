#!/usr/bin/env python3
"""One-off helper used to seed content/completed/*.md from the pasted list of
completed theses. Not needed for normal site maintenance and safe to delete
after the initial import -- new completed theses should just be added as new
markdown files directly (see README.md)."""
import re
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "content", "completed")

# (year, student, title, link_or_None)
ENTRIES = [
    (2025, "Sander André Berg Marx", "Learning acoustic target classification from simulation", None),

    (2024, "Endre Sølvberg Tønnessen", "Boundary Extraction of Stress Granules with Semantic Image Segmentation", "https://hdl.handle.net/11250/3170113"),
    (2024, "Marius Binner", "Analyzing indirect object identification circuits in TinyStories-8M", None),
    (2024, "Henrik Sandve Aase", "Application of Machine Learning for Prediction of Atmospheric Attenuation Effects on High Frequency Satellite Communications in Near Future", None),
    (2024, "Sander Meland", "Developing a Deep Reinforcement Learning Framework For Aggregators In The Norwegian Reserve Markets", "https://hdl.handle.net/11250/3137553"),
    (2024, "Cristobal Gimenez Devis", "Stem cell identification via RNA sequencing in breast cancer", "https://hdl.handle.net/11250/3145869"),
    (2024, "Sondre Bergsvåg Risanger", "A Benchmarking Suite for Persistent Homology", "https://hdl.handle.net/11250/3145870"),
    (2024, "Edvards Zakovskis", "Multitask variational autoencoders", "https://hdl.handle.net/11250/3142974"),
    (2024, "Jonatan Berg Romundgard", "Enhancing weather forecasts using deep learning methods", None),
    (2024, "Jørgen Mjaaseth", "Exploring Methods for Quantifying Expressibility and Entangling Capability of Parameterized Quantum Circuits", "https://hdl.handle.net/11250/3145867"),

    (2023, "Willem Theodorus Schooltink", "Topological Regularization of Support Vector Machines", "https://hdl.handle.net/11250/3108078"),
    (2023, "Alvar Hønsi", "Gaussian Likelihoods in Bayesian Neural Networks", "https://bora.uib.no/bora-xmlui/handle/11250/3101521"),
    (2023, "Sigurd Roll Solberg", "Vectorizing Distributed Homology with Deep Set of Set Networks", "https://hdl.handle.net/11250/3092892"),
    (2023, "Audun Ljone Henriksen", "Learning Acquisition Functions for Cost-aware Bayesian Optimization", "https://hdl.handle.net/11250/3090624"),
    (2023, "Simen Høyvik", "Document Ranking for Systematic Reviews in Medicine", "https://hdl.handle.net/11250/3085325"),
    (2023, "Anastasiia Vlasenko", "Multi-List Recommendations for Personalizing Streaming Content", "https://hdl.handle.net/11250/3073016"),
    (2023, "Morten Blørstad", "Improving Stability of Tree-Based Models", "https://hdl.handle.net/11250/3074601"),
    (2023, "Peter Løkhammer Liessem", "Object Tracking Approach for Catch Estimation on Trawl Surveys", "https://hdl.handle.net/11250/3073842"),
    (2023, "Julia Cat-Vy Nguyen", "Vessel recognition in ultrasound images using machine learning techniques", "https://hdl.handle.net/11250/3074216"),
    (2023, "Eivind Anton Sætre Skarstein", "Building a finite state automaton for physical processes using queries and counterexamples on long short-term memory models", "https://hdl.handle.net/11250/3073285"),
    (2023, "Sven Alrik Solemdal", "Automatic Detection of the Arterial Input Function in DCE-MRI", "https://hdl.handle.net/11250/3075042"),
    (2023, "Emir Zamwa", "Generative Adversarial Networks for Annotating Images of Otoliths", "https://hdl.handle.net/11250/3060232"),
    (2023, "Anders Imenes", "Combining Query Rewriting and Knowledge Graph Embeddings for Complex Query Answering", "https://hdl.handle.net/11250/3072148"),
    (2023, "Erik Hystad", "Online learning through Reinforcement learning in a high-fidelity physics simulator", "https://hdl.handle.net/11250/3046086"),
    (2023, "Anders Stigen Mikkelsen", "Deep Reinforcement Learning Self-Play In Trading Financial Market", None),
    (2023, "Thorarinn Sigurvin Gunnarsson", "Metrics exploration in the context of ensemble weather forecasts using deep learning", None),
    (2023, "Hans Martin Aannestad", "Transfer Learning Remaining Machine Life by Deep Convolutional Neural Networks", None),

    (2022, "Johanna Jøsang", "Rule mining on extended knowledge graphs", "https://hdl.handle.net/11250/3001384"),
    (2022, "John Isak Fjellvang Villanger", "Communication in Turn Based Multiplayer Games Using Deep Reinforcement Learning", "https://hdl.handle.net/11250/3021977"),
    (2022, "Christian Mehl Wergeland", "Exploring Ways of Creating an AI Drawing Assistant", "https://hdl.handle.net/11250/3045510"),
    (2022, "Knut Thormod Aarnes Holager", "Selecting Maximally Informative Frequency Subsets for Acoustic Surveys", "https://hdl.handle.net/11250/3002621"),
    (2022, "Erlend Fonnes", "Automatic blurring of specific faces in video", "https://hdl.handle.net/11250/3013662"),
    (2022, "Hans Martin Theigler Johansen", "Making a Drawing-Assistant System using Deep Learning", "https://hdl.handle.net/11250/3001138"),
    (2022, "Adrian Tvilde Evensen", "Binary domain classification for Norwegian language in task-oriented dialogue systems", "https://hdl.handle.net/11250/3045477"),
    (2022, "Mathias Larsson Madslien", "Deep Learning Methods for Automated Classification of Fish Behavior", "https://hdl.handle.net/11250/3001181"),
    (2022, "Halvor Helland", "MetZoom: A CNN/LSTM hybrid based model for water reservoir inflow prediction", "https://hdl.handle.net/11250/3004276"),
    (2022, "Bård Ersland", "Memory-based control for quadrupedal locomotion - a sim-to-real study", None),
    (2022, "Brage Alvsvåg", "Improving fish detection using efficient neural networks", None),
    (2022, "Fromsa Hera", "Density estimation of single-cell mass cytometry with generative models", None),

    (2021, "Jonas Folkvord Triki", "Analysis of Word Embeddings: A Clustering and Topological Approach", "https://hdl.handle.net/11250/2769947"),
    (2021, "Tord Sture Stangeland", "Seismic Event Classification using Machine Learning", "https://hdl.handle.net/11250/2761757"),

    (2019, "Kristian Rosland", "Predicting Loss of Inference Accuracy in Bounded Tree-Width Bayesian Networks", "https://hdl.handle.net/1956/20817"),
]


def slugify(text):
    text = text.lower()
    text = re.sub(r"[æå]", "a", text)
    text = re.sub(r"[ø]", "o", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text


def yaml_str(s):
    escaped = s.replace('"', '\\"')
    return f'"{escaped}"'


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    seen = {}
    for year, student, title, link in ENTRIES:
        last_name = student.split()[-1]
        base_slug = f"{year}-{slugify(last_name)}"
        slug = base_slug
        n = 2
        while slug in seen:
            slug = f"{base_slug}-{n}"
            n += 1
        seen[slug] = True

        link_value = yaml_str(link) if link else '""'
        lines = [
            "---",
            f"student: {yaml_str(student)}",
            f"title: {yaml_str(title)}",
            f"year: {year}",
            f"link: {link_value}",
            "tags: []",
            "---",
            "",
        ]
        content = "\n".join(lines)
        path = os.path.join(OUT_DIR, f"{slug}.md")
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print("wrote", path)


if __name__ == "__main__":
    main()
