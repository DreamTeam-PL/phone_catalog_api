'use strict'

import { Request, Response } from 'express'
import ProductService from '../Services/Products'; 
import { Product } from '../types/types';



export default {
  hello: (req: Request, res: Response) =>
    res.status(200).send('Ekstra! Hello in product api!'), 
  getProduct:  async (req: Request, res: Response) => ProductService.getProduct(String(req.params.productId || ''))
  .then(result => res.status(result.find ? 200 : 404).json(result.find ? result.product : {}).end())
  .catch((error) => res.status(500).json({ error }).end()),

  getNewest: async (req: Request, res: Response) => ProductService.getList(
    Number(req.query.page || 1),
    Number(req.query.limit || 4),
    (req.query.sort || 'year') as keyof Product,
    (req.query.sortType || 'desc') as 'asc' | 'desc',
    true)
  .then(result => res.status(200).json(result.products).end()),

  getDiscounted:  async (req: Request, res: Response) => ProductService.getList(
    Number(req.query.page || 1),
    Number(req.query.limit || 4),
    (req.query.sort || 'discountPercentage') as keyof Product,
    (req.query.sortType || 'desc') as 'asc' | 'desc')
  .then(result => res.status(200).json(result.products).end()),

  getProductsList: async (req: Request, res: Response) => ProductService.getList(
    Number(req.query.page || 1),
    Number(req.query.limit || 16),
    (req.query.sort || 'id') as keyof Product,
    (req.query.sortType || 'asc') as 'asc' | 'desc')
    .then(result => res.status(200).json(result.products).end()),
  
}
