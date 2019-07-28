const webpack = require('webpack')
const config = require('../config/webpack.config')

webpack(config()).watch()