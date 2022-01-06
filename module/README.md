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

[Getting started](#11-getting-started)

---

**Table of Contents:**
[TOC]

# 1. Module
This is the most little you need to know to set up and go.

## 1.1 Getting started

1. **Install the package.**
    ```bash
    $ npm i modulopt
    ```
2. **Require.**
   ```js
   const { optionize , stick } = require( "modulopt/dist" );
   
   // or

   const { optionize , stick } = require( "modulopt" );
   ```
3. **Break down your options in an array of definitions :**
    The definitions are small arrays following simple rules. See the **[option](#31-option)** section to know how to write every **[definition](#32-definition)** and their **[structure](#321-structure)** in details. You can still follow this example covering most of the cases:
    ```js

    // Example:
    const definitions = [

        // boolean option , <true> being the default value
        [ "foo" , true ] ,

        // another boolean option , <false> being the default value
        [ "bar" , false ] ,

        // a multichoice option , <"none"> being the default value
        [ "level" , "none" , [ "normal" , "intermediate" , "hard" ] ] ,

        // another multichoice option , <"no"> being the default value
        [ "sort" , "no" , [ "asc" , "dsc" ] ] ,

        // a free option, <null> being the default value
        [ "obj" ] ,

        // a half-free option accepting only numbers , <0> being the default value
        [ "numbr" , 0 ] ,

        // a half-free option accepting only strings , <"hello world"> being the default value
        [ "str" , "hello world" ] ,

        // a chimerical multichoice, <null> being the default value, the values being of different types
        [ "blastval" , null , [ 5 , "pi" , void 0 , () => { } ] ] ,

        // OPTIONAL modulopt configuration : WILL NOT BE PART OF GENERATED OPTIONS
        ["modulopt", { ... }]
    ];
    ```
4. **Call optionize on your object.**
   - Within your own module or soft
    ```js
    optionize( this , definitions );
    ```
   - Or passing your object
    ```js
    const mySoft = new MySoft();

    optionize( mySoft , definitions );
    ```
    **Congratulations 😁 !**
    You are good to go! See the next section and be [getting to use it](#12-getting-to-use). **Let's Rock !!!**
## 1.2 Getting to use
Now that you have called the `optionize` function on your object, you can call `stick` to stick values for options you have defined :

```js
// These options + values came from nowhere but they display how it works somehow
const mySetup = { _let : "s be", honest : "this is", simple : "as crazy !" }; 

stick( mySoft , mySetup )
    .letsRock( "baby" );
```

<blockquote class="info withIcon">
After <code>stick</code> is called, you can directly chain a call to your services.
<code>stick</code> returns the reference of MySoft. We presumed that the method/function <code>letsRock</code> is part of the class MySoft.
</blockquote>

- **Make your options choices.**
    - Use a madeup object `mySetup` as the options you want to set.
    ```js
    const mySetup = { bar : true , sort : 'asc' }; 

    stick( mySoft , mySetup )
        .doCoolStuffs();
    ```
    - Or use a mask string according to your options.
    <blockquote class="idea withIcon">
    You should not mind this possibility if you do not understand it yet. Go on. Or else,
    see <b><a href="#35-advanced-modulopt-generated-configuration">[ ADVANCED ] Modulopt generated configuration / Masks</a></b> section below.
    </blockquote>
    
    ```js
    const mySetup = "0000.0021"; 

    stick( mySoft , mySetup )
        .workSmartNotHard();
    ```
    
    - Or use both a mask string and an object.
    
    ```js
    const mySetup1 = { 
        level : "hard" , 
        sort : "asc", 
        blastval : "pi" 
    };

    const mySetup2 = "0000.0021"; 

    stick( mySoft , mySetup1 , mySetup2 )
        .yellHowCoolYouAre();
    ```

- **Access the options configuration.**
   - Within MySoft class
   ```js
   const barOption = this.options.bar;
   ```
   - Outside MySoft class
   ```js
   const barOption = mySoft.options.bar;
   ```
- **Access the defaults of modulopt generated configuration.**
   ```js
   const defaults = this.modulopt.defaults;
   ```

# 2. Delivered
## 2.1 Features
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
  
## 2.2 Noticeable changes
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

## 2.3 Demo
[Runkit demo](https://runkit.com/manuusegithub/modulopt)

# 3. Documentation
## 3.1 Option
An option (singular) is part of an `options` (plural) member of the object (mySoft) you want Modulopt to be optionized with based on an array you designed called [definitions](#32-definition).

Some points are important to note here. 
- When not specified, an option remains with its default value.
- An option can have a number of possible values including its default value: **[cardinality](#3211-cardinality-12)**. 
  - The lowest cardinality `1:2`. 
    - for a **boolean** option, you can have `true` or `false`. 
  - The finite cardinality `1:M` 
    - The **multi-option** options have finite propositions regardless of whether all the propositions share the same type.
  - The type semantic cardinality `1:Ʃ(T)`
    - for an **half free** option, the type of the default value (other than `null`) defines what value is expected. String => all possible String; an Number => all possible Number; an Object => any sub-Object of the structure.
  - The maximum cardinality `1:N`
    - for a called **free** option, you are limited to the default (which is preferably given the `null` value) and a ***something*** value that can be anything but `undefined`.

## 3.2 Definition
A definition is an array of values that will helps modulopt to generate a corresponding option. an definition looks like this :
```js
// a definition
const definition1 = ["myOption1", ... , ... ];

// modulopt needs a list of all your definitions
const definitions = [
    definition1, 
    ...
]
```
<blockquote class="info withIcon">
While a definition could be an object, an array is more compact in terms of writing. So this is why you have to play with arrays à lot when you have to create the collection of all your definitions.
</blockquote>

### 3.2.1 Structure
Any option definition is following this template :
```js
    [ A , B , C ]
```
- (A) the **first element** is the name of the option.
- (B) the **second element** (optional) is the default value or *fallback* in certain circumstances.
- (C) the **third element** (optional) is the alternative choices for that option.

<blockquote class="danger withIcon">The building of the structure is tied to an order so you cannot interchange A with B or B with C etc.</blockquote>

#### 3.2.1.1 Cardinality 1:2
The definitions entering in this category are boolean options. you can write them like so:
```js
const A = "name";
const B = false; // the default or fallback

const boolOption = [ A , B ];
```
You should not provide any value for the C value or else that means you want to make a multi-option.

To trigger the creation of a **boolean** option, you have to provide a **boolean** (true or false) as the default **B** or else you will have a **half-free** option tied to the type of the default ( [cardinality 1:Ʃ(T)](#3213-cardinality-1%CA%83t) ).

#### 3.2.1.2 Cardinality 1:M
The definitions entering in this category are multi-option options. you can write them like so:
```js
const A = "name";
const B = "default"; // the default or fallback 
const C = [ "something" , "another thing" , "I don't know of something else" ];

const boolOption = [ A , B , C ];
```

You have to provide an <b>array</b> of elements preferably of the same type of the default **B** value or else that means you want to make a **chimerical** multi-option.

here is a chimerical multi-option example. Every proposition is of different types and certainly dont't mach the default null':
```js

const A = "star";
const B = null; // the default or fallback 
const C = [ new Sun() , "John Cena" , x => { return new Pentagon( x ) } ];

const multiOption = [ A , B , C ];
```

<blockquote class="idea withIcon">
Of course, you are not obliged to <i>stick</i> with strings or object, you can specify numbers also. There is no type check.
</blockquote>

#### 3.2.1.3 Cardinality 1:Ʃ(T)
The definitions entering in this category are **half-free** options. you can write them like so:
```js
const A = "name";
const B = "I don't know"; // the default or fallback OF TYPE STRING. It could also be a NUMBER

const halfFreeOption = [ A , B ];
```

You will be allowed to set the option with any string or any sub-object you give against. And if it was a number, you would be allowed to pass a defined number with `stick` to this option.

The purpose of this option is mostly to keep a bit of **security** or avoid some **inconsistencies** when you want to limit to a type match up without worrying.
 Of course, you can use a **free** option instead if you do not care about the input or want yourself to fully take care of validations...

These kind of options are special because they will trigger a type check when you are going to stick an option value to them. if you put a boolean or `null` instead as the default you will have either a : 
- B is boolean : **[boolean option (cardinality 1:2)](#3211-cardinality-12)** 
- B is null : *totaly* **[free option (cardinality 1:N)](#3214-cardinality-1n)**
  - B is null and you pass an array for C : **[multi-option (cardinality 1:M)](#3212-cardinality-1m)**

##### Workaround
If you want to allow the option to be set none the less you have to play with the modulopt special definition and set the `mysteriousAffect` option to `true` : 
```js
const definitions = [ 
    [ A , B ], // my half-free option's definition
    [ "modulopt" , { mysteriousAffect : true } ]
]
```
Doing so you end up with an **free** option but with the possibility of having a default that is not `null`.

See the documentation in the **[4Miss](#34-4miss-behaviors)** section for more details.

#### 3.2.1.4 Cardinality 1:N
The definitions entering in this category are *totaly* **free** options. you can write them like so:
```js
const A = "name";
const B = null; // the default or fallback 

const freeOption = [ A , B ];
```

OR

```js
const A = "name";

const freeOption = [ A ];
```

You are not restricted by any type when you call stick and set the value. 

<blockquote class="idea withIcon">
This way of writing is more casual and why should you define a default value that is not restrictive? "Nothing comes from nothing" anyway.
</blockquote>

You are expected to pass `null` and not `undefined` as the default here. Why is that so ? It is because modulopt is not designed to have undefined as a default value. Semantically, null can mean `not defined` at some point.

## 3.3 Default behaviors
Modulopt controls values that you can assign to your generated options configuration. so you do not end up with the wrong type value for an option or getting out of bounds for propositions.

Assuming this snippet: 
```js
let A = ?

let D = ? // definitions

optionize( mySoft , D );

let B = ?

// apply the desired value to foo
stick( mySoft , B ); // 

let C = mySoft.options.foo;
```

1. **Types are the same on half-free option : ✅ changes apply.**
    ```js
    A = "Hello modulopt";
    
    D = [ [ "foo" : A ] ];
    
    B = { foo : "It's over 9000 !!!" , ... };

    console.log( C ) // It's over 9000 !!!
    ```
    OR
    ```js
    A = 0;
    
    D = [ [ "foo" : A ] ];
    
    B = { foo : 9999 , ... };

    console.log( C ) // => 9999
    ```
2. **Types mismatch on half-free option : ❎ default applyied.**
    ```js
    A = 151;
    
    D = [ [ "foo" : A ] ];
    
    B = { foo : "It's over 9000 !!!" , ... };

    console.log( C ) // => 151
    ```
3. **Proposition in bounds : ✅ changes apply.**
   ```js
    A = "newcomer";

    D = [ [ "frequentation" , A , [ "passenger" , "regular" , "addict" ] ] ];
    
    B = { frequentation : "regular" , ... }; 

    console.log( C ) // => regular
    ```
    OR
    ```js
    A = false;

    D = [ [ "goodDay" , A ];
    
    B = { goodDay : true , ... };

    console.log( C ) // => true
    ```

4. **Proposition out of bound : ❎ the option fallbacks to the default value.**
   ```js
    A = "newbee";

    D = [ [ "level" , A , [ "normal" , "intermediate" , "hard" ] ] ];
    
    B = { level : "hardcore" , ... };

    console.log( C ) // => newbee
    ```
5. **The value set for a free option is anything but `undefined` : ✅ the changes apply.**
    To set a free option, set the default to `null` like this : 
    
    ```js
    A = null;
    D = [ [ "foo" , A ] ];
    ```
    OR just define a **single value array** :
    ```js
    D = [ [ "foo" ] ];
    ```
    <blockquote class="idea withIcon">
    This way of writing is more casual and why should you define a default value that is not restrictive? "Nothing comes from nothing" anyway.
    </blockquote>

    THEN
    ```js
    
    B = { foo : "It's over 9000 !!!" , ... };

    console.log( C ) // It's over 9000 !!!

    B = { foo : 9999+1 , ... };
    
    console.log( C ) // 10 000

    B = { foo : true , ... };
    
    console.log( C ) // true

    B = { foo : () => { return "Vegeta said: \"It's over nine thousand !!!\"" } , ... };
    
    console.log( C() ) // Vegeta said: "It's over nine thousand !!!"
    ```
6. **The value set for a free option is `undefined` : ❎ ! the option fallbacks to `null`.**
    
    `undefined` will result the **`null`** value. **`null`** is evaluated **`false`** as such as **`undefined`** and both undefined and null mean practically *nothing* even though there are little  [differences between null and undefined](https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript).

    <blockquote class="info withIcon">
    <b>Note:</b>
    We do prefer null over undefined because there is no added value out of undefined testing ... in a practical case.
    </blockquote>
## 3.4 4Miss behaviors
Since the **`V2.1`**, some configurations have been added to the generation!

Let's assume that your object using Modulopt of type `MySoft` is called `mySoft` and we are in the case of sticking an option. There will be a 4miss **interaction** targeting :
1. **mismatch** options
    when the target option is not existing on `mySoft.options`.
1. **misspelled** propositions
    when the value of target multi option is not existing on `mySoft.options.myOption`
1. **mysterious** ( half-free option object )
    when you do want to set a **half-free** option value that is not matching the same type as the default value provided for the generation.
1. **mysteriousAffect** ( let pass or not mysterious )
    On-off switch that allows you to let pass **half-free** incoming values that are considered *mysterious* in comparison to the default value of the half-free option.
    **Note:**
    This does not affect the **free** options since they have to stay mutable in any case.

### 3.4.1 Example
1. Define an object containing the options you want to send to Modulopt configuration. 
    ```js
    const _4missAndMore = { 
        mismatch : "throw",
        misspelled : "ignore",
        mysterious : "yell",
        mysteriousAffect : true,

        // other option for modulopt configuration here below...
    } 
    ```
    <blockquote class="info withIcon">
    As Modulopt is using its own mechanism to manage its own generation process, you can then define the set of options via the modulopt option definition like you would do when you call the stick function.
    </blockquote> 

1. Create `definitions` for mySoft object with a modulopt special option.

    ```js

    // Example:
    const definitions = [

        // MySoft options below ...
        // here

        // special definition that configures modulopt behaviors on 4miss and option of mySoft generation
        [ "modulopt" , _4missAndMore ]
    ];
    ```
    <blockquote class="info withIcon">
    The modulopt definition within <code>definitions</code> will not be part of the final options for <code><b>mySoft</b></code> but will be processed by modulopt mechanism to set the <b>modulopt config options</b>. See <code><b>mySoft.modulopt.config.options</b></code> to see the effective options. 
    </blockquote> 

1. Finally, call `optionize`.
    ```js
    optionize( mySoft , definitions );
    ```

Regarding the value set for `mismatch` or the other matching options, you can have different outcomes whenever you cannot find a matching reference or name etc..
|verb|outcome|note|
|-|-|-|
|`throw`|Raise an exception||
|`yell`|Print out a message within a `console.error`||
|`warn`|Print out a warning message within a `console.warn`||
|`info`|Print out an info message within a `console.info`||
|`debug`|Print out a message within a `console.log`||
|`report`|Will write the error in the `obj.modulopt.logs` array | - Does not print out anything <br/>- `Timestamp` added  |
|`ìgnore`|Do not do anything | No side effect|

A 4Miss option takes effect whenever invoking the **stick function**. Interactions are noticeable only when *something* should happen in a *particular* case.

<blockquote class="idea withIcon">
Only <code>mysteriousAffect</code> takes a boolean. But it will tell how the <code>mysterious</code> check has to behave.
</blockquote>

## 3.5 [ ADVANCED ] Modulopt generated configuration
**Note:** 
following sections are written to better understand the full mastery of modulopt. Knowing more is not essential to use modulopt ...

When you pass a boolean as the `third argument` of `optionize`, you can have the control on the hinting of what modulopt attaches to your object designed to have options. set this last one on `true`.
```js
const hint = true;

optionize( mySoft , [ ... ] , hint );
```

You then will be printed with something like the following :
```cmd
modulopt configuration for the instance of "MySoft" (class) :
```

```js
{
    "optionsOffset": ... ,
    "masks": { ... },
    "free": { ... },
    "defaults": { ... }
}
```
<blockquote class="idea withIcon">
you can also see the configuration if you display the modulopt property attached to your object.
<code>console.log( mySoft.modulopt );</code>
</blockquote>


### 3.5.1 Masks
Once you have generated modulopt configuration, you can apply desired values for your options in 2 ways.
1. Using an object. This is the straightforward way.
2. Using a **mask**. This is for those who know the mapping of their options but it is short and handy

Modulopt generates a match between **an option and a binary place** of registration when optionize has been called. This generation of masks follows some **restrictions**. In other words, assuming :
- cpt : progression in mask-option count;
- bin : `f(cpt) = 2^cpt`
- order : `g(bin) = log2(bin)`

Candidates bin :
first : 1 ; second : 2 ; third : 4 ; forth : 8 ;
fifth : 16 ; sixth : 64 ; seventh : 128 ; etc. ...

You can help yourself by reading this article about binary the [representation of a given number](https://www.geeksforgeeks.org/binary-representation-of-a-given-number/) 

#### 3.5.1.1 Conventions and restrictions 
- Before `optionize` computes masks, all options are **sorted** in the alphabetical order so it is easier to guess the option binary assignation.
    <blockquote class="danger withIcon" >
    (*no diacritics differences wise*).
    </blockquote>
- Only **boolean** and **multichoice** options can be set by using a mask.

#### 3.5.1.2 Example
Let's say that we have only **boolean** options and want to set **true** on the **first** and **fifth** options. We can accomplish this like this then :
```js
stick( mySoft , "0000.0002.0002" );
```
OR
```js
stick( mySoft , "000000020002" );
```
OR
```js
stick( mySoft , "2.0002" );
```
OR
```js
stick( mySoft , "20002" );
```
OR
```js
stick( mySoft , "2.0.0.0.2..." );
```
#### 3.5.1.3 Dots and digits of a mask
You can notice that dots "." in masks do not have an impact. They are stripped during the computation of an effective mask. their sole purpose is to provide a human-friendly representation.

(*) an effective mask is composed of `-` or `0` or `1`. 
<blockquote class="idea withIcon">
You will never manipulate an effective mask yourself. 
</blockquote>
Know that if you have :
- `2`, it will give you a `1`. 
  It corresponds to `true` for boolean options or *`activate`* for a choice of a multichoice option.
- `1`, it will give you a `0`. It corresponds to `false` for boolean options or *`activate`* for a choice of a multichoice option.
- `0`, it will give you a `-`. It corresponds to *`keep default`* for both boolean and multichoice choice options.

**Note:** 
To make the understanding of masks easier, let's go step by step. With next sections. Let's define our definitions starting with an empty array first.

```js
let definitions = [];
```
#### 3.5.1.4 Boolean options cases
Every boolean option has an `offset` of 1 in the mask mapping.
```js
definitions = definitions.concat( [

    // first candidate => 1 => 0000.0001
    [ "bar" , false ] ,

    // second => 2 => 0000.0010
    [ "displays" , false ] ,

    // third => 4 => 0000.0100
    [ "foo" , true ]
] );
```
#### 3.5.1.5 Multichoices options cases
Every multichoice option has an offset of `choices.length` in the mask mapping without counting the default value. *There is no debate around the fact that making no choice is considered a choice here. So it does not count...* 
```js
definitions = definitions.concat( [
    [ "level" , "none" , [ 
        
        // forth => 8 => 0000.1000
        "normal" , 

        // fifth => 16 => 0001.0000
        "intermediate" , 

        // sixth => 64 => 0010.0000
        "hard" 
    ] ] ,
    [ "sort" , "no" , [

        // seventh => 128 => 0100.0000
        "asc" , 

        // eighth => 256 => 1000.0000
        "dsc" 
    ] ]
] );
```
**Note:**
If you activate all bits covering one multichoice, only the first marching value will remain in the effective configuration for that option.
```js
// all levels
const mask = "11.1000";

// log2(8) => 3 first ! other will be discarded
// log2(16) => 4
// log2(64) => 5

stick( mySoft , mask );

console.log( mySoft.options.level ); // => normal
```

### 3.5.2 Check on masks registration
When you call optionize, with `true` on the third argument, you can visualize masks. You can notice the default values in the `defaults` property.
```js
definitions = [  ];

// our boolean options
definitions = definitions.concat( [ ... ] );

// our multichoice options
definitions = definitions.concat( [ ... ] );

const hintConfiguration = true;

// the last argument is optional. Its value is false by default
optionize( mySoft , definitions , hintConfiguration );
```
This will output :
```js
{
    "config": {
      "modulopt": {
        "optionsOffset": 24,
        "masks": {
          "mismatch": {
            "0000.0000.0000.0000.0000.0001": "throw",
            "0000.0000.0000.0000.0000.0010": "yell",
            "0000.0000.0000.0000.0000.0100": "inform",
            "0000.0000.0000.0000.0000.1000": "warn",
            "0000.0000.0000.0000.0001.0000": "debug",
            "0000.0000.0000.0000.0010.0000": "report"
          },
          "misspelled": { ... },
          "mysterious": { ... },
          "sort": { ... },
          "0000.0100.0000.0000.0000.0000": "mysteriousAffect"
        },
        "free": {},
        "defaults": { ... }
      },
      "options": {
        "mismatch": "throw",
        "misspelled": "ignore",
        "mysterious": "ignore",
        "mysteriousAffect": false,
        "sort": "asc"
      }
    },

    "optionsOffset": 8,
    "masks": {
        "level": {
            "0000.1000": "normal",
            "0001.0000": "intermediate",
            "0010.0000": "hard"
        },
        "sort": {
            "0100.0000": "asc", 
            "1000.0000": "dsc"
        },
        "0000.0001": "bar",
        "0000.0010": "displays",
        "0000.0100": "foo"
    },
    "logs": [],
    "free": {},
    "defaults": {
        "bar": false,
        "displays": false,
        "foo": true,
        "level": "none",
        "sort": "no"
    }
}
```

## 3.6 Modulopt property
This property attached to your object contains everything that modulopt needs to work.

### 3.6.1 OptionsOffset
This property is used to store the maximum offset used by masks and pad every mask with a good amount of zeros `0`. so masks can be represented properly with a dot every 4th digit.

### 3.6.2 Masks
This can display which option has which mask. If possible.

### 3.6.3 Logs
This will contain the logging about modulopt. So you can be aware of mismatching options for example.

### 3.6.4 Free
Stores every **free** or **half-free** option and the type of its default value. Therefore you can see what kind of value you are supposed to use with a specific **half-free** option.

### 3.6.5 Defaults
Stores all defaults values.

### 3.6.7 Config and options
This field holds another modulopt property. but this one is used to helps you managing how options are generated, 4miss behaviors and more... 

it is generated like so :
```js
"config": {
    "modulopt": {
        "optionsOffset": 24,
        "masks": { ... },
        "free": { ... },
        "defaults": { ... }
    },
    "options": { ... }
}
```

See 
- `mySoft.modulopt.config.options` to check the effective options.
- `mySoft.modulopt.config.modulopt.defaults` to check the default values and fallbacks to modulopt centric options.
- `mySoft.modulopt.config.options.sort` or `mySoft.modulopt.config.modulopt.defaults.sort` to check the order of options generation. `"no"` means keep option in the order they apear. It is important if you need to play with masks or if you just want to...