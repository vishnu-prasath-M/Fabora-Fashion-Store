const Product = require('../models/Product');

// @desc    Get all products (admin view)
// @route   GET /api/admin/products
// @access  Admin
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// @desc    Get product statistics
// @route   GET /api/admin/stats
// @access  Admin
const getStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        
        // Get categories count
        const categories = await Product.distinct('category');
        const totalCategories = categories.length;
        
        // Get products by category
        const productsByCategory = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.json({
            totalProducts,
            totalCategories,
            productsByCategory,
            categories
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Admin
const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            category,
            description,
            brand,
            sizes,
            colors,
            image,
            altImage,
            countInStock
        } = req.body;

        const product = new Product({
            name,
            price: Number(price),
            category,
            description,
            brand: brand || 'MAISON',
            sizes: sizes || [],
            colors: colors || [],
            image,
            altImage: altImage || image,
            countInStock: Number(countInStock) || 0,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const {
            name,
            price,
            category,
            description,
            brand,
            sizes,
            colors,
            image,
            altImage,
            countInStock
        } = req.body;

        // Debug logging
        console.log('Update Product - ID:', req.params.id);
        console.log('Image received:', image ? `Yes (length: ${image.length})` : 'No');

        product.name = name || product.name;
        product.price = price ? Number(price) : product.price;
        product.category = category || product.category;
        product.description = description || product.description;
        product.brand = brand || product.brand;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        
        // Explicitly update image if provided (even if empty string)
        if (image !== undefined) {
            product.image = image;
            console.log('Image updated in product object');
        }
        if (altImage !== undefined) {
            product.altImage = altImage;
        }
        
        product.countInStock = countInStock !== undefined ? Number(countInStock) : product.countInStock;

        const updatedProduct = await product.save();
        console.log('Product saved successfully');
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getStats,
    createProduct,
    updateProduct,
    deleteProduct
};
