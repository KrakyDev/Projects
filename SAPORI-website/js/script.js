/* ════════════════════════════════════════
   script.js — Sapori Restaurant
   Handles: cart, menu rendering, navbar,
   mobile menu, drawer, toast, reveal
════════════════════════════════════════ */

// ─── CART STATE (shared via sessionStorage so it persists across pages) ───
function getCart() {
  try { return JSON.parse(sessionStorage.getItem('sapori_cart')) || []; }
  catch { return []; }
}
function saveCart(cart) {
  sessionStorage.setItem('sapori_cart', JSON.stringify(cart));
}

// ─── MENU DATA ───
const menuData = {
  meals: [
    { id: 1, name: 'Grilled Salmon Fillet',     desc: 'Wild-caught salmon with lemon herb butter, seasonal vegetables and roasted potatoes',          price: 28.00, tag: "Chef's Pick",  img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80' },
    { id: 2, name: 'Truffle Mushroom Risotto',  desc: 'Creamy arborio rice with wild mushrooms, parmesan, and black truffle oil',                       price: 22.00, tag: 'Vegetarian',  img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80' },
    { id: 3, name: 'Slow-Roasted Lamb Rack',    desc: 'Australian lamb with rosemary jus, mint gremolata, and root vegetable purée',                    price: 36.00, tag: 'Signature',   img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80' },
    { id: 4, name: 'Pan-Seared Duck Breast',    desc: 'Confit duck leg with cherry reduction, wilted greens, and crispy polenta',                       price: 32.00, tag: '',            img: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&q=80' },
    { id: 5, name: 'Pasta alle Vongole',        desc: 'Fresh clams in white wine, garlic, chili, and extra virgin olive oil on linguine',               price: 24.00, tag: 'Seafood',     img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80' },
    { id: 6, name: 'Wagyu Beef Burger',         desc: 'Premium wagyu patty, aged cheddar, caramelized onion, truffle aioli, brioche bun',               price: 26.00, tag: '',            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  ],
  starters: [
    { id: 19, name: 'Burrata & Heritage Tomato', desc: 'Stracciatella burrata, heirloom tomatoes, basil oil, Maldon salt, aged balsamic',               price: 16.00, tag: 'Vegetarian',  img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' },
    { id: 20, name: 'Crispy Calamari Fritti',    desc: 'Golden fried squid rings with romesco sauce, preserved lemon aioli, micro herbs',               price: 14.00, tag: 'Seafood',     img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' },
    { id: 21, name: 'Charcuterie Board',         desc: "Chef's selection of cured meats, olives, pickles, artisan crackers, mustards",                  price: 20.00, tag: 'Shares',      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
    { id: 22, name: 'French Onion Soup',         desc: 'Slow-caramelized onion consommé, gruyère crouton, fresh thyme',                                 price: 12.00, tag: 'Warm',        img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
  ],
  drinks: [
    { id: 7,  name: 'Artisan Cold Brew',         desc: 'House-roasted beans, slow-steeped 18 hours, served over hand-cut ice',                          price:  7.00, tag: 'Popular',     img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80' },
    { id: 8,  name: 'Mango Sunrise Mocktail',    desc: 'Fresh mango, passionfruit, coconut water, lime, and sparkling water',                            price:  8.50, tag: 'Non-Alcoholic',img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&q=80' },
    { id: 9,  name: 'Signature Espresso Martini',desc: 'Triple shot espresso, vanilla vodka, coffee liqueur, demerara syrup',                            price: 14.00, tag: 'Cocktail',    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80' },
    { id: 10, name: 'Rose Lychee Fizz',          desc: 'Rose syrup, lychee juice, elderflower cordial, prosecco, fresh rose petals',                    price: 13.00, tag: 'Cocktail',    img: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?w=400&q=80' },
    { id: 11, name: 'Matcha Ceremonial Latte',   desc: 'Grade-A Japanese matcha, oat milk, honey, served hot or iced',                                  price:  8.00, tag: 'Healthy',     img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80' },
    { id: 12, name: 'House Sangria Pitcher',     desc: 'Spanish rioja, brandy, fresh citrus fruits, cinnamon, served chilled (serves 4)',               price: 38.00, tag: 'Shares',      img: 'https://images.unsplash.com/photo-1570633512884-b9e91b26c573?w=400&q=80' },
  ],
  desserts: [
    { id: 13, name: 'Valrhona Chocolate Fondant',desc: 'Warm dark chocolate lava cake, vanilla bean ice cream, raspberry coulis',                       price: 12.00, tag: 'Bestseller',  img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
    { id: 14, name: 'Crème Brûlée Classique',    desc: 'Vanilla custard with caramelized sugar crust, candied orange zest',                             price: 10.00, tag: 'Classic',     img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80' },
    { id: 15, name: 'Tiramisu della Casa',       desc: 'House-made tiramisu with Kahlúa-soaked ladyfingers, mascarpone, cocoa',                         price: 11.00, tag: '',            img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
    { id: 16, name: 'Mango Panna Cotta',         desc: 'Silky coconut panna cotta, alphonso mango compote, toasted coconut flakes',                     price: 10.00, tag: 'Seasonal',    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
    { id: 17, name: 'Cheese Board Selection',    desc: 'Five artisan cheeses, honey, quince paste, walnut bread, seasonal fruits',                      price: 22.00, tag: 'Shares',      img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&q=80' },
    { id: 18, name: 'Lemon Tart Provençale',     desc: 'Buttery shortcrust pastry, lemon curd, Italian meringue, candied lemon',                        price: 10.00, tag: '',            img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80' },
  ],
};

// ─── FEATURED ITEMS (used on home page) ───
const featuredItems = [menuData.meals[0], menuData.drinks[0], menuData.desserts[0]];

// ─── CART FUNCTIONS ───
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  saveCart(cart);
  updateCartUI();
  renderDrawerItems();
  showToast(`${item.name} added to cart`);
}

function removeFromCart(id) {
  const cart = getCart().filter(c => c.id !== id);
  saveCart(cart);
  updateCartUI();
  renderDrawerItems();
  if (document.getElementById('cart-section')) renderOrderPage();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter(c => c.id !== id));
  } else {
    saveCart(cart);
  }
  updateCartUI();
  renderDrawerItems();
  if (document.getElementById('cart-section')) renderOrderPage();
}

function getCartTotal() {
  return getCart().reduce((s, c) => s + c.price * c.qty, 0);
}

function updateCartUI() {
  const total = getCart().reduce((s, c) => s + c.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.classList.toggle('visible', total > 0);
  });
}

// ─── CART DRAWER ───
function openDrawer() {
  document.querySelector('.cart-overlay')?.classList.add('open');
  document.querySelector('.cart-drawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderDrawerItems();
}
function closeDrawer() {
  document.querySelector('.cart-overlay')?.classList.remove('open');
  document.querySelector('.cart-drawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderDrawerItems() {
  const container = document.querySelector('.drawer-items');
  if (!container) return;
  const cart = getCart();
  const totalEl = document.querySelector('.drawer-total span:last-child');

  if (!cart.length) {
    container.innerHTML = '<div class="drawer-empty">🛒<br>Your cart is empty</div>';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="drawer-item">
      <img src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'">
      <div class="drawer-item-info">
        <div class="drawer-item-name">${item.name}</div>
        <div class="drawer-item-price">$${item.price.toFixed(2)} × ${item.qty}</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
  if (totalEl) totalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

// ─── TOAST ───
function showToast(msg) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── NAVBAR SCROLL ───
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── MOBILE MENU ───
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── ACTIVE NAV LINK ───
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

// ─── MENU PAGE ───
function renderMenu() {
  Object.keys(menuData).forEach(cat => {
    const grid = document.querySelector(`#menu-${cat} .menu-grid`);
    if (!grid) return;
    grid.innerHTML = menuData[cat].map(item => `
      <div class="menu-item reveal">
        <div class="menu-item-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'">
        </div>
        <div class="menu-item-body">
          ${item.tag ? `<div class="menu-item-tag">${item.tag}</div>` : ''}
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="menu-item-footer">
            <span class="price">$${item.price.toFixed(2)}</span>
            <button class="add-btn" onclick='addToCart(${JSON.stringify(item)})' aria-label="Add to cart">+</button>
          </div>
        </div>
      </div>
    `).join('');
  });
  setTimeout(initReveal, 50);
}

function initMenuTabs() {
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`menu-${tab.dataset.cat}`)?.classList.add('active');
      setTimeout(initReveal, 50);
    });
  });
}

// ─── HOME PAGE — FEATURED ───
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  grid.innerHTML = featuredItems.map((item, i) => `
    <div class="featured-card reveal reveal-delay-${i + 1}">
      <div class="featured-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'">
        ${item.tag ? `<div class="featured-card-tag">${item.tag}</div>` : ''}
      </div>
      <div class="featured-card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="featured-card-footer">
          <span class="price">$${item.price.toFixed(2)}</span>
          <button class="add-btn" onclick='addToCart(${JSON.stringify(item)})' aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(initReveal, 50);
}

// ─── ORDER PAGE ───
function renderOrderPage() {
  const cartSection = document.getElementById('cart-section');
  if (!cartSection) return;
  const cart = getCart();

  if (!cart.length) {
    cartSection.innerHTML = `
      <h2>Your Order</h2>
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty. Add items from our menu!</p>
        <a href="menu.html" class="btn btn-primary">Browse Menu</a>
      </div>`;
    return;
  }

  const subtotal = getCartTotal();
  const delivery = 3.99;
  const total = subtotal + delivery;

  cartSection.innerHTML = `
    <h2>Your Order</h2>
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'">
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
          </div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>`).join('')}
    </div>
    <div class="cart-totals">
      <div class="total-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="total-row"><span>Delivery Fee</span><span>$${delivery.toFixed(2)}</span></div>
      <div class="total-row grand"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    </div>`;
}

function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!getCart().length) { showToast('Please add items first!'); return; }
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Processing...';
    btn.disabled = true;
    setTimeout(() => {
      saveCart([]);
      updateCartUI();
      renderOrderPage();
      renderDrawerItems();
      btn.textContent = 'Place Order';
      btn.disabled = false;
      document.getElementById('order-success')?.classList.add('show');
      showToast('🎉 Order placed successfully!');
      form.reset();
      setTimeout(() => document.getElementById('order-success')?.classList.remove('show'), 5000);
    }, 1800);
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      document.getElementById('contact-success')?.classList.add('show');
      form.reset();
      setTimeout(() => document.getElementById('contact-success')?.classList.remove('show'), 4000);
    }, 1500);
  });
}

// ─── CART DRAWER EVENTS ───
function initCartDrawer() {
  document.querySelector('.cart-btn')?.addEventListener('click', openDrawer);
  document.querySelector('.close-drawer')?.addEventListener('click', closeDrawer);
  document.querySelector('.cart-overlay')?.addEventListener('click', closeDrawer);
  document.getElementById('drawer-checkout-btn')?.addEventListener('click', () => {
    closeDrawer();
    window.location.href = 'order.html';
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  initNavbar();
  initMobileMenu();
  initCartDrawer();
  setActiveNav();
  updateCartUI();
  renderDrawerItems();
  initReveal();

  // Page-specific init
  renderFeatured();   // index.html
  renderMenu();       // menu.html
  initMenuTabs();     // menu.html
  renderOrderPage();  // order.html
  initCheckoutForm(); // order.html
  initContactForm();  // contact.html
});
