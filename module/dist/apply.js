"use strict";exports.__esModule=!0,exports.fixOptions=exports.guessMaskFromMask=exports.masksMappedByName=exports.chosenFromMask=exports.getOptionsFromMask=void 0;var prepare_1=require("./prepare"),fixOptions=function(r,o){(0,prepare_1.prepareOptionObject)(r),Object.keys(r.modulopt.defaults).map(function(e){var s,t=o[e];void 0!==t&&((s=r.modulopt.masks[e])?Object.values(s).includes(t)&&(r.options[e]=o[e]):typeof r.modulopt.defaults[e]!=typeof o[e]&&null!==r.modulopt.defaults[e]||(r.options[e]=o[e]))})};exports.fixOptions=fixOptions;var stripDots=function(e){return e.replace(/[.]/g,"")},substituteTwos=function(e){return e.replace(/2/g,"1")},defineBooleansOption=function(e,s,t){switch(s){case"1":return!0;case"0":return!1;default:return e[t]}},defineSortOption=function(e,s,t){var r=e.optionsOffset,r=(0,prepare_1.formatedNumberRepresentation)(s,r);return e.masks[t][r]},defaultCall=function(e,s,t){return 0},masksMappedByName=function(e,s,t){void 0===s&&(s=defaultCall),void 0===t&&(t="");for(var r={},o=0,a=Object.entries(e);o<a.length;o++){var n=a[o],p=n[0],i=n[1];if("string"==typeof i||t){n=s(r[i]=p,t,i);if(0!=n)return n}else"object"==typeof i&&(r[p]=masksMappedByName(i,s,p))}return r};exports.masksMappedByName=masksMappedByName;var applyMasks=function(e,r,o){var a=0;return masksMappedByName(e,function(e,s,t){if(o===t||o===s){e=stripDots(e);if(0!=(a=parseInt(r,2)&parseInt(e,2)))return a}return 0}),a},guessMaskFromMask=function(e){var s=[],t=0;for(e=stripDots(e);t<e.length;++t){var r=e.charAt(t);s.push("2"===r?1:"1"===r?0:"-")}return s.join("")};exports.guessMaskFromMask=guessMaskFromMask;var chosenFromMask=function(e,s,t){var r=substituteTwos(stripDots(s)),o=guessMaskFromMask(s),a=applyMasks(e.masks,r,t);if(0<a){s=Math.log2(a),r=-1+o.length-s,s=e.optionsOffset,s=(0,prepare_1.formatedNumberRepresentation)(a,s),s=e.masks[s];return"string"!=typeof s?defineSortOption(e,a,t):defineBooleansOption(e.defaults,o[r],s)}t=/[\d.]/g.test(t)?e.masks[t]:t;return e.defaults[t]};exports.chosenFromMask=chosenFromMask;var getOptionsFromMask=function(s,t){var r={},e=masksMappedByName(s.masks);return Object.keys(e).map(function(e){r[e]=chosenFromMask(s,t,e)}),r};exports.getOptionsFromMask=getOptionsFromMask;