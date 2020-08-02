const path = require('path')

module.exports = async ({ config, mode }) => {
  config.resolve.alias['@hmudesign/hedra'] = path.join(__dirname, '..')

  return config
}
