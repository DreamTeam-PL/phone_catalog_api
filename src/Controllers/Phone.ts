'use strict'

import { Request, Response } from 'express'
import PhoneService from '../Services/Phone'; 
import { Phone } from '../types/types';



export default { 
    getPhone:  async (req: Request, res: Response) => PhoneService.getBy<string>('id', String(req.params.phoneId))
        .then(result => res.status(result.find ? 200 : 404).json(result.find ? result.data : { error: 'Product has not found. '}).end())
        .catch((error) => res.status(500).json({ error }).end()),

    getPhonesList: async (req: Request, res: Response) => PhoneService.getList(
        Number(req.query.page || 1),
        Number(req.query.limit || 16),
        (req.query.sort || 'id') as keyof Phone,
        (req.query.sortType || 'asc') as 'asc' | 'desc')
            .then(result => res.status(200).json(result.data).end()),
};