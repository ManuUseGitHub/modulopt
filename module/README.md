# <img id="module-logo" src="https://raw.githubusercontent.com/ManuUseGitHub/modulopt/master/logo.svg"> <br/>Modul °/o pt<br/>  [![npm version](https://badge.fury.io/js/modulopt.svg)](https://badge.fury.io/js/modulopt) [![Build Status](https://app.travis-ci.com/ManuUseGitHub/modulopt.svg?branch=master)](https://travis-ci.com/ManuUseGitHub/modulopt) [![Coverage Status](https://coveralls.io/repos/github/ManuUseGitHub/modulopt/badge.svg)](https://coveralls.io/github/ManuUseGitHub/modulopt) [![License: MIT](https://img.shields.io/badge/License-MIT-61dafb.svg)](https://github.com/ManuUseGitHub/modulopt/blob/master/LICENSE)
Engrafts options support (default values + validity) to your objects or modules.

---
## Getting started

1. **Install the package.**
    ```bash
    $ npm i modulopt
    ```
2. **Require.**
   ```js
   const { optionize , stick } = require( "modulopt/dist" );
   ```
3. **Define your options in an array of definitions :**
    The definitions are smaller arrays following these simple rules :
    - **first element** is the name of the option
    - **second element** (optional) is the default value or *fallback*
    - **third element** (optional) is the alternative choices for that option
    ```js
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
        [ "numbr" , 0 ]

        // a half-free option accepting only strings , <"hello world"> being the default value
        [ "str" , "hello world" ]
    ];
    ```
    Assignable values for your options follow certain rules regarding the design of your definitions...
    See **next** sections to have more details about behaviors. <br/><br/>
4. **Call optionize on your object.**
   - within your own module or soft
    ```js
    optionize( this , definitions );
    ```
   - or passing your object
    ```js
    const mySoft = new MySoft();

    optionize( mySoft , definitions );
    ```

5. **Make your options choices.**
    - Use a madeup object `mySetup` as the options you want to set.
    ```js
    const mySetup = { bar : true , sort : 'asc' }; 

    stick( mySoft , mySetup )
        .doCoolStuffs();
    ```
    >After stick is called, you can directly chain a call to your services.
    Stick returns the instance of MySoft.
    - Use a mask string according to your options*.
    >(*) See **[ ADVANCED ] Modulopt generated configuration / Masks** section below.
6. **Access the options configuration.**
   - Within MySoft class
   ```js
   const barOption = this.options.bar;
   ```
   - Outside MySoft class
   ```js
   const barOption = mySoft.options.bar;
   ```
7. **Access the defaults of modulopt generated configuration.**
   ```js
   const defaults = this.modulopt.defaults;
   ```
---
## Behaviors
Modulopt controls values that you can assign to your generated options configuration. so you do not end up with wrong type value for an option or getting out of bound for propositions.

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

1. **Types are the same on half-free option :  ( ✅ ) changes apply.**
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
2. **Types mismatch on half-free option : ( ❎ ) default applyied.**
    ```js
    A = 151;
    
    D = [ [ "foo" : A ] ];
    
    B = { foo : "It's over 9000 !!!" , ... };

    console.log( C ) // => 151
    ```
3. **Proposition in bounds : ( ✅ ) changes apply.**
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

4. **Proposition out of bound : ( ❎ ) the option fallbacks to the default value.**
   ```js
    A = "newbee";

    D = [ [ "level" , A , [ "normal" , "intermediate" , "hard" ] ] ];
    
    B = { level : "hardcore" , ... };

    console.log( C ) // => newbee
    ```
5. **The value set for a free option is anything but `undefined` :  ( ✅ ) changes apply.**
    To set a free option, set the default to `null` like this : 
    
    ```js
    A = null;
    D = [ [ "foo" , A ] ];
    ```
    OR just define a **single value array** :
    ```js
    D = [ [ "foo" ] ];
    ```
    >This way of writing is more casual and why should you define a default value that is not restrictive ? "Nothing comes from nothing" anyway.

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
    
6. **The value set for a free option is `undefined` : ( ❎ ! ) the option fallbacks to `null`.**
    >undefined will results the **`null`** value. **`null`** is evaluated **`false`** as such as **`undefined`** and both undefined and null mean pratically *nothing* even though there are little  [differences between null and undefined](https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript).

    **Note:** 
    We do prefer null over undefined because there are no added value out of undefined testing ... in a practical cases.
---
## [ ADVANCED ] Modulopt generated configuration
**Note:** 
folowing sections are wrote to better understand the full mastery of modulopt. Knowing more is not essential to use modulopt ...

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
>you can also see the configuration if you display the modulopt property attached to your object.
>```js
>console.log( mySoft.modulopt );
>```
---
### Masks
Once you have generated modulopt configuration, you can apply desired values for your options via 2 ways.
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

---

#### Conventions and restrictions 
- Before `optionize` computes masks, all options are **sorted** in the alphabetical order so it is easier to guess the option binary assignation.
    >(*no diacritics differenceswise*).
- Only **boolean** and **multichoice** options can be set by using a mask.

#### Example
Lets say that we have only **boolean** options and want to set **true** on the **first** and **fifth** option. We can accomplish this like this then :
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
---
#### Dots and digits of a mask
>You can notice that dots "." in masks do not have an impact. They are striped during the computation of an **effective mask***. their sole purpose is to provide a human-friendly representation.

(*) an effective mask is composed of `-` or `0` or `1`. 
>You will never manipulate an effective mask yourself. 

Know that if you have :
- `2`, it will gives you a `1`. 
  It corresponds to `true` for boolean options or *`activate`* for a choice of a multichoice option.
- `1`, it will gives you a `0`. It corresponds to `false` for boolean options or *`activate`* for a choice of a multichoice option.
- `0`, it will gives you a `-`. It corresponds to *`keep default`* for both boolean and multichoice choice options.

**Note:** 
To make the understanding of masks easier, let's go step by step. With next sections. Let's define our definitions starting by an empty array first.

```js
let definitions = [];
```
---
#### Boolean options cases
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
---
#### Multichoices options cases
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
---
### Check on masks registration
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
    "optionsOffset": 8,
    "masks": {
        "level": {
        "0000.1000": "normal",
        "0001.0000": "intermediate",
        "0010.0000": "hard"
        },
        "sort": {"0100.0000": "asc", "1000.0000": "dsc"},
        "0000.0001": "bar",
        "0000.0010": "displays",
        "0000.0100": "foo"
    },
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
---
## OptionsOffset
This property is used to store the maximum offset used by masks and pad every masks with the good amount of zeros `0`. so masks can be represented properly with a dot every 4th digit.

---
## Free
Stores every free or half-free option and the type of its default value. Therefore you can see what kind of value you are supposed to use with a specific (half-)free option.

---
## defaults
Stores all defaults values. A copy of this property is used to initialize the options property of your `mySoft` class.