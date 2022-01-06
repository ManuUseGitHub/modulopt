<style>
.parent {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 5px;
    grid-row-gap: 0px;
}

.div1 { 
    display: grid;
    max-width: 200pt;
    background: #333;
    vertical-align: middle;
    text-align: center;
    border-radius: 5px;
    grid-area: 1 / 1 / 2 / 3;
}
.div2 { 
    vertical-align:middle;
    grid-area: 1 / 3 / 2 / 6; 
}

blockquote.danger {
    background: salmon;
    color: firebrick;
    border-left-color: red;
}

blockquote.info {
    background: #dfefff;
    border-left-color: #cfe0fb;
}

blockquote.idea {
    background: antiquewhite;
    border-left-color: goldenrod;
}

blockquote.withIcon::before {
    text-align: center;
    display: inline-block;
    margin: 5px;
    font-size: 1.5em;
}

blockquote.danger::before {
    content: "❗";
}

blockquote.idea::before{
    content: "💡"
}

blockquote.info::before {
    content: "📝";
    
}

</style>
<img id="module-logo" src="https://raw.githubusercontent.com/ManuUseGitHub/modulopt/master/logo.svg"><div class="parent"><div class="div1"><span style="    font-size: 16pt;color: lightgrey;place-self: center;">Modul °/o pt</span></div><div class="div2">  [![npm version](https://badge.fury.io/js/modulopt.svg)](https://badge.fury.io/js/modulopt) [![Build Status](https://app.travis-ci.com/ManuUseGitHub/modulopt.svg?branch=master)](https://travis-ci.com/ManuUseGitHub/modulopt) [![Coverage Status](https://coveralls.io/repos/github/ManuUseGitHub/modulopt/badge.svg)](https://coveralls.io/github/ManuUseGitHub/modulopt) [![Maintainability](https://api.codeclimate.com/v1/badges/e3c7a4af56202c0f5669/maintainability)](https://codeclimate.com/github/ManuUseGitHub/modulopt/maintainability) ![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/ManuUseGitHub/modulopt) ![NPM Downloads](https://img.shields.io/npm/dm/modulopt.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-61dafb.svg)](https://github.com/ManuUseGitHub/modulopt/blob/master/LICENSE)</div>
</div>

# 0. Purpose
Any good product delivered on a large scale should provide good quality for the service it gives or the problem it is in charge to solve. To ensure a maximum quality level, services should also cover as many as possible use-cases by providing options in the input.

The downside of designing powerful option management is quite time-consuming. Moreover, there is no clear formalism defined or convention about any option design other than: "An option has to be optional and if not specified in the input, that option has to keep the default value".

The philosophy of this module is to ease the pain of designing option management. In response to "how can I design that?" it answers by saying: **"You don't have to, I got you covered"**.

## Features
- adds an `options` property with your ready to use options.
- handle mismatching options (defaults etc.).
- set options on the go easily.
- adds a `modulopt` property with 
  - `config` : generated using modulopt generation.
  - `defaults` : with the default values.
  - `logs` : for modulopt silent debugging.
  - ...
- reset modulopt logs
- flexibility
  
## Noticeable changes
- 2.1.0
  - modulopt constants
  - **[4Miss](#34-4miss-behaviors)** Interactions: whenever an option mismatches a defined name or a proposition is misspelled or even a free option containing a structured object has a mysterious application.
- 2.0.0
  - The service is provided by Modulopt Object
  - Modulopt config for a generation: mismatch handling, option order while generated. `modulopt` special definition
  - Logging
  - Chimerical cases
  - Set Options via multiple inputs (string and object)
- 1.0.0
  - Default management
  - Use of `.options` to get access to options
  - `modulopt` property on the desired object
  - Masks usage.

## Demo
[Runkit demo](https://runkit.com/manuusegithub/modulopt)

## Getting started

See documentation on the [NPM package page](https://www.npmjs.com/package/modulopt)
