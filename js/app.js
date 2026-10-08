/* Tinkerbench storefront: illustrated toys, filters, product details and cart. */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const money = new Intl.NumberFormat(STORE.locale, { style: "currency", currency: STORE.currency });
  const fmt = (n) => money.format(n);
  const CART_KEY = "tinkerbench-cart-v1";

  /* ---------- Toy illustrations (purple and cyan on light tiles) ---------- */
  const K = "#1B1530", W = "#FFFFFF", TILE = "#EBE8F8", TIRE = "#2E2556";
  const VIOLET = "#6D3FD6", CYAN = "#22C7E0", LILAC = "#A98BF5", DEEP = "#3B1E8F";

  const hx = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mix = (a, b, t) => {
    const A = hx(a), B = hx(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  const shade = (c, t = 0.25) => mix(c, K, t);
  const light = (c, t = 0.4) => mix(c, W, t);
  const og = (x, y) => `style="transform-origin:${x}px ${y}px"`;
  const blk = (x, y, w, h, f, rx = 8) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>` +
    `<rect x="${x + 6}" y="${y + 5}" width="${Math.max(0, w - 12)}" height="4.5" rx="2.2" fill="#fff" opacity=".34"/>`;

  function gearG(cx, cy, r, n, fill, cls) {
    const tw = r * 0.42, th = r * 0.46;
    let teeth = "", holes = "";
    for (let i = 0; i < n; i++) {
      teeth += `<rect x="${cx - tw / 2}" y="${cy - r - th * 0.55}" width="${tw}" height="${th}" rx="${tw * 0.28}" transform="rotate(${(i * 360) / n} ${cx} ${cy})"/>`;
    }
    for (let i = 0; i < 5; i++) {
      const a = (i * 72 * Math.PI) / 180;
      holes += `<circle cx="${(cx + Math.sin(a) * r * 0.56).toFixed(1)}" cy="${(cy - Math.cos(a) * r * 0.56).toFixed(1)}" r="${(r * 0.12).toFixed(1)}"/>`;
    }
    const R = r * 0.88, a1 = (-135 * Math.PI) / 180, a2 = (-60 * Math.PI) / 180;
    const arc = `M${(cx + Math.sin(a1) * R).toFixed(1)} ${(cy - Math.cos(a1) * R).toFixed(1)} A${R} ${R} 0 0 1 ${(cx + Math.sin(a2) * R).toFixed(1)} ${(cy - Math.cos(a2) * R).toFixed(1)}`;
    return `<g class="${cls}" ${og(cx, cy)}>
      <g fill="${fill}">${teeth}<circle cx="${cx}" cy="${cy}" r="${r}"/></g>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.8).toFixed(1)}" fill="${light(fill, 0.14)}"/>
      <g fill="${shade(fill, 0.4)}">${holes}</g>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.22).toFixed(1)}" fill="${K}"/>
      <circle cx="${cx}" cy="${cy}" r="${(r * 0.09).toFixed(1)}" fill="${light(fill, 0.6)}"/>
      <path d="${arc}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="${(r * 0.07).toFixed(1)}" stroke-linecap="round"/>
    </g>`;
  }

  const ART = {
    gear: (c) => gearG(88, 96, 50, 10, c, "art-spin") + gearG(150, 146, 28, 8, CYAN, "art-spin-rev"),

    robot: (c) => {
      const wheel = (x) => `<g class="art-spin" ${og(x, 152)}><circle cx="${x}" cy="152" r="18" fill="${TIRE}"/><circle cx="${x}" cy="152" r="9.5" fill="${light(c, 0.5)}"/><rect x="${x - 1.5}" y="143" width="3" height="18" fill="${shade(c, 0.3)}"/><rect x="${x - 9}" y="150.5" width="18" height="3" fill="${shade(c, 0.3)}"/></g>`;
      return `<g class="art-drive">
        <rect x="34" y="104" width="132" height="42" rx="14" fill="${c}"/>
        <rect x="34" y="130" width="132" height="16" rx="8" fill="${shade(c, 0.2)}"/>
        <path d="M44 100 L64 62 H128 L110 100Z" fill="${DEEP}"/>
        <path d="M57.2 75 H121.8 M50.3 88 H115.7 M85.3 62 L66 100 M106.7 62 L88 100" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>
        <rect x="120" y="76" width="34" height="28" rx="9" fill="${W}"/>
        <rect x="127" y="83" width="20" height="13" rx="5" fill="${TIRE}"/><circle cx="133" cy="88" r="2.5" fill="#fff" opacity=".85"/>
        <path d="M147 76 L153 51" stroke="${TIRE}" stroke-width="3" stroke-linecap="round"/><circle cx="154" cy="47" r="6" fill="${VIOLET}"/>
        ${wheel(58)}${wheel(100)}${wheel(142)}
      </g>`;
    },

    blocks: (c) =>
      blk(34, 134, 132, 34, c) + blk(50, 98, 62, 36, VIOLET) + blk(116, 102, 44, 32, W) +
      `<g class="art-wobble" ${og(98, 98)}>${blk(68, 64, 58, 34, CYAN)}<path d="M97 24 L132 64 L62 64Z" fill="${W}"/><circle cx="97" cy="50" r="5.5" fill="${TIRE}"/></g>`,

    rocket: (c) => `<g transform="rotate(34 100 104)"><g class="art-float" ${og(100, 104)}>
        <g class="art-flame" ${og(100, 134)}><path d="M82 132 Q100 194 118 132Z" fill="#A6F0FA"/><path d="M91 132 Q100 168 109 132Z" fill="${CYAN}"/></g>
        <path d="M72 100 L44 142 L76 132Z" fill="${c}"/><path d="M128 100 L156 142 L124 132Z" fill="${c}"/>
        <path d="M100 18 C130 42 138 88 130 134 H70 C62 88 70 42 100 18Z" fill="${W}"/>
        <path d="M100 18 C130 42 138 88 130 134 H114 C124 90 118 46 100 18Z" fill="${K}" opacity=".1"/>
        <path d="M100 18 C113 29 121 44 125 60 H75 C79 44 87 29 100 18Z" fill="${c}"/>
        <circle cx="100" cy="88" r="18" fill="${light(c, 0.35)}"/><circle cx="100" cy="88" r="12.5" fill="${DEEP}"/><circle cx="95" cy="83" r="4" fill="#fff" opacity=".85"/>
        <rect x="82" y="128" width="36" height="10" rx="4" fill="${shade(c, 0.2)}"/>
      </g></g>`,

    cube: (c) => `<g class="art-wobble" ${og(100, 160)}>
        <path d="M100 34 L160 66 L100 98 L40 66Z" fill="${light(c, 0.38)}"/>
        <path d="M40 66 L100 98 V166 L40 134Z" fill="${c}"/>
        <path d="M160 66 L100 98 V166 L160 134Z" fill="${shade(c, 0.24)}"/>
        <g stroke="${shade(c, 0.5)}" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".7">
          <path d="M70 50 L130 82 M130 50 L70 82"/><path d="M64 79 V147 M82 88 V156"/><path d="M118 88 V156 M136 79 V147"/>
        </g></g>`,

    maze: (c) => `<rect x="38" y="52" width="124" height="124" rx="24" fill="${shade(c, 0.4)}"/>
        <rect x="38" y="38" width="124" height="124" rx="24" fill="${c}"/>
        <rect x="48" y="48" width="104" height="104" rx="16" fill="${shade(c, 0.16)}"/>
        <path d="M62 62 H138 V138 H78 V86 H116 V114 H98" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/>
        <circle cx="98" cy="114" r="5" fill="${CYAN}"/>
        <circle class="art-ball" cx="62" cy="62" r="7.5" fill="${K}" style="offset-path:path('M0 0 H76 V76 H16 V24 H54 V52 H36');offset-rotate:0deg"/>`,

    tiles: (c, bg) => {
      const cols = [c, W, CYAN];
      let t = "";
      for (let i = 0; i < 8; i++) {
        const row = Math.floor(i / 3), x = 46 + (i % 3) * 40, y = 56 + row * 40;
        t += `<g${i === 7 ? ' class="art-slide"' : ""}><rect x="${x}" y="${y}" width="36" height="36" rx="9" fill="${cols[(i + row) % 3]}"/><rect x="${x + 6}" y="${y + 5}" width="24" height="4" rx="2" fill="#fff" opacity=".4"/></g>`;
      }
      return `<rect x="34" y="44" width="132" height="132" rx="22" fill="${TIRE}"/>${t}`;
    },

    dice: (c) => {
      const pip = (x, y, f) => `<circle cx="${x}" cy="${y}" r="6" fill="${f}"/>`;
      return `<g class="art-tumble" ${og(72, 112)}><g transform="rotate(-12 72 112)">
          <rect x="38" y="78" width="68" height="68" rx="15" fill="${c}"/><rect x="40" y="80" width="64" height="64" rx="13" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>
          ${pip(56, 96, W)}${pip(88, 96, W)}${pip(72, 112, W)}${pip(56, 128, W)}${pip(88, 128, W)}
        </g></g>
        <g class="art-tumble" style="transform-origin:130px 88px;animation-delay:-0.8s"><g transform="rotate(14 130 88)">
          <rect x="98" y="56" width="64" height="64" rx="14" fill="${W}"/>
          ${pip(116, 74, TIRE)}${pip(130, 88, TIRE)}${pip(144, 102, TIRE)}
        </g></g>`;
    },

    cards: (c) => {
      const card = (cls, f, glyph) => `<g class="fan ${cls}" ${og(100, 168)}><rect x="66" y="40" width="68" height="106" rx="11" fill="${f}"/>${glyph}</g>`;
      return card("fan-a", LILAC, `<circle cx="100" cy="93" r="15" fill="#fff" opacity=".9"/>`) +
        card("fan-b", W, `<path d="M100 72 L118 93 L100 114 L82 93Z" fill="${c}"/>`) +
        card("fan-c", c, `<path d="M100 74 L119 110 H81Z" fill="#fff"/>`);
    },

    tower: (c) => {
      let r = "";
      const tone = (i) => [c, shade(c, 0.14), light(c, 0.14)][i % 3];
      for (let row = 0; row < 6; row++) {
        const y = 150 - row * 20;
        if (row % 2 === 0) {
          for (let i = 0; i < 3; i++) { if (row === 2 && i === 1) continue; r += blk(54 + i * 30, y, 28, 18, tone(i + row), 4); }
        } else r += blk(54, y, 88, 18, tone(row), 4);
      }
      return `<g class="art-wobble-sm" ${og(98, 170)}>${r}<g class="art-wobble" ${og(124, 38)}><g transform="rotate(12 124 38)">${blk(96, 28, 56, 18, CYAN, 4)}</g></g></g>`;
    },

    top: (c) => `<g class="art-top" ${og(100, 172)}>
        <rect x="93" y="22" width="14" height="40" rx="7" fill="${VIOLET}"/>
        <path d="M44 76 C44 62 156 62 156 76 C156 108 122 132 100 172 C78 132 44 108 44 76Z" fill="${c}"/>
        <path d="M100 172 C122 132 156 108 156 76 C156 70 150 66 140 64 C140 100 118 134 100 172Z" fill="${K}" opacity=".16"/>
        <ellipse cx="100" cy="76" rx="56" ry="13" fill="${light(c, 0.4)}"/>
        <path d="M54 94 C82 108 118 108 146 94" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
        <path d="M66 114 C86 124 114 124 134 114" fill="none" stroke="${K}" stroke-opacity=".25" stroke-width="7" stroke-linecap="round"/>
        <circle cx="100" cy="172" r="5" fill="${K}"/></g>
        <path d="M28 96 q-10 20 0 40 M172 96 q10 20 0 40" fill="none" stroke="${TIRE}" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/>`,

    marble: (c) => {
      const P = "M44 52 H132 Q158 52 158 78 Q158 104 132 104 H68 Q42 104 42 130 Q42 156 68 156 H156";
      const D = "M0 0 H88 Q114 0 114 26 Q114 52 88 52 H24 Q-2 52 -2 78 Q-2 104 24 104 H112";
      const ball = (f, delay) => `<g class="art-ball" style="offset-path:path('${D}');offset-rotate:0deg;animation-delay:${delay}s"><circle cx="44" cy="43" r="11" fill="${f}"/><circle cx="40" cy="39" r="3.4" fill="#fff" opacity=".75"/></g>`;
      return `<path d="${P}" fill="none" stroke="${shade(c, 0.45)}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 7)"/>
        <path d="${P}" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${P}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 -5)"/>
        ${ball(TIRE, 0)}${ball(CYAN, -2)}`;
    }
  };

  function drawArt(kind, c, bg, ground = true) {
    const art = (ART[kind] || ART.cube)(c, bg || TILE);
    const shadow = ground ? `<ellipse cx="100" cy="181" rx="58" ry="7" fill="${K}" opacity=".13"/>` : "";
    return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">${shadow}${art}</svg>`;
  }
  function media(p) {
    return p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : drawArt(p.art, p.color, p.tint);
  }

  /* ---------- Cart state ---------- */
  let cart = {};
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    for (const id in saved) {
      if (PRODUCTS.some((p) => p.id === id) && saved[id] > 0) cart[id] = Math.min(99, Math.floor(saved[id]));
    }
  } catch (e) { cart = {}; }

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* cart still works for this visit */ }
  }
  const find = (id) => PRODUCTS.find((p) => p.id === id);
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(cart).reduce((sum, [id, q]) => sum + find(id).price * q, 0);

  function setQty(id, qty) {
    if (qty <= 0) delete cart[id];
    else cart[id] = Math.min(99, qty);
    saveCart();
    renderCart();
  }

  let toastTimer;
  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }
  function addToCart(id) {
    setQty(id, (cart[id] || 0) + 1);
    toast(`Added to cart: ${find(id).name}`);
  }

  /* ---------- Rendering ---------- */
  let activeCategory = "all";

  function renderFilters() {
    $("filters").innerHTML = CATEGORIES.map((c) =>
      `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${c.id === activeCategory}">${c.label}</button>`
    ).join("");
  }

  function renderProducts() {
    const list = PRODUCTS.filter((p) => activeCategory === "all" || p.category === activeCategory);
    $("product-grid").innerHTML = list.map((p) => `
      <li class="card" style="--glow:${p.color}">
        <button type="button" class="card-art" data-view="${p.id}" aria-label="See details for ${p.name}">
          ${media(p)}
          ${p.tag ? `<span class="flag">${p.tag}</span>` : ""}
        </button>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.blurb}</p>
          <div class="card-buy">
            <span class="price-tag">${fmt(p.price)}</span>
            <button type="button" class="button button-ink" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to cart</button>
          </div>
        </div>
      </li>`).join("");
  }

  function renderCart() {
    const n = count();
    $("cart-count").textContent = n;
    $("open-cart").setAttribute("aria-label", `Open cart, ${n} ${n === 1 ? "item" : "items"}`);
    const empty = n === 0;
    $("cart-empty").hidden = !empty;
    $("cart-foot").hidden = empty;
    $("cart-lines").hidden = empty;
    $("checkout-note").textContent = "";

    $("cart-lines").innerHTML = Object.entries(cart).map(([id, q]) => {
      const p = find(id);
      return `
      <li class="line">
        <div class="line-art" style="--glow:${p.color}">${media(p)}</div>
        <div class="line-info">
          <h3>${p.name}</h3>
          <p>${fmt(p.price * q)}</p>
          <div class="qty">
            <button type="button" data-qty="${id}" data-d="-1" aria-label="Remove one ${p.name}">&minus;</button>
            <span aria-label="Quantity">${q}</span>
            <button type="button" data-qty="${id}" data-d="1" aria-label="Add one more ${p.name}">+</button>
            <button type="button" class="remove" data-remove="${id}">Remove</button>
          </div>
        </div>
      </li>`;
    }).join("");

    const sub = subtotal();
    const free = sub >= STORE.freeShippingOver;
    const ship = empty ? 0 : free ? 0 : STORE.flatShipping;
    $("t-sub").textContent = fmt(sub);
    $("t-ship").textContent = free ? "Free" : fmt(ship);
    $("t-total").textContent = fmt(sub + ship);
    $("ship-nudge").textContent = free
      ? "You've got free shipping."
      : `Add ${fmt(STORE.freeShippingOver - sub)} more for free shipping.`;
  }

  /* ---------- Product details ---------- */
  let viewing = null;
  function openProduct(id) {
    const p = find(id);
    viewing = id;
    $("pd-art").style.setProperty("--glow", p.color);
    $("pd-art").innerHTML = media(p);
    $("pd-name").textContent = p.name;
    $("pd-price").textContent = fmt(p.price);
    $("pd-blurb").textContent = p.blurb;
    $("pd-details").textContent = p.details;
    $("product-dialog").showModal();
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) {
      if (e.target instanceof HTMLDialogElement) e.target.close();
      return;
    }
    if (t.dataset.cat) {
      activeCategory = t.dataset.cat;
      renderFilters();
      renderProducts();
      document.querySelector(`[data-cat="${activeCategory}"]`).focus();
    } else if (t.dataset.add) addToCart(t.dataset.add);
    else if (t.dataset.view) openProduct(t.dataset.view);
    else if (t.dataset.qty) setQty(t.dataset.qty, (cart[t.dataset.qty] || 0) + Number(t.dataset.d));
    else if (t.dataset.remove) setQty(t.dataset.remove, 0);
    else if ("close" in t.dataset) t.closest("dialog").close();
  });

  $("open-cart").addEventListener("click", () => $("cart-dialog").showModal());
  $("pd-add").addEventListener("click", () => {
    addToCart(viewing);
    $("product-dialog").close();
  });
  $("checkout").addEventListener("click", () => {
    if (!STORE.previewMode && STORE.checkoutUrl) {
      window.location.href = STORE.checkoutUrl;
      return;
    }
    $("checkout-note").textContent = "Checkout isn't open yet. This is a preview store, so nothing has been ordered or charged.";
  });

  /* ---------- Start ---------- */
  $("preview-banner").hidden = !STORE.previewMode;
  $("year").textContent = new Date().getFullYear();
  $("ship-flat").textContent = fmt(STORE.flatShipping);
  $("ship-free").textContent = fmt(STORE.freeShippingOver);
  $("fact-ship").textContent = `Free shipping over ${fmt(STORE.freeShippingOver)}`;
  $("contact-link").textContent = STORE.contactEmail;
  $("contact-link").href = `mailto:${STORE.contactEmail}`;
  $("hero-art").innerHTML = drawArt("gear", VIOLET, TILE, false);
  renderFilters();
  renderProducts();
  renderCart();
})();
