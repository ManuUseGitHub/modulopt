"use strict";
exports.__esModule = true;
exports.fixOptions = exports.stickOptions = void 0;
var dialog_1 = require("./dialog");
var MaskBuilder_1 = require("./MaskBuilder");
var prepare_1 = require("./prepare");
var mb = MaskBuilder_1.MaskBuilder.getInstance();
var fixOptions = function (object, options) {
    (0, prepare_1.prepareOptionObject)(object);
    if (object.modulopt) {
        Object.keys(object.modulopt.defaults).map(function (key) {
            var value = options[key];
            if (value !== undefined) {
                var customs = object.modulopt.masks[key];
                if (customs) {
                    // if the value is one of the multiple choice options
                    if (Object.values(customs).includes(value)) {
                        object.options[key] = options[key];
                    }
                }
                else if (typeof object.modulopt.defaults[key] === typeof options[key]) {
                    object.options[key] = options[key];
                }
                else if (object.modulopt.defaults[key] === null) {
                    object.options[key] = options[key];
                }
            }
        });
    }
};
exports.fixOptions = fixOptions;
var stickOptions = function (object) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    options
        .sort(function (a, b) { return (typeof a < typeof b ? 1 : -1); })
        .forEach(function (optSet) {
        if (typeof optSet === "string") {
            object.options = mb.getOptionsFromMask(object.modulopt, optSet);
        }
        else if (typeof optSet === "object") {
            fixOptions(object, optSet);
            (0, dialog_1.checkValidCallOptions)(object, optSet);
        }
    });
    return object;
};
exports.stickOptions = stickOptions;
