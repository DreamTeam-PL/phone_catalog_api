'use strict'

import { Request, Response } from 'express'
import ProductService from '../Services/Products';  
import { Product } from '../types/types';
import { Op, Sequelize } from 'sequelize';



export default { 

  getProductById:  async (req: Request, res: Response) => ProductService.getPhoneBy<string>('id', String(req.params.productId || ''))
    .then(result => res.status(result.find ? 200 : 404).json(result.find ? result.data : { error: 'Product has not found. '}).end())
    .catch((error) => res.status(500).json({ error }).end()),

  getRecommendedById: async (req: Request, res: Response) => ProductService.getPhoneBy<string>('id', String(req.params.productId || ''))
    .then(result => {
      ProductService.getPhoneList({
        page: 1, 
        limit: 4, 
        sortBy: 'id',
        sortType: 'desc',
        where: {
          namespaceId: result.data?.namespaceId,  
        }
      }).then(find => {
        res.status(200).json(find)
      })
  }),

  getNewProducts:  async (req: Request, res: Response) => ProductService.getProductList({
    page: 1, 
    limit: 4, 
    sortBy: 'year',
    sortType: 'desc',
  }).then(result => res.status(200).json(result.data).end()),

  getDiscounted:  async (req: Request, res: Response) => ProductService.getProductList({
    page: 1, 
    limit: 4, 
    sortBy: 'discountPercentage',
    sortType: 'desc',
    where: Sequelize.where(Sequelize.literal('"fullPrice" - "price"'), { [Op.gt]: 0 } )  
  }).then(result => res.status(200).json(result.data).end()),

  getProductsList: async (req: Request, res: Response) => ProductService.getProductList({
      page: Number(req.query.page || 1), 
      limit: Number(req.query.limit || 16), 
      sortBy: (req.query.sort || 'id') as keyof Product,
      sortType: (req.query.sortType || 'asc') as 'asc' | 'desc'
    }).then(result => res.status(200).json(result.data).end()), 
}
