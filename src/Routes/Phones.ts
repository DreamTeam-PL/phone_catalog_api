'use strict'

import { Router } from 'express'
import Controller from '../Controllers/Phone'

const router = Router()

router.get('/', Controller.getPhonesList); 
router.get('/:phoneId', Controller.getPhone);

export default router
