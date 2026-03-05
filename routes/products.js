import express from 'express'
import { getGenres, getProducts, createProduct } from '../controllers/productsController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const productsRouter = express.Router()

productsRouter.get('/categories', getGenres)
productsRouter.get('/', getProducts)
productsRouter.post('/', requireAuth, createProduct)