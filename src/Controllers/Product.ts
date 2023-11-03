'use strict'

import { Request, Response } from 'express'
import ProductService from '../Services/Products'
import { Product } from '../types/types'

export default {
  hello: (req: Request, res: Response) =>
    res.status(200).send('Ekstra! Hello in product api!'),

  getProduct: async (req: Request, res: Response) =>
    ProductService.getBy<string>('id', String(req.params.productId || ''))
      .then((result) =>
        res
          .status(result.find ? 200 : 404)
          .json(
            result.find ? result.product : { error: 'Product has not found. ' }
          )
          .end()
      )
      .catch((error) => res.status(500).json({ error }).end()),

  getNewest: async (req: Request, res: Response) =>
    ProductService.getList(1, 4, 'year' as keyof Product, 'desc').then(
      (result) => res.status(200).json(result.data).end()
    ),

  getDiscounted: async (req: Request, res: Response) =>
    ProductService.getList(
      1,
      4,
      'discountPercentage' as keyof Product,
      'desc'
    ).then((result) => res.status(200).json(result.data).end()),

  getProductsList: async (req: Request, res: Response) =>
    ProductService.getList(
      Number(req.query.page || 1),
      Number(req.query.limit || 16),
      (req.query.sort || 'id') as keyof Product,
      (req.query.sortType || 'asc') as 'asc' | 'desc'
    ).then((result) => res.status(200).json(result.data).end()),

  getRecommended: async (req: Request, res: Response) => {
    try {
      const count = 8
      const recommendedProducts = await ProductService.getRecommendedProducts(
        count
      )
      res.status(200).json(recommendedProducts).end()
    } catch (error) {
      res.status(500).json({ error }).end()
    }
  },
}
