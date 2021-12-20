"use strict";
exports.__esModule = true;
exports.checkValidCallOptions = exports.hintDefinitions = void 0;
var dateNTime = require("date-and-time");
var hintDefinitions = function (object, hint) {
    if (hint) {
        var stringify = require("json-stringify-pretty-compact");
        var colorizeJson = require("json-colorizer");
        console.log("modulopt configuration for the instance of \"" + object.constructor.name + "\" (class) :\n", colorizeJson(stringify(object.modulopt)));
    }
    return object;
};
exports.hintDefinitions = hintDefinitions;
var getNowString = function (date, format) {
    if (format === void 0) { format = "hh:mm A [GMT]Z"; }
    return dateNTime.format(date, format);
};
var checkValidCallOptions = function (data, optSet) {
    if (data.modulopt.config) {
        var moduloptConfig_1 = data.modulopt.config.options;
        Object.keys(optSet).forEach(function (key) {
            if (!(key in data.options)) {
                var verb = moduloptConfig_1.mismatch;
                if (verb === "throw") {
                    throw "MODULOPT EXCEPTION c404. Non existing option : " + key + " on " + data.constructor.name + " options";
                }
                else if (verb !== "ignore" && verb !== "report") {
                    // verbs and interactions
                    var vmi = {
                        inform: { interaction: "info", type: "INFO" },
                        yell: { interaction: "error", type: "ERROR" },
                        warn: { interaction: "warn", type: "WARNING" },
                        debug: { interaction: "log", type: "DEBUG" }
                    };
                    console[vmi[verb].interaction]("MODULOPT " + vmi[verb].type + " c404. Non existing option : " + key + " on " + data.constructor.name + " options");
                }
                else if (verb === "report") {
                    var time = new Date();
                    var log = {
                        timestamp: time.getTime(),
                        message: "[" + getNowString(time) + "] MODULOPT MISMATCH c404. Non existing option : " + key
                    };
                    data.modulopt.logs.push(log);
                }
            }
        });
    }
};
exports.checkValidCallOptions = checkValidCallOptions;
