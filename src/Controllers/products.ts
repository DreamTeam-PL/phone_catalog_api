'use strict';

import { Request, Response } from 'express';

export default {
    hello: (req:Request, res:Response) =>  res.status(200).send('Ekstra! Hello in api!'),
    getCategories:  (req:Request, res:Response) =>  res.status(200).send(['Phones', 'Tablets', 'itd..']),
    getAllProducts: (req:Request, res:Response) => res.status(200).send('Tutaj wszystkie produkty'),
    getProductById: (req:Request, res:Response) => res.status(200).send('Tutaj produkt o id: ' + req.params.productId),
};