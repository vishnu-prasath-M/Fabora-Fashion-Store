const express = require('express');
const router = express.Router();
const { adminLogin, protectAdmin } = require('../controllers/adminController');
const {
    getAllProducts,
    getStats,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/adminProductController');

// Admin login
router.post('/login', adminLogin);

// Protected routes
router.get('/products', protectAdmin, getAllProducts);
router.get('/stats', protectAdmin, getStats);
router.post('/products', protectAdmin, createProduct);
router.put('/products/:id', protectAdmin, updateProduct);
router.delete('/products/:id', protectAdmin, deleteProduct);

module.exports = router;
