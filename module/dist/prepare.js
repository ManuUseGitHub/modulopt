"use strict";exports.__esModule=!0,exports.beforeOptionize=exports.prepareOptionObject=exports.sortEntries=exports.populateOptionsObjects=exports.formatedNumberRepresentation=exports.buildDefinition=exports.computeOffset=void 0;var beforeOptionize=function(t,e){var o=sortEntries(e),e=computeOffset(e);return t.modulopt={},t.modulopt.optionsOffset=e,t.modulopt.masks={},t.modulopt.free={},t.modulopt.defaults={},{sortedVector:o,totalOffset:e}};exports.beforeOptionize=beforeOptionize;var dec2bin=function(t){return(t>>>0).toString(2)},pad=function(t,e){for(t=t.toString();t.length<e;)t="0"+t;return t},computeOffset=function(t){var e=0;return t.filter(function(t){return"boolean"==typeof t[1]||t[2]}).map(function(t){e+=t[2]?t[2].length:1}),4*Math.ceil(e/4)};exports.computeOffset=computeOffset;var assignMasks=function(t,e,o){e=formatedNumberRepresentation(Math.pow(2,o),e);"-1"!==e&&(t.mask=e)},formatedNumberRepresentation=function(t,e){t=dec2bin(t),e=pad(t,e).match(/.{1,4}/g);return e?e.join("."):"-1"};exports.formatedNumberRepresentation=formatedNumberRepresentation;var defineInterval=function(t,e){return"boolean"!=typeof t[1]&&t[2]?[e,-1+e+t[2].length]:[e]},populateOptionsObjects=function(e,o){var n=Object.keys(e.masks);Object.keys(o).map(function(t){e.defaults[t]=o[t].default,o[t].mask?treatObjectWithMask(e,o,t):o[t].mask||n.includes(t)||treatObjectWithoutMask(e,o,t)})};exports.populateOptionsObjects=populateOptionsObjects;var prepareOptionObject=function(t){t.options?t.options=Object.assign({},t.options):t.options=Object.assign({},t.modulopt.defaults)};exports.prepareOptionObject=prepareOptionObject;var treatObjectWithMask=function(t,e,o){var n=e[o].mask;t.masks[n]=o,t.defaults[o]=e[o].default},treatObjectWithoutMask=function(t,e,o){t.free[o]={type:typeof e[o].default}},sortEntries=function(t){return t.sort(function(t,e){return t[0]>e[0]?1:t[0]<e[0]?-1:0})};exports.sortEntries=sortEntries;var treatDefinitionsWithIntervals=function(t,e,o,n){var i=n.definitions,r=t[0],s=defineInterval(t,n.cpt),a={default:t[1]};2===t.length&&"boolean"==typeof t[1]&&assignMasks(a,e,n.cpt),assignValuePerBit(o,t,n.cpt,e),i[r]=a,n.cpt=s[s.length-1]+1},treatDefinitionsWithoutInterval=function(t,e){var o=e.definitions,e=t[0],t=void 0!==t[1]?t[1]:null;o[e]={default:t}},buildDefinition=function(e,o,n){n.optionVector.map(function(t){void 0!==t[2]||"boolean"==typeof t[1]?treatDefinitionsWithIntervals(t,e,o,n):1<=t.length&&t.length<=2&&"boolean"!=typeof t[1]&&treatDefinitionsWithoutInterval(t,n)})};exports.buildDefinition=buildDefinition;var assignValuePerBit=function(t,e,o,n){if(e[2]){var i=e[2].length,r=e[0];t.masks[r]={};for(var s=0;s<i;++s){var a=Math.pow(2,o+s),a=formatedNumberRepresentation(a,n);t.masks[r][a]=e[2][s]}}};