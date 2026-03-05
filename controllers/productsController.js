import { getDBConnection } from '../db/db.js'

export async function getGenres(req, res) {
  try {
    const db = await getDBConnection()

    const genreRows = await db.all('SELECT DISTINCT genre FROM products')
    const genres = genreRows.map(row => row.genre)
    res.json(genres)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch genres', details: err.message })
  }
}

export async function getProducts(req, res) {
  try {
    const db = await getDBConnection()

    let query = 'SELECT * FROM products'
    let params = []

    const { genre, search } = req.query

    if (genre) {
      query += ' WHERE genre = ?'
      params.push(genre)
    } else if (search) {
      query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    const products = await db.all(query, params)

    res.json(products)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch products', details: err.message })
  }
}

export async function createProduct(req, res) {
  let { title, artist, genre, price, image, description } = req.body

  // Basic validation
  if (!title || !artist || !genre || !price || !image) {
    return res
      .status(400)
      .json({ error: 'title, artist, genre, price and image are required.' })
  }

  title = title.trim()
  artist = artist.trim()
  genre = genre.trim()
  image = image.trim()
  description = (description || '').trim()

  const allowedGenres = ['Cups', 'Plates', 'Bowls', 'Vases', 'Decorative']
  if (!allowedGenres.includes(genre)) {
    return res
      .status(400)
      .json({ error: 'Invalid genre/category provided.' })
  }

  const numericPrice = Number(price)
  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number.' })
  }

  if (!image) {
    return res.status(400).json({ error: 'Image URL is required.' })
  }

  try {
    const db = await getDBConnection()

    const result = await db.run(
      'INSERT INTO products (title, artist, genre, price, image) VALUES (?, ?, ?, ?, ?)',
      [title, artist, genre, numericPrice, image]
    )

    return res
      .status(201)
      .json({ message: 'Product created', id: result.lastID })
  } catch (err) {
    console.error('Create product error:', err)
    return res
      .status(500)
      .json({ error: 'Failed to create product. Please try again.' })
  }
}
