"use strict";
exports.__esModule = true;
exports.fixOptions = exports.guessMaskFromMask = exports.masksMappedByName = exports.chosenFromMask = exports.getOptionsFromMask = void 0;
var prepare_1 = require("./prepare");
var fixOptions = function (object, options) {
    (0, prepare_1.prepareOptionObject)(object);
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
};
exports.fixOptions = fixOptions;
/**
 * Masks can be written following this format 11.1111.11 (with dots to avoid mistakes)
 * so it is necessary to strip all dots out of the masks so we can process them as real
 * masks
 * @param s
 * @returns
 */
var stripDots = function (s) { return s.replace(/[.]/g, ""); };
var substituteTwos = function (s) { return s.replace(/2/g, "1"); };
var defineBooleansOption = function (defaults, bit, option) {
    switch (bit) {
        case "1":
            return true;
        case "0":
            return false;
        default:
            return defaults[option];
    }
};
var defineSortOption = function (modulopt, bit, maskField) {
    var offset = modulopt.optionsOffset;
    var representation = (0, prepare_1.formatedNumberRepresentation)(bit, offset);
    return modulopt.masks[maskField][representation];
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var defaultCall = function (key, previousKey, value) {
    return 0;
};
var masksMappedByName = function (masks, cb, previousKey) {
    if (cb === void 0) { cb = defaultCall; }
    if (previousKey === void 0) { previousKey = ""; }
    var mapped = {};
    for (var _i = 0, _a = Object.entries(masks); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (typeof value === "string" || previousKey) {
            mapped[value] = key;
            var result = cb(key, previousKey, value);
            if (result != 0) {
                return result;
            }
        }
        else if (typeof value === "object") {
            mapped[key] = masksMappedByName(value, cb, key);
        }
    }
    return mapped;
};
exports.masksMappedByName = masksMappedByName;
var applyMasks = function (masks, a, maskField) {
    var result = 0;
    var onAssociation = function (key, previousKey, value) {
        if (maskField === value || maskField === previousKey) {
            // the key is the actual mask
            var b = stripDots(key);
            // bitwise comparison on base 2
            result = parseInt(a, 2) & parseInt(b, 2);
            if (result != 0) {
                return result;
            }
        }
        return 0;
    };
    // invert keys and values of the masks so we have option name as index of the object
    masksMappedByName(masks, onAssociation);
    return result;
};
/**
 * from a string mask containing 0 - 1 - 2, that produce an other mask;
 * "2" => "true":1 ... "1" => "false":0 ... "0" => default : "-"
 * @param setMask
 */
var guessMaskFromMask = function (setMask) {
    var result = [];
    var i = 0;
    setMask = stripDots(setMask);
    for (; i < setMask.length; ++i) {
        var c = setMask.charAt(i);
        result.push(c === "2" ? 1 : c === "1" ? 0 : "-");
    }
    return result.join("");
};
exports.guessMaskFromMask = guessMaskFromMask;
var chosenFromMask = function (modulopt, setMask, maskField) {
    var a = substituteTwos(stripDots(setMask));
    var c = guessMaskFromMask(setMask);
    var result = applyMasks(modulopt.masks, a, maskField);
    if (result > 0) {
        var bitPosFromRight = Math.log2(result);
        var position = -1 + c.length - bitPosFromRight;
        var offset = modulopt.optionsOffset;
        var representation = (0, prepare_1.formatedNumberRepresentation)(result, offset);
        var booleanMask = modulopt.masks[representation];
        // does the result indicates a bit value that aims a boolean ?
        if (typeof booleanMask === "string") {
            var result_1 = defineBooleansOption(modulopt.defaults, c[position], booleanMask);
            return result_1;
        }
        else {
            // INFO: Treat non binar cases
            return defineSortOption(modulopt, result, maskField);
        }
    }
    var option = /[\d.]/g.test(maskField)
        ? modulopt.masks[maskField]
        : maskField;
    return modulopt.defaults[option];
};
exports.chosenFromMask = chosenFromMask;
var getOptionsFromMask = function (modulopt, optionMask) {
    var options = {};
    var masks = masksMappedByName(modulopt.masks);
    Object.keys(masks).map(function (k) {
        options[k] = chosenFromMask(modulopt, optionMask, k);
    });
    return options;
};
exports.getOptionsFromMask = getOptionsFromMask;
