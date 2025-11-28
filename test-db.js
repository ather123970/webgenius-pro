const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://muhammadather212437:2124377as@cluster0.3zxlmjn.mongodb.net/webgenius-pro?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connection successful!');
        console.log('Database name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

testConnection();
