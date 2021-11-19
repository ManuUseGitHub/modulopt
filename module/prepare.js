"use strict";
exports.__esModule = true;
exports.beforeOptionize = exports.prepareOptionObject = exports.sortEntries = exports.populateOptionsObjects = exports.formatedNumberRepresentation = exports.buildDefinition = exports.computeOffset = void 0;
var beforeOptionize = function (object, optionVector) {
    var sortedVector = [];
    sortedVector = sortEntries(optionVector);
    // used to define the size of masks
    var totalOffset = computeOffset(optionVector);
    object.modulopt = {};
    object.modulopt.optionsOffset = totalOffset;
    // initialize the different object to attach to the IUseOption object
    object.modulopt.masks = {};
    object.modulopt.free = {};
    object.modulopt.defaults = {};
    return { sortedVector: sortedVector, totalOffset: totalOffset };
};
exports.beforeOptionize = beforeOptionize;
/**
 * Transforms decimal number into binary representation
 * @param dec
 * @returns
 */
var dec2bin = function (dec) {
    return (dec >>> 0).toString(2);
};
/**
 * Pads zero (zero fill a number). It provides a string since 0 before any number is not significant
 * @param num the number that has to gain the padding
 * @param size the offset of the resulting string
 * @returns
 */
var pad = function (num, size) {
    num = num.toString();
    while (num.length < size)
        num = "0" + num;
    return num;
};
/**
 * Every option will occupied a certain amount of space as a bit reprensentation so to be sure nothing
 * overlaps, and mostly, have consistent zero-filled (padded) masks, we have to compute the total offset
 * @param optionVector
 * @returns
 */
var computeOffset = function (optionVector) {
    var offset = 0;
    optionVector
        .filter(function (row) { return typeof row[1] === "boolean" || row[2]; })
        .map(function (row) {
        // sum an offset stored in a cell of an array (may not exist so fallback of 1)
        offset += row[2] ? row[2].length : 1;
    });
    // ceiled integer division multiplied by 4 so we have multiples of four. Perfect for bin reprsentation
    return Math.ceil(offset / 4) * 4;
};
exports.computeOffset = computeOffset;
/**
 * Transform a number into its sero filled dotted binary format. 1 => 0000.0000.0001
 *
 * @param optDef defines the default value for an option and its string masks
 * @param offset the offset teken by possible values of the mask in binary : 1 take , 0 leave
 * @param totalOffset indicate the whole space taken by all option mask + 0 fill included
 * @param cpt the general counter
 */
var assignMasks = function (optDef, totalOffset, cpt) {
    var representation = formatedNumberRepresentation(Math.pow(2, cpt), totalOffset);
    // (join every slices by a dot then push to the masks field)
    // [0000,0000,1000] => ["0000.0000.1000","0000.0001.0000"]
    if (representation !== "-1") {
        optDef.mask = representation;
    }
};
/**
 * Transforms a number value to its binary representation with 1 dot every 4th bit
 * @param value
 * @param totalOffset
 * @returns
 */
var formatedNumberRepresentation = function (value, totalOffset) {
    // transform the position on the iteration into a binary representation as it is a power of 2 bin
    // 2^(cpt+i) => 1, 2, 4, 8 =>  0 , 1 , 10 , 100 , 1000
    var binRep = dec2bin(value);
    // = for every 4 bit represented, add a dot so it is easier to manupulate as a human =
    // (division into array of strings) => 000000001000 => [0000,0000,1000]
    var sliceOfFour = pad(binRep, totalOffset).match(/.{1,4}/g);
    if (sliceOfFour) {
        return sliceOfFour.join(".");
    }
    return "-1";
};
exports.formatedNumberRepresentation = formatedNumberRepresentation;
var defineInterval = function (row, cpt) {
    return typeof row[1] === "boolean"
        ? [cpt]
        : row[2]
            ? [cpt, -1 + cpt + row[2].length]
            : [cpt];
};
var populateOptionsObjects = function (modulopt, definitions) {
    var maskKeys = Object.keys(modulopt.masks);
    var defKeys = Object.keys(definitions);
    defKeys.map(function (key) {
        modulopt.defaults[key] = definitions[key]["default"];
        if (definitions[key].mask) {
            treatObjectWithMask(modulopt, definitions, key);
        }
        else if (!definitions[key].mask && !maskKeys.includes(key)) {
            treatObjectWithoutMask(modulopt, definitions, key);
        }
    });
};
exports.populateOptionsObjects = populateOptionsObjects;
var prepareOptionObject = function (object) {
    if (!object.options) {
        object.options = Object.assign({}, object.modulopt.defaults);
    }
    else {
        // use the copy of the current state of the options
        object.options = Object.assign({}, object.options);
    }
};
exports.prepareOptionObject = prepareOptionObject;
var treatObjectWithMask = function (modulopt, definitions, key) {
    // add a mask to the IUseOption object
    var mask = definitions[key].mask;
    modulopt.masks[mask] = key;
    // add an entry to defaults
    modulopt.defaults[key] = definitions[key]["default"];
};
var treatObjectWithoutMask = function (modulopt, definitions, key) {
    // add an entry to free options.
    modulopt.free[key] = { type: typeof definitions[key]["default"] };
};
var sortEntries = function (optionVector) {
    return optionVector.sort(function (a, b) {
        var result = a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
        return result;
    });
};
exports.sortEntries = sortEntries;
var treatDefinitionsWithIntervals = function (row, totalOffset, modulopt, buildDef) {
    var definitions = buildDef.definitions;
    // the option name is contained in the first cell
    var option = row[0];
    // if the second ceil contain a default that is a boolean, we asume that the offset is 1,
    // therefore the postion is cpt or the interval of cpt + offset
    var interval = defineInterval(row, buildDef.cpt);
    // define the default and masks (just simple arrays either with just 1 or an interval)
    var maskDef = { "default": row[1] };
    // will write the masks property with good formated masks
    if (row.length === 2 && typeof row[1] === "boolean") {
        assignMasks(maskDef, totalOffset, buildDef.cpt);
    }
    // will write the multiOptMasks property with good formated masks
    assignValuePerBit(modulopt, row, buildDef.cpt, totalOffset);
    definitions[option] = maskDef;
    buildDef.cpt = interval[interval.length - 1] + 1; // the last element of the interval +1
};
/**
 * Help to build the definitions about available straight forward options and their defaults
 * @param row
 * @param buildDef parameter object that holds definitions and optionVector
 */
var treatDefinitionsWithoutInterval = function (row, buildDef) {
    var definitions = buildDef.definitions;
    // store the name of the option
    var option = row[0];
    // the default of the option is either the element 1 of the record or null if ther is no element 1
    var _default = typeof row[1] !== "undefined" ? row[1] : null;
    // create a new entry on the definitions object
    definitions[option] = { "default": _default };
};
var buildDefinition = function (totalOffset, modulopt, buildDef) {
    buildDef.optionVector.map(function (row) {
        if (row[2] !== undefined || typeof row[1] === "boolean") {
            treatDefinitionsWithIntervals(row, totalOffset, modulopt, buildDef);
            // filter options without intervals or those that cannot have a binary representation
        }
        else if (1 <= row.length &&
            row.length <= 2 &&
            typeof row[1] !== "boolean") {
            treatDefinitionsWithoutInterval(row, buildDef);
        }
    });
};
exports.buildDefinition = buildDefinition;
/**
 * Gives a bit representation for every multiChoices option
 * @param object
 * @param row entry [optionName [,default][,multiChoices] ]
 * @param cpt counter
 * @param totalOffset totalizer of the offset
 */
var assignValuePerBit = function (modulopt, row, cpt, totalOffset) {
    if (row[2]) {
        // compute the current element offset by looking at the length of its 3rd collumn
        var offset = row[2].length;
        // the option name is in the first collumn
        var option = row[0];
        // initialisation on the object that will host the options
        modulopt.masks[option] = {};
        // for every option that is coded on multiple bit, we compute the range of bits that
        // it takes by using the incrementation
        for (var i = 0; i < offset; ++i) {
            // get the pow2 of the cpt value ==> to transform into binary representation
            var bit = Math.pow(2, cpt + i);
            // get the representation with dots every 4th digit
            var representation = formatedNumberRepresentation(bit, totalOffset);
            // assign the matching bit to the option coded on multiple bits
            modulopt.masks[option][representation] = row[2][i];
        }
    }
};
