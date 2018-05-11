
module.exports = function (config, isPluginCommand) {
  if (!config.resolve) {
    config.resolve = {}
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {}
  }

  config.resolve.alias.fs = '@skpm/fs'
}