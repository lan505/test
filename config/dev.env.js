'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    BASE_URL: '"http://localhost:9090"',
    WEBSOCKET_URL: '"ws://localhost:9090"'
})
