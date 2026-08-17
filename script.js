const WHATSAPP_NUMBER = "251955071070";

let allProducts = [];

fetch("products.json")
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    buildCategories(products);
    renderProducts(products);
  })
  .catch(() => {
    document.getElementById("products").innerHTML = "<p class='loading'>Could not load products.</p>";
  });

function buildCategories(products) {
  const cats = ["all", ...new Set(products.map(p => p.category).filter(Boolean))];
  const nav = document.getElementById("categories");
  nav.innerHTML = "";
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-chip" + (cat === "all" ? " active" : "");
    btn.textContent = cat === "all" ? "All" : cat;
    btn.dataset.cat = cat;
    btn.onclick = () => {
      document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(cat === "all" ? allProducts : allProducts.filter(p => p.category === cat));
    };
    nav.appendChild(btn);
  });
}

function renderProducts(products) {
  const grid = document.getElementById("products");
  grid.innerHTML = "";
  if (products.length === 0) {
    grid.innerHTML = "<p class='loading'>No items in this category yet.</p>";
    return;
  }
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    const msg = encodeURIComponent("Hello, I'm interested in: " + p.name);
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <a class="order-btn" href="https://wa.me/${WHATSAPP_NUMBER}?text=${msg}" target="_blank">Order on WhatsApp</a>
      </div>
    `;
    grid.appendChild(card);
  });
}
