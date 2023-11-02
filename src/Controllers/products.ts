'use strict'

import { Request, Response } from 'express'
import Product from '../models/Phone'

export default {
  hello: (req: Request, res: Response) =>
    res.status(200).send('Ekstra! Hello in product api!'),
  getCategories: (req: Request, res: Response) =>
    res.status(200).send(['Phones', 'Tablets', 'itd..']),
  getProductById: (req: Request, res: Response) =>
    res.status(200).send('Tutaj produkt o id: ' + req.params.productId),
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll()

      res.status(200).json(products)
    } catch (error) {
      console.error('Błąd podczas pobierania wszystkich produktów:', error)
      res
        .status(500)
        .json({ error: 'Wystąpił błąd podczas pobierania produktów.' })
    }
  },
}
