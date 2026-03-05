import { getDBConnection } from './db/db.js'

async function updateProducts() {
  const db = await getDBConnection()

  try {
    // Clear existing products
    await db.run('DELETE FROM products')
    console.log('Cleared existing products')

    // Insert new ceramic products
    const products = [
      // Cups
      ['Cozy Morning Mug', 'Sarah Chen', 'Cups', 24.99, 'cup-one.jpg'],
      ['Artisan Coffee Cup', 'Emma Stone', 'Cups', 22.50, 'cup-two.jpg'],
      ['Hand-Thrown Teacup', 'Luna Martinez', 'Cups', 26.99, 'cup-three.jpg'],
      ['Minimalist Ceramic Mug', 'Alex Kim', 'Cups', 21.00, 'cup-four.jpg'],

      // Plates
      ['Dinner Plate Set', 'Maya Patel', 'Plates', 18.99, 'plate-one.jpg'],
      ['Decorative Serving Plate', 'River Johnson', 'Plates', 32.50, 'plate-two.jpg'],
      ['Hand-Painted Side Plate', 'Zoe Williams', 'Plates', 19.99, 'plate-three.jpg'],
      ['Artisan Dinner Plate', 'Noah Brown', 'Plates', 28.00, 'plate-four.jpg'],

      // Bowls
      ['Soup Bowl Collection', 'Aria Lee', 'Bowls', 16.99, 'bowl-one.jpg'],
      ['Salad Bowl Set', 'Jasper White', 'Bowls', 23.50, 'bowl-two.jpg'],
      ['Serving Bowl', 'Ivy Green', 'Bowls', 27.99, 'bowl-three.jpg'],

      // Vases
      ['Tall Ceramic Vase', 'Sky Blue', 'Vases', 45.99, 'vase-one.jpg'],
      ['Decorative Vase Set', 'Rose Gold', 'Vases', 38.50, 'vase-two.jpg'],
      ['Modern Ceramic Vase', 'Ocean Wave', 'Vases', 42.00, 'vase-three.jpg'],
      ['Artisan Flower Vase', 'Sunset Orange', 'Vases', 35.99, 'vase-four.jpg'],

      // Decorative
      ['Ceramic Sculpture', 'Clay Artist', 'Decorative', 55.99, 'decorative-one.jpg'],
      ['Wall Art Piece', 'Studio Craft', 'Decorative', 48.50, 'decorative-two.jpg'],
      ['Handcrafted Figurine', 'Artisan Works', 'Decorative', 39.99, 'decorative-three.jpg'],
      ['Decorative Ceramic Bowl', 'Earth & Fire', 'Decorative', 44.00, 'decorative-four.jpg'],
      ['Ceramic Art Piece', 'Clay Dreams', 'Decorative', 52.99, 'decorative-five.jpg']
    ]

    for (const [title, artist, genre, price, image] of products) {
      await db.run(
        'INSERT INTO products (title, artist, genre, price, image) VALUES (?, ?, ?, ?, ?)',
        [title, artist, genre, price, image]
      )
    }

    console.log(`Successfully inserted ${products.length} ceramic products!`)
    
    // Show the products
    const allProducts = await db.all('SELECT * FROM products')
    console.table(allProducts)

  } catch (err) {
    console.error('Error updating products:', err.message)
  } finally {
    await db.close()
  }
}

updateProducts()
