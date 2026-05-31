const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.mongoUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // No DB = no app. Fail fast.
    }
};

module.exports = connectDB;