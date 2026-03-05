import express from 'express'
import { getGenres, getProducts } from '../controllers/productsController.js'

export const productsRouter = express.Router()

productsRouter.get('/categories', getGenres)
productsRouter.get('/', getProducts)