"use strict";exports.__esModule=!0,exports.populateOptionsObjects=exports.stick=exports.optionize=void 0;var prepare_1=require("./prepare");exports.populateOptionsObjects=prepare_1.populateOptionsObjects;var apply_1=require("./apply"),optionize=function(o,t,e){void 0===e&&(e=!1);var p={},i=(0,prepare_1.beforeOptionize)(o,t),t=i.sortedVector,i=i.totalOffset;return(0,prepare_1.buildDefinition)(i,o.modulopt,{cpt:0,optionVector:t,definitions:p}),(0,prepare_1.populateOptionsObjects)(o.modulopt,p),hintDefinitions(o,e),o.options=Object.assign({},o.modulopt.defaults),o};exports.optionize=optionize;var hintDefinitions=function(o,t){var e;return t&&(e=require("json-stringify-pretty-compact"),t=require("json-colorizer"),console.log('option configuration for the instance of "'+o.constructor.name+'" (class) :\n',t(e(o.modulopt)))),o},stick=function(t){for(var o=[],e=1;e<arguments.length;e++)o[e-1]=arguments[e];return o.sort(function(o,t){return typeof o<typeof t?1:-1}).forEach(function(o){"string"==typeof o?t.options=(0,apply_1.getOptionsFromMask)(t.modulopt,o):"object"==typeof o&&(0,apply_1.fixOptions)(t,o)}),t};exports.stick=stick;