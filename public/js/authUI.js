// ===== Check if user is signed in =====
export async function checkAuth() {
  try {
    const res = await fetch('/api/auth/me')

    if (!res.ok) {
      console.warn('Unexpected response:', res.status)
      return false
    } 
  
    const user = await res.json()
    if (!user.isLoggedIn) {
      return false
    }
    return user.name

  } catch (err) {
    console.log(err, 'Auth check failed')
    return false 
  }
}

// ===== Greet user or guest =====

export function renderGreeting(name) {
  const user = name ? name : 'Guest'
  document.getElementById('greeting').textContent = `Welcome, ${user}!`
}

// ===== Only display logout button if logged in, else display log in/sign in options =====

export function showHideMenuItems(name) {
  const isLoggedIn = !!name
  const loginLink = document.getElementById('login')
  const signupLink = document.getElementById('signup')
  const logoutBtn = document.getElementById('logout-btn')
  const addProductLink = document.getElementById('add-product-link')

  if (loginLink) loginLink.style.display = isLoggedIn ? 'none' : 'inline'
  if (signupLink) signupLink.style.display = isLoggedIn ? 'none' : 'inline'
  if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'inline' : 'none'
  if (addProductLink) addProductLink.style.display = isLoggedIn ? 'inline' : 'none'
}
