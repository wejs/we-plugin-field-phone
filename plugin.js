/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/plugin
 */
var phone = require('phone');

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  // set plugin configs
  // plugin.setConfigs({
  // });
  // ser plugin routes
  // plugin.setRoutes({
  // });

  plugin.fieldCellSetValue = function fieldCellSetValue(fieldName) {
    return function setCellValue(val) {
      var v = phone(val);
      if (v && v[0]) {
        this.setDataValue(fieldName, v[0]);
      } else {
        this.setDataValue(fieldName, val);
      }
    }
  }

  plugin.validCellField = function validCellField(value) {
    if (value) {
      var result = phone(value);

      if (!result || !result.length) {
        throw new Error('we-plugin-field-phone:phone.is.invalid');
      }
    }
  }

  return plugin;
};