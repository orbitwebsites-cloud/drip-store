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
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85&fit=crop",
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
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b984e?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=85&fit=crop",
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
      "https://images.unsplash.com/photo-1570194065650-d99fb4b78f5f?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=85&fit=crop",
    ],
    videos: [],
    colors: ["White", "Pink"],
    colorHex: { White: "#f8fafc", Pink: "#fda4af" },
    sizes: [],
  },
  {
    id: "women-hoodie",
    cjPid: "1794562789012345678",
    name: "Oversized Y2K Crop Hoodie",
    category: "women",
    badge: "Trending",
    price: 24.99,
    rating: 4.7,
    reviews: 541,
    description: "Cozy oversized hoodie with a cropped fit and Y2K aesthetic. Thick fleece, front pocket, drop shoulders. US warehouse.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff3a8?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&q=85&fit=crop",
    ],
    videos: [],
    colors: ["Black", "Cream", "Baby Blue", "Lavender"],
    colorHex: { Black: "#1e293b", Cream: "#fef9ef", "Baby Blue": "#93c5fd", Lavender: "#c4b5fd" },
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "men-puffer",
    cjPid: "1782345678901234567",
    name: "Lightweight Puffer Vest",
    category: "men",
    badge: "Hot",
    price: 39.99,
    rating: 4.6,
    reviews: 892,
    description: "Ultra-light puffer vest with stand collar and zip pockets. Perfect layering piece for fall/winter. Ships from US.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85&fit=crop",
    ],
    videos: [],
    colors: ["Black", "Navy", "Olive", "Burgundy"],
    colorHex: { Black: "#1e293b", Navy: "#1e3a5f", Olive: "#4d6b35", Burgundy: "#881337" },
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "led-nail-lamp",
    cjPid: "1823456789012345678",
    name: "48W UV/LED Gel Nail Lamp",
    category: "beauty",
    badge: "Bestseller",
    price: 19.99,
    rating: 4.8,
    reviews: 2104,
    description: "Professional 48W gel nail curing lamp with 4 timer settings and smart sensor. Works with all gel polishes. Ships from US.",
    images: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1604655404693-ddbb406db9e3?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85&fit=crop",
    ],
    videos: [],
    colors: ["White", "Pink", "Black"],
    colorHex: { White: "#f8fafc", Pink: "#fda4af", Black: "#1e293b" },
    sizes: [],
  },
  {
    id: "bucket-hat",
    cjPid: "1834567890123456789",
    name: "Vintage Washed Bucket Hat",
    category: "women",
    badge: "New",
    price: 14.99,
    rating: 4.6,
    reviews: 378,
    description: "Classic washed cotton bucket hat with a vintage look. Unisex fit, adjustable, UPF 50+ sun protection.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=85&fit=crop",
      "https://images.unsplash.com/photo-1553382871-b8e4b7bcd3a5?w=800&q=85&fit=crop",
    ],
    videos: [],
    colors: ["Beige", "Black", "Sage", "Denim"],
    colorHex: { Beige: "#d4b896", Black: "#1e293b", Sage: "#86a875", Denim: "#5a7fa5" },
    sizes: ["One Size"],
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
