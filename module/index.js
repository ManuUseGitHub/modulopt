"use strict";
exports.__esModule = true;
exports.populateOptionsObjects = exports.stick = exports.optionize = void 0;
var prepare_1 = require("./prepare");
exports.populateOptionsObjects = prepare_1.populateOptionsObjects;
var apply_1 = require("./apply");
var optionize = function (object, optionVector, hint, applied) {
    if (hint === void 0) { hint = false; }
    if (applied === void 0) { applied = {}; }
    var definitions = {};
    var _a = (0, prepare_1.beforeOptionize)(object, optionVector), sortedVector = _a.sortedVector, totalOffset = _a.totalOffset;
    var buildDef = { cpt: 0, optionVector: sortedVector, definitions: definitions };
    (0, prepare_1.buildDefinition)(totalOffset, object.modulopt, buildDef);
    // attach the
    (0, prepare_1.populateOptionsObjects)(object.modulopt, definitions);
    var configured = stick(object, applied);
    hintDefinitions(object, hint);
    return configured;
};
exports.optionize = optionize;
var hintDefinitions = function (object, hint) {
    if (hint) {
        var stringify = require("json-stringify-pretty-compact");
        var colorizeJson = require("json-colorizer");
        console.log("option configuration for the instance of \"" + object.constructor.name + "\" (class) :\n", colorizeJson(stringify(object.modulopt)));
    }
    return object;
};
var stick = function (object) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    options
        .sort(function (a, b) { return typeof a < typeof b ? 1 : -1; })
        .forEach(function (optSet) {
        if (typeof optSet === "string") {
            object.options = (0, apply_1.getOptionsFromMask)(object.modulopt, optSet);
        }
        else if (typeof optSet === "object") {
            (0, apply_1.fixOptions)(object, optSet);
        }
    });
    return object;
};
exports.stick = stick;
