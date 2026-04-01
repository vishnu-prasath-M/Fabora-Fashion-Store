const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
const dns = require('dns');

// Use Google's DNS since local DNS might have trouble with SRV records
dns.setServers(['8.8.8.8']);

// Load env vars
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
mongoose.connection.on('error', (err) => console.log('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

const importData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connection successful!');

        console.log('Clearing existing products...');
        await Product.deleteMany();

        console.log('Inserting products...');
        const products = JSON.parse(
          fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf-8')
        );
        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import:', error.message);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // Delete logic omitted for brevity
} else {
    importData();
}
