'use strict'

import { Router } from 'express'
import Controller from '../Controllers/Product'

const router = Router()

router.get('/', Controller.getProductsList)
router.get('/new', Controller.getNewProducts)
router.get('/discount', Controller.getDiscountedProducts)
router.get('/:productId/recommended', Controller.getRecommendedById)
router.get('/:productId', Controller.getProductById)

export default router
