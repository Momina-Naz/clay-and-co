import express from 'express'
import multer from 'multer'
import { requireAuth } from '../middleware/requireAuth.js'
import { cloudinary } from '../config/cloudinary.js'

export const uploadsRouter = express.Router()

// Store file in memory so we can send it directly to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

uploadsRouter.post(
  '/image',
  requireAuth,
  upload.single('image'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    try {
      // Convert buffer to data URI so Cloudinary can accept it directly
      const base64 = req.file.buffer.toString('base64')
      const dataUri = `data:${req.file.mimetype};base64,${base64}`

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'clay-and-co/products',
        resource_type: 'image'
      })

      return res.status(201).json({ url: result.secure_url })
    } catch (err) {
      console.error('Cloudinary upload error:', err)
      return res
        .status(500)
        .json({ error: 'Image upload failed. Please try again.' })
    }
  }
)

