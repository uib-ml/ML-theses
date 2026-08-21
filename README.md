# ML Group Master's Thesis Site

A static website listing available and completed Master's thesis topics for
the Machine Learning group, Department of Informatics, University of Bergen.

Content lives entirely in markdown files under `content/`. A build script
turns those into a static site in `dist/`, which GitHub Pages serves. **You
never edit HTML to add or update a thesis** — you edit or add a markdown
file and push.

## How it works

```
content/
  topics/       one markdown file per available topic
  completed/    one markdown file per completed thesis
scripts/
  build.mjs     reads content/, writes dist/
templates/      the site's HTML/CSS/JS (edit these only to change layout or design)
dist/           generated output (not committed — built fresh each time)
```

`npm run build` reads every markdown file, parses its frontmatter and body,
and writes `dist/data/topics.json` and `dist/data/completed.json`. The pages
in `dist/` fetch that JSON in the browser and render the filterable list —
there's no server-side code and no database.

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs the build
and publishes `dist/` to GitHub Pages automatically on every push to `main`.

## Adding an available topic

Create a new file in `content/topics/`, e.g. `content/topics/my-topic.md`:

```markdown
---
title: "Your topic title"
supervisor: "Firstname Lastname"
supervisor_url: "https://www.uib.no/en/persons/Firstname.Lastname"
ects: "30"
tags: ["topic area", "method", "keyword"]
status: "available"
---
Write the project description here in normal markdown: paragraphs, a
**Task:** line, links, a references section, whatever the topic needs.
```

Field notes:

- `title`, `supervisor` — required.
- `supervisor` — either a single name (`"Firstname Lastname"`) or a YAML
  list for co-advised topics (`["First Advisor", "Second Advisor"]`). Every
  name listed gets its own entry in the supervisor filter, so a co-advised
  topic shows up under both advisors.
- `supervisor_url` — optional, but if set it makes the advisor's name a link.
  With a list of supervisors, give a matching list of URLs in the same
  order, using `""` for anyone without a profile page:
  `supervisor_url: ["https://…/First.Advisor", ""]`.
- `ects` — one of `"30"`, `"60"`, or `"30/60"` (meaning either is fine). If
  a topic can be scoped to fit either length, use `"30/60"`; it will then
  show up when a visitor filters for 30 ECTS *or* for 60 ECTS.
- `tags` — a YAML list of short keywords. These become the filterable tag
  checkboxes and the clickable pills on each card. Stick to the fixed
  vocabulary below rather than inventing new tags, so the filter panel stays
  short and doesn't fragment into near-duplicates. Give each topic one or
  two subject tags plus one or two task tags:

  | Subject | Task |
  | --- | --- |
  | `Bayesian networks` | `Theoretical` |
  | `Causality` | `Computational` |
  | `Deep Learning` | `Applied` |
  | `Geometric Deep Learning` | |
  | `Life Sciences` | |
  | `Optimization` | |
  | `Probabilistic Modelling` | |
  | `Reinforcement Learning` | |
  | `Topological Machine Learning` | |

  Add a new tag only when a topic genuinely fits none of these, and then use
  it for more than one topic if you can.
- `status` — optional, defaults to `"available"`. If a topic has been taken
  by a student but you want to leave it visible for reference, set this to
  something like `"taken"` and it'll show a small "(taken)" label instead of
  removing the card. To remove a topic from the site entirely, just delete
  its markdown file (or move it — see below).

When a topic is picked up by a student and finishes, move the file from
`content/topics/` to `content/completed/` and rewrite its frontmatter to
match the completed-thesis schema below (or just delete it from `topics/`
and add a fresh completed entry — whichever is less friction for you).

## Adding a completed thesis

Create a new file in `content/completed/`, e.g.
`content/completed/2026-lastname.md`:

```markdown
---
student: "Firstname Lastname"
title: "Thesis title"
year: 2026
link: "https://hdl.handle.net/11250/XXXXXXX"
tags: ["topic area"]
---
```

- `student`, `title`, `year` — required.
- `link`, `tags` — optional. Leave `link` blank (`""`) if the thesis isn't
  in online yet.

Completed theses don't carry supervisor or ECTS information — those fields
only apply to the available topics in `content/topics/`.

**Note on the 3 seeded "available" topics:** the source text didn't state
an ECTS size for any of them, so I defaulted all three to `"30/60"`
(either). Please correct that in each file if you know the intended size.

## Building and previewing locally

Requires Node.js (18+).

```bash
npm install         # first time only
npm run build        # writes dist/
npm run serve         # serves dist/ at http://localhost:8080
```

Re-run `npm run build` after any content change if you're previewing
locally — GitHub Actions does this for you automatically once it's pushed.

The build script validates required fields and prints a warning (or an
error, which fails the build) if something's missing or malformed, e.g.:

```
[error] content/topics/my-topic.md: missing required field 'supervisor'
[warn]  content/topics/my-topic.md: unrecognized ects value "sixty" (expected 30, 60, or 30/60).
```

## First-time GitHub Pages setup

1. Push this repository to GitHub.
2. In the repo's **Settings → Pages**, set "Source" to **GitHub Actions**.
3. Push to `main` (or run the "Build and deploy site" workflow manually from
   the Actions tab). The site will be published at
   `https://<org>.github.io/<repo>/`.

After that, publishing an update is just: edit/add a markdown file, commit,
push.

## Filtering behavior

Both pages (`index.html` for available topics, `completed.html` for
completed theses) offer the same kind of filter panel: checkboxes grouped
by facet (tags, ECTS and supervisor on the topics page; tags and year on
the completed page), plus a free-text search box.
Selecting multiple checkboxes *within* one facet is OR'd (e.g. ticking two
tags shows anything with either tag); selections *across* facets are AND'd
(e.g. a tag plus a supervisor narrows to items matching both). The current
filter selection is written into the URL (after the `#`), so a filtered
view can be bookmarked or shared as a link.

## Changing the design

Everything visual lives in `templates/`: `index.html` and `completed.html`
are the two pages, `assets/style.css` is the styling, and `assets/app.js` is
the shared filtering logic used by both pages. These are plain HTML/CSS/JS
— no framework or bundler — so they can be edited directly and previewed by
rerunning `npm run build`.
