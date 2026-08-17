const WHATSAPP_NUMBER = "251955071070";

fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById("products");
    grid.innerHTML = "";
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
  })
  .catch(() => {
    document.getElementById("products").innerHTML = "<p class='loading'>Could not load products.</p>";
  });
