/* Generic facet-filtering engine shared by index.html (available topics)
 * and completed.html (completed theses). Each page provides a small config
 * object describing its data source, facets, and card rendering; see the
 * inline <script> at the bottom of each page.
 *
 * No build tooling is needed to run this file itself -- it's plain
 * browser JS loaded with a <script> tag. The markdown -> JSON step happens
 * separately at build time (scripts/build.mjs).
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(html) {
  return String(html).replace(/<[^>]*>/g, " ");
}

function readHash() {
  const raw = location.hash.replace(/^#/, "");
  const params = new URLSearchParams(raw);
  const state = { q: params.get("q") || "" };
  for (const [key, value] of params.entries()) {
    if (key === "q") continue;
    state[key] = value ? value.split(",").map(decodeURIComponent) : [];
  }
  return state;
}

function writeHash(state) {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  for (const key of Object.keys(state)) {
    if (key === "q") continue;
    const values = state[key];
    if (values && values.length) {
      params.set(key, values.map(encodeURIComponent).join(","));
    }
  }
  const qs = params.toString();
  history.replaceState(null, "", qs ? `#${qs}` : location.pathname + location.search);
}

async function initFacetPage(config) {
  const {
    dataUrl,
    listSelector,
    filtersSelector,
    resultsBarSelector,
    facets, // [{ key, label, getValues(item) -> string[] }]
    searchFields, // item -> string[]
    renderCard, // item -> html string
    emptyMessage = "No matching theses found.",
  } = config;

  const listEl = document.querySelector(listSelector);
  const filtersEl = document.querySelector(filtersSelector);
  const resultsBarEl = resultsBarSelector ? document.querySelector(resultsBarSelector) : null;

  let items = [];
  try {
    const res = await fetch(dataUrl);
    items = await res.json();
  } catch (err) {
    listEl.innerHTML = `<div class="empty-state">Could not load data (${escapeHtml(String(err))}).</div>`;
    return;
  }

  const state = readHash();
  for (const facet of facets) {
    if (!Array.isArray(state[facet.key])) state[facet.key] = [];
  }

  // Build facet option lists. Options are ordered by how many entries carry
  // each value (most first, ties alphabetical), so the busiest tags,
  // supervisors and ECTS sizes sit at the top of each list. These totals are
  // taken over the whole data set rather than the current filtering, so the
  // option order stays put while you click checkboxes -- the per-option counts
  // shown next to them (see renderFilters) are the context-sensitive ones.
  // A facet can opt out with its own `sort` (completed.html sorts years).
  function optionValuesFor(facetKey) {
    const facet = facets.find((f) => f.key === facetKey);
    const totals = new Map();
    for (const item of items) {
      for (const v of new Set(facet.getValues(item) || [])) {
        totals.set(v, (totals.get(v) || 0) + 1);
      }
    }
    const sortFn = facet.sort || ((a, b) => totals.get(b) - totals.get(a) || a.localeCompare(b));
    return Array.from(totals.keys()).sort(sortFn);
  }

  function matches(item) {
    if (state.q) {
      const haystack = (searchFields(item) || []).join(" ").toLowerCase();
      if (!haystack.includes(state.q.toLowerCase())) return false;
    }
    for (const facet of facets) {
      const selected = state[facet.key];
      if (!selected.length) continue;
      const values = facet.getValues(item) || [];
      if (!selected.some((v) => values.includes(v))) return false;
    }
    return true;
  }

  function render() {
    const filtered = items.filter(matches);

    if (resultsBarEl) {
      const total = items.length;
      resultsBarEl.textContent =
        filtered.length === total
          ? `Showing all ${total} ${total === 1 ? "entry" : "entries"}`
          : `Showing ${filtered.length} of ${total} entries`;
    }

    listEl.innerHTML = filtered.length
      ? filtered.map(renderCard).join("")
      : `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;

    // Wire up tag-pill clicks inside rendered cards to toggle facet state.
    listEl.querySelectorAll("[data-facet-toggle]").forEach((el) => {
      el.addEventListener("click", () => {
        const key = el.getAttribute("data-facet-key");
        const value = el.getAttribute("data-facet-toggle");
        toggleValue(key, value);
      });
    });

    renderFilters();
    writeHash(state);
  }

  function toggleValue(key, value) {
    const arr = state[key];
    const idx = arr.indexOf(value);
    if (idx === -1) arr.push(value);
    else arr.splice(idx, 1);
    render();
  }

  function renderFilters() {
    const searchValue = state.q || "";
    const facetBlocks = facets
      .map((facet) => {
        const options = optionValuesFor(facet.key);
        if (!options.length) return "";
        const optionsHtml = options
          .map((opt) => {
            const checked = state[facet.key].includes(opt) ? "checked" : "";
            const count = items.filter((it) => (facet.getValues(it) || []).includes(opt) && matchesExcept(it, facet.key)).length;
            const id = `facet-${facet.key}-${opt.replace(/[^a-zA-Z0-9]/g, "_")}`;
            return `<label class="facet-option" for="${id}">
              <input type="checkbox" id="${id}" data-facet="${escapeHtml(facet.key)}" value="${escapeHtml(opt)}" ${checked} />
              <span>${escapeHtml(opt)}</span>
              <span class="facet-count">${count}</span>
            </label>`;
          })
          .join("");
        return `<h2>${escapeHtml(facet.label)}</h2><div class="facet-list">${optionsHtml}</div>`;
      })
      .join("");

    filtersEl.innerHTML = `
      <h2 style="margin-top:0">Search</h2>
      <input type="search" class="search-box" placeholder="Search title, description..." value="${escapeHtml(searchValue)}" data-role="search-input" />
      ${facetBlocks}
      <button type="button" class="clear-filters" data-role="clear-filters">Clear all filters</button>
    `;

    filtersEl.querySelectorAll('input[type="checkbox"][data-facet]').forEach((cb) => {
      cb.addEventListener("change", () => {
        toggleValue(cb.getAttribute("data-facet"), cb.value);
      });
    });

    const searchInput = filtersEl.querySelector('[data-role="search-input"]');
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      const value = searchInput.value;
      debounceTimer = setTimeout(() => {
        state.q = value;
        render();
      }, 150);
    });

    filtersEl.querySelector('[data-role="clear-filters"]').addEventListener("click", () => {
      for (const facet of facets) state[facet.key] = [];
      state.q = "";
      render();
    });
  }

  // Count helper: how many items would match if every OTHER facet's current
  // selection were applied, ignoring the facet we're computing options for.
  // This lets checkbox counts update sensibly without hiding options you've
  // already selected.
  function matchesExcept(item, excludeKey) {
    if (state.q) {
      const haystack = (searchFields(item) || []).join(" ").toLowerCase();
      if (!haystack.includes(state.q.toLowerCase())) return false;
    }
    for (const facet of facets) {
      if (facet.key === excludeKey) continue;
      const selected = state[facet.key];
      if (!selected.length) continue;
      const values = facet.getValues(item) || [];
      if (!selected.some((v) => values.includes(v))) return false;
    }
    return true;
  }

  render();
}

window.initFacetPage = initFacetPage;
window.escapeHtml = escapeHtml;
window.stripHtml = stripHtml;
