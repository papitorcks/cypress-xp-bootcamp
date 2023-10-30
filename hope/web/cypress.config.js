require('dotenv').config()

const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: process.env.BASE_URL,
    env: {
      baseApi: process.env.BASE_API,
      mongodb: {
        uri: process.env.MONGO_URI,
        database: process.env.DATABASE_NAME
      }
    }
  }
});
