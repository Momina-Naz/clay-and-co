import { logout } from './logout.js'
import { checkAuth, showHideMenuItems } from './authUI.js'

const logoutBtn = document.getElementById('logout-btn')
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout)
}

// Ensure user is logged in and adjust menu
;(async function init() {
  const name = await checkAuth()
  showHideMenuItems(name)
  if (!name) {
    window.location.href = '/login.html'
  }
})()

const form = document.getElementById('add-product-form')
const errorEl = document.getElementById('error-message')
const successEl = document.getElementById('success-message')
const imageFileInput = document.getElementById('product-image-file')
const imageUrlInput = document.getElementById('product-image')

if (imageFileInput) {
  imageFileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0]
    errorEl.textContent = ''
    successEl.textContent = ''

    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('/api/uploads/image', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        errorEl.textContent = data.error || 'Image upload failed.'
        if (imageUrlInput) imageUrlInput.value = ''
        return
      }

      const data = await res.json()
      if (imageUrlInput) {
        imageUrlInput.value = data.url || ''
      }
      successEl.textContent = 'Image uploaded successfully!'
    } catch (err) {
      console.error(err)
      errorEl.textContent = 'Image upload failed. Please try again.'
      if (imageUrlInput) imageUrlInput.value = ''
    }
  })
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    errorEl.textContent = ''
    successEl.textContent = ''

    const title = document.getElementById('product-title').value.trim()
    const artist = document.getElementById('product-artist').value.trim()
    const category = document.getElementById('product-category').value
    const price = parseFloat(document.getElementById('product-price').value)
    const image = (imageUrlInput?.value || '').trim()
    const description = document.getElementById('product-description').value.trim()

    if (!title || !artist || !category || !image || !price || price <= 0) {
      errorEl.textContent = 'Please fill in all required fields with valid values (and upload an image).'
      return
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          artist,
          genre: category,
          price,
          image,
          description
        })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        errorEl.textContent = data.error || 'Failed to create product.'
        return
      }

      successEl.textContent = 'Product created successfully!'
      form.reset()

      setTimeout(() => {
        window.location.href = '/'
      }, 1200)
    } catch (err) {
      console.error(err)
      errorEl.textContent = 'Something went wrong. Please try again.'
    }
  })
}

