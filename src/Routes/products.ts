'use strict'

import { Router } from 'express'
import Controller from '../Controllers/products'

const router = Router()

router.get('/', Controller.getProductsList);
router.get('/new', Controller.getNewest);
router.get('/discount', Controller.getDiscounted);
router.get('/:productId', Controller.getProduct);

export default router
