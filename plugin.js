
var phone = require('phone');

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

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