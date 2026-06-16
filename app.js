/* ============================================================
   DRIP — fashion & beauty store
   Cart key format: "productId::color::size"
   ============================================================ */

const PRODUCTS = [
  {
    id: "women-dress",
    cjPid: "1705465925572497408",
    name: "Loose Linen Midi Dress",
    category: "women",
    badge: "Bestseller",
    price: 29.99,
    rating: 4.8,
    reviews: 283,
    description: "Breathable cotton-linen blend, relaxed fit, mid-length silhouette. Ships from US in 3–8 days, no Chinese packaging.",
    images: [
      "https://oss-cf.cjdropshipping.com/product/2025/04/21/06/359a0834-5390-4e4b-b6e9-68b094ad346d.jpg",
      "https://cf.cjdropshipping.com/quick/product/8165a3f1-a5c2-473b-9e07-64556aa887a0.jpg",
      "https://cf.cjdropshipping.com/quick/product/67855e43-894d-43bb-b8ed-4723c915f7bd.jpg",
      "https://cf.cjdropshipping.com/quick/product/57a5dbc0-f919-456d-ab49-0357da8edfb8.jpg",
    ],
    videos: [],
    colors: ["Black", "Blue", "Khaki", "Orange", "Pink"],
    colorHex: { Black: "#1e293b", Blue: "#3b82f6", Khaki: "#a16207", Orange: "#fb923c", Pink: "#f9a8d4" },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "men-cargo",
    cjPid: "1670981011842273280",
    name: "Streetwear Cargo Pants",
    category: "men",
    badge: "Hot",
    price: 34.99,
    rating: 4.7,
    reviews: 1152,
    description: "Multi-pocket cargo pants with drawstring waist. Hip-hop streetwear style, all-day comfort. Ships from US.",
    images: [
      "https://oss-cf.cjdropshipping.com/product/2023/09/22/07/a6f6b5a8-ca1a-4a22-9a6e-bb1a73c2e5a4.jpg",
      "https://oss-cf.cjdropshipping.com/product/2023/09/22/07/b1c9d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e.jpg",
    ],
    videos: [],
    colors: ["Black", "Army Green", "Grey", "Khaki", "Navy"],
    colorHex: { Black: "#1e293b", "Army Green": "#4d7c0f", Grey: "#6b7280", Khaki: "#a16207", Navy: "#1e3a5f" },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "ems-tool",
    cjPid: "1914884885643104257",
    name: "EMS Facial Beauty Tool",
    category: "beauty",
    badge: "New",
    price: 59.99,
    rating: 4.9,
    reviews: 733,
    description: "V-shape facial lifting, EMS microcurrent, blue light therapy. 5 modes for a spa face at home. Free US shipping.",
    images: [
      "https://oss-cf.cjdropshipping.com/product/2024/05/08/09/8e2d5e20-3c45-4887-9d20-4f3e0a5e6c3b.jpg",
      "https://oss-cf.cjdropshipping.com/product/2024/05/08/09/ems-mode-diagram.jpg",
    ],
    videos: [],
    colors: ["White"],
    colorHex: { White: "#f8fafc" },
    sizes: [],
  },
];

const CATEGORIES = [
  { key: "all",    label: "All" },
  { key: "women",  label: "Women" },
  { key: "men",    label: "Men" },
  { key: "beauty", label: "Beauty" },
];

const FREE_SHIP = 50;

// --- State ---
let activeCategory = "all";
let cart = loadCart();
let detailProduct = null;   // product open in detail modal
let detailMediaIdx = 0;     // current image/video index
let pickerColor = null;
let pickerSize = null;

// --- Helpers ---
const $ = (sel) => document.querySelector(sel);
const fmt = (n) => `$${Number(n).toFixed(2)}`;
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const cartKey = (id, color, size) => `${id}::${color}::${size || "_"}`;
const parseKey = (key) => { const [id, color, size] = key.split("::"); return { id, color, size: size === "_" ? "" : size }; };
const allMedia = (p) => [...p.images, ...p.videos.map(v => ({ type: "video", src: v }))];

function loadCart() {
  try { return JSON.parse(localStorage.getItem("drip-cart")) || {}; }
  catch { return {}; }
}
function saveCart() { localStorage.setItem("drip-cart", JSON.stringify(cart)); }

// --- Filters ---
function renderFilters() {
  const wrap = $("#filters");
  wrap.innerHTML = CATEGORIES.map((c) => `
    <button class="filter ${c.key === activeCategory ? "active" : ""}" data-cat="${c.key}">${c.label}</button>
  `).join("");
  wrap.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => { activeCategory = btn.dataset.cat; renderFilters(); renderGrid(); })
  );
}

// --- Product grid ---
function renderGrid() {
  const grid = $("#productGrid");
  const items = PRODUCTS.filter((p) => activeCategory === "all" || p.category === activeCategory);
  grid.innerHTML = items.map((p) => `
    <article class="card" data-id="${p.id}" role="button" tabindex="0">
      <div class="card-art">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy"
          onerror="this.parentElement.classList.add('no-img')" />
        ${p.images.length > 1 ? `<span class="card-img-count">+${p.images.length - 1} photos</span>` : ""}
      </div>
      <div class="card-body">
        <span class="card-category">${p.category}</span>
        <span class="card-name">${p.name}</span>
        <span class="card-rating">${stars(p.rating)} <span class="muted">${p.rating} (${p.reviews})</span></span>
        <div class="card-foot">
          <span class="card-price">${fmt(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">View &amp; Add</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".add-btn")) openDetail(card.dataset.id);
    });
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") openDetail(card.dataset.id); });
  });
  grid.querySelectorAll(".add-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => { e.stopPropagation(); openDetail(btn.dataset.id); })
  );
}

// --- Product detail modal ---
function openDetail(productId) {
  detailProduct = PRODUCTS.find((p) => p.id === productId);
  if (!detailProduct) return;
  detailMediaIdx = 0;
  pickerColor = detailProduct.colors[0];
  pickerSize = detailProduct.sizes[0] || null;
  renderDetail();
  $("#detail").classList.add("open");
  $("#detailOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  $("#detail").classList.remove("open");
  $("#detailOverlay").classList.remove("open");
  document.body.style.overflow = "";
  detailProduct = null;
}

function renderDetail() {
  const p = detailProduct;
  const media = allMedia(p);

  // Main display
  const mainEl = $("#detailMain");
  const current = media[detailMediaIdx];
  if (typeof current === "object" && current.type === "video") {
    mainEl.innerHTML = `<video src="${current.src}" controls autoplay muted playsinline class="detail-video"></video>`;
  } else {
    mainEl.innerHTML = `<img src="${current || p.images[0]}" alt="${p.name}" class="detail-img" />`;
  }

  // Thumbnails
  const thumbEl = $("#detailThumbs");
  thumbEl.innerHTML = media.map((m, i) => {
    const isVideo = typeof m === "object" && m.type === "video";
    const src = isVideo ? p.images[0] : m;
    return `<button class="thumb-btn ${i === detailMediaIdx ? "active" : ""}" data-idx="${i}">
      ${isVideo ? `<span class="thumb-play">▶</span>` : ""}
      <img src="${src}" alt="view ${i + 1}" loading="lazy" onerror="this.parentElement.style.display='none'" />
    </button>`;
  }).join("");
  thumbEl.querySelectorAll(".thumb-btn").forEach((btn) =>
    btn.addEventListener("click", () => { detailMediaIdx = parseInt(btn.dataset.idx); renderDetail(); })
  );

  // Info
  $("#detailName").textContent = p.name;
  $("#detailPrice").textContent = fmt(p.price);
  $("#detailRating").innerHTML = `${stars(p.rating)} <span class="muted">${p.rating} (${p.reviews} reviews)</span>`;
  $("#detailDesc").textContent = p.description;

  // Color picker
  const colorWrap = $("#detailColors");
  colorWrap.innerHTML = `<p class="picker-label">Color: <strong>${pickerColor}</strong></p>` +
    p.colors.map((c) => `
      <button class="swatch-btn ${c === pickerColor ? "selected" : ""}" data-color="${c}"
        style="background:${p.colorHex[c] || "#ccc"}; border-color:${c === pickerColor ? "#000" : "transparent"};"
        title="${c}"></button>
    `).join("");
  colorWrap.querySelectorAll(".swatch-btn").forEach((btn) =>
    btn.addEventListener("click", () => { pickerColor = btn.dataset.color; renderDetail(); })
  );

  // Size picker
  const sizeWrap = $("#detailSizes");
  if (p.sizes.length === 0) {
    sizeWrap.innerHTML = "";
  } else {
    sizeWrap.innerHTML = `<p class="picker-label">Size: <strong>${pickerSize}</strong></p>` +
      p.sizes.map((s) => `
        <button class="size-btn ${s === pickerSize ? "selected" : ""}" data-size="${s}">${s}</button>
      `).join("");
    sizeWrap.querySelectorAll(".size-btn").forEach((btn) =>
      btn.addEventListener("click", () => { pickerSize = btn.dataset.size; renderDetail(); })
    );
  }

  // Nav arrows
  $("#detailPrev").style.display = detailMediaIdx > 0 ? "flex" : "none";
  $("#detailNext").style.display = detailMediaIdx < media.length - 1 ? "flex" : "none";
}

function addFromDetail() {
  const p = detailProduct;
  if (!p) return;
  if (p.sizes.length > 0 && !pickerSize) { showToast("Please select a size"); return; }
  const key = cartKey(p.id, pickerColor, pickerSize);
  cart[key] = (cart[key] || 0) + 1;
  saveCart();
  updateCartUI();
  showToast(`${p.name} added ✦`);
  closeDetail();
}

// --- Cart ---
function setQty(key, delta) {
  cart[key] = (cart[key] || 0) + delta;
  if (cart[key] <= 0) delete cart[key];
  saveCart();
  updateCartUI();
}
function removeItem(key) { delete cart[key]; saveCart(); updateCartUI(); }

function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartSubtotal() {
  return Object.entries(cart).reduce((sum, [key, qty]) => {
    const { id } = parseKey(key);
    const p = PRODUCTS.find((x) => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function updateCartUI() {
  $("#cartCount").textContent = cartCount();
  const itemsWrap = $("#cartItems");
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    itemsWrap.innerHTML = `<div class="cart-empty"><span>🛍️</span>Your bag is empty.<br/>Go find your fit!</div>`;
  } else {
    itemsWrap.innerHTML = entries.map(([key, qty]) => {
      const { id, color, size } = parseKey(key);
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return "";
      const variant = [color, size].filter(Boolean).join(", ");
      const thumb = p.images[0] || "";
      return `
        <div class="cart-item">
          <div class="ci-thumb" style="background:${p.colorHex[color] || "#e2e8f0"}">
            ${thumb ? `<img src="${thumb}" alt="${p.name}" onerror="this.style.display='none'" />` : ""}
          </div>
          <div class="ci-info">
            <div class="ci-name">${p.name}</div>
            <div class="ci-price">${fmt(p.price)} · ${variant}</div>
            <div class="ci-qty">
              <button data-dec="${key}" aria-label="Decrease">−</button>
              <span>${qty}</span>
              <button data-inc="${key}" aria-label="Increase">+</button>
              <button class="ci-remove" data-rm="${key}">remove</button>
            </div>
          </div>
          <strong>${fmt(p.price * qty)}</strong>
        </div>`;
    }).join("");
  }

  itemsWrap.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => setQty(b.dataset.inc, 1)));
  itemsWrap.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => setQty(b.dataset.dec, -1)));
  itemsWrap.querySelectorAll("[data-rm]").forEach((b) => b.addEventListener("click", () => removeItem(b.dataset.rm)));

  const subtotal = cartSubtotal();
  $("#cartTotal").textContent = fmt(subtotal);
  const prog = $("#cartProgress");
  if (subtotal === 0) prog.textContent = "";
  else if (subtotal >= FREE_SHIP) prog.textContent = "🎉 Free shipping unlocked!";
  else prog.textContent = `Add ${fmt(FREE_SHIP - subtotal)} more for free shipping.`;
}

// --- Cart drawer ---
function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#cartOverlay").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#cartOverlay").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
}

// --- Toast ---
let toastTimer;
function showToast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// --- Checkout ---
async function checkout() {
  if (cartCount() === 0) { showToast("Your bag is empty!"); return; }
  const btn = $("#checkoutBtn");
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Taking you to checkout…";
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) throw new Error(data.error || "Checkout unavailable.");
    window.location.href = data.url;
  } catch (err) {
    showToast(err.message);
    btn.disabled = false;
    btn.textContent = original;
  }
}

// --- Init ---
function init() {
  renderFilters();
  renderGrid();
  updateCartUI();

  $("#cartBtn").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#cartOverlay").addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", checkout);
  $("#detailOverlay").addEventListener("click", closeDetail);
  $("#detailClose").addEventListener("click", closeDetail);
  $("#detailAddBtn").addEventListener("click", addFromDetail);
  $("#detailPrev").addEventListener("click", () => { detailMediaIdx = Math.max(0, detailMediaIdx - 1); renderDetail(); });
  $("#detailNext").addEventListener("click", () => {
    if (detailProduct) detailMediaIdx = Math.min(allMedia(detailProduct).length - 1, detailMediaIdx + 1);
    renderDetail();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeCart(); closeDetail(); }
    if (e.key === "ArrowLeft" && detailProduct) { detailMediaIdx = Math.max(0, detailMediaIdx - 1); renderDetail(); }
    if (e.key === "ArrowRight" && detailProduct) { detailMediaIdx = Math.min(allMedia(detailProduct).length - 1, detailMediaIdx + 1); renderDetail(); }
  });

  if (new URLSearchParams(location.search).get("canceled")) {
    showToast("Checkout canceled — your bag is saved.");
    history.replaceState({}, "", location.pathname);
  }
}

document.addEventListener("DOMContentLoaded", init);
