/* eslint-disable no-undef */
const { chosenFromMask , guessMaskFromMask , getOptionsFromMask } = require( "../module/apply" );
const { getInstanceConfigured , removeFromOptions } = require( "./utile" );

test( "the bar option is set to false from mask" , () => {
    const obj = getInstanceConfigured();
    const mask = "2222.2221";
    expect( chosenFromMask( obj.modulopt , mask , "bar" ) ).toBe( false );
} );

test( "an effective mask can be get from a setMask" , () => {
    const result = guessMaskFromMask( "02.0120.02" );
    expect( result ).toBe( "-1-01--1" );
} );

test( "can have all options set to true from one mask except sort option" , () => {
    const obj = getInstanceConfigured();
    const mask = "2222.2222";

    const options = getOptionsFromMask( obj.modulopt , mask );
    removeFromOptions( obj , options );

    Object.keys( options ).forEach( key => {
        expect( options[ key ] ).toBe( true );
    } );
} );

test( "can set bar option with shortMask" , () => {
    const obj = getInstanceConfigured();
    const mask = "02";

    const options = getOptionsFromMask( obj.modulopt , mask );
    removeFromOptions( obj , options );

    expect( options[ "bar" ] ).toBe( true );
} );

test( "can have all options set to false from one mask except sort option" , () => {
    const obj = getInstanceConfigured();
    const mask = "0011.1111.1111";

    const options = getOptionsFromMask( obj.modulopt , mask );
    removeFromOptions( obj , options );

    Object.keys( options ).forEach( key => {
        expect( options[ key ] ).toBe( false );
    } );
} );

test( "can have all options set to true from one mask without dots" , () => {
    const obj = getInstanceConfigured();
    const mask = "22222222";

    const options = getOptionsFromMask( obj.modulopt , mask );
    removeFromOptions( obj , options );

    Object.keys( options ).forEach( key => {
        expect( options[ key ] ).toBe( true );
    } );
} );