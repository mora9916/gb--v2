import express from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import cartRoutes from './cartRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import orderRoutes from './orderRoutes.js';
import shippingAddsRoutes from './shippingAddsRoutes.js';
import paymentMethodRoutes from './paymentMethodsRoutes.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/notifications', notificationRoutes);
router.use('/orders', orderRoutes);
router.use('/shipping', shippingAddsRoutes);
router.use('/paymentMethod', paymentMethodRoutes);
router.use('/products', productRoutes);

export default router;