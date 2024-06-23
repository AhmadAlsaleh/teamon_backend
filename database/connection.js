const { Sequelize } = require('sequelize');
const path = require('path');

// Load the configuration from config.json
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'config.json');
const config = require(configPath)[env];

// Create a new Sequelize instance using the configuration
const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
