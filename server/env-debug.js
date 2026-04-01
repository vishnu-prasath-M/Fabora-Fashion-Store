const dotenv = require('dotenv');
dotenv.config();
console.log('MONGO_URI Length:', process.env.MONGO_URI ? process.env.MONGO_URI.length : 0);
console.log('MONGO_URI Start:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 15) : 'N/A');
