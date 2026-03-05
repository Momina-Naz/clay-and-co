import { addBtnListeners } from './cartService.js'
import { getProducts } from './productService.js'

// ===== Rendering products =====

export function renderProducts(products) {
  const productsContainer = document.getElementById('products-container')
  const cards = products.map((product) => {
    return `
      <div class="product-card">
        <img src="./images/${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <h3>by ${product.artist}</h3>
        <p>$${product.price}</p>
        <button class="main-btn add-btn" data-id="${product.id}">Add to Cart</button>
        <p class="genre-label">${product.genre}</p>
      </div>
    `
  }).join('')

  productsContainer.innerHTML = cards
  addBtnListeners()
}

// ===== Handling filtering =====

export async function applySearchFilter() {
  const search = document.getElementById('search-input').value.trim()
  const filters = {}
  if (search) filters.search = search
  const products = await getProducts(filters)
  renderProducts(products)
}
