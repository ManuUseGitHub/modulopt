/* eslint-disable no-undef */
const { getOptionsFromMask } = require( "../module/apply" );
const { optionize , stick } = require( "../module" );
const { getInstanceConfigured , Testing } = require( "./utile" );

describe( "options" , () => {
    const vector = [
        [ "zaza" , false ] ,
        [ "a lorem" , "none" , [ "ab" , "ac" , "ad" ] ] ,
        [ "b ipsum" , true ] ,
        [ "fina" , false ] ,
        [ "es" , "nothing" , [ "rien" , "nada" , "niet" , "null" , "néan" ] ] ,
        [ "consecteture" ] ,
        [ "dolores" , 10 ] ,
        [ "yolande" , 0 ]
    ];

    test( "options are listend into the alphabetical order" , () => {
        const obj = optionize( new Testing() , vector );

        let char = "0";
        Object.keys( obj.modulopt.defaults ).forEach( key => {
            expect( char <= key[ 0 ] ).toBe( true );
            char = key[ 0 ];
        } );
    } );

    test( "Set option cannot have the same value as the default" , () => {
        const obj = getInstanceConfigured();
        const mask = "02";

        const updated = stick( obj , mask );

        expect( updated.options.bar ).not.toBe( updated.modulopt.defaults.bar );
    } );

    test( "options can be set via mask and object in the same call" , () => {
        console.log( "example of generated configuration for options" );
        const obj = getInstanceConfigured( true );
        
        const mask = "02";

        const updated = stick( obj , { sort : "asc" } , mask );
        expect( updated.options.bar ).toBe( true );
        expect( updated.options.sort ).toBe( "asc" );
    } );

    test( "not free options can only have defined value" , () => {
        const obj = getInstanceConfigured();

        let updated = stick( obj , { bar : "hello" } );

        expect( updated.options.bar ).not.toBe( "hello" );
    } );

    test( "free options of type obj can have any maching type value except undefined" , () => {
        const instance = new Testing();
        optionize( instance , [ [ "obj" ] ] );

        [

            // a number
            100 ,

            // a string
            "hello" ,

            // a "float"
            0.3 ,

            // a function
            () => { } ,

            // null
            null ,

            // undefined
            void 0 ,
            { hello : "world" }
        ].forEach( arg => {
            const updated = stick( instance , { obj : arg } );

            expect( updated.options.obj ).toBe( arg != void 0 ? arg : null );
        } );

    } );

    test( "can set sort option to asc or dsc from mask" , () => {
        const checks = {
            asc : [ "0100.0000" , "0200.0000" ] ,
            dsc : [ "1000.0000" , "2000.0000" ]
        };
        const obj = getInstanceConfigured();

        Object.keys( checks ).forEach( direction => {

            for ( let i = 0; i < 2; ++i ) {
                const masks = checks[ direction ];

                masks.forEach( mask => {

                    const options = getOptionsFromMask( obj.modulopt , mask );
                    expect( options.sort ).toBe( direction );
                } );
            }
        } );
    } );
} );