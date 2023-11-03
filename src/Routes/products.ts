'use strict'

import { Router } from 'express'
import Controller from '../Controllers/Product'

const router = Router()

router.get('/', Controller.getProductsList)
router.get('/new', Controller.getNewest)
router.get('/discount', Controller.getDiscounted)
router.get('/recommended', Controller.getRecommended)
router.get('/:productId', Controller.getProduct)

export default router
