'use strict';

import { Router } from 'express';
import Controller from '../Controllers/products';

const router = Router(); 

router.get('/', Controller.getAllProducts);  
router.get('/categories', Controller.getCategories);   
router.get('/:productId', Controller.getProductById);
 

export default router;