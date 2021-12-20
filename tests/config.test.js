/* eslint-disable no-undef */
const { optionize , stick } = require( "../module" );
const { sortDefiinitions } = require( "./utile" );

const { MaskBuilder } = require( "../module/MaskBuilder" );

const maskBuilder = new MaskBuilder();

test( "setting a multioption accepting something else than string" , () => {

    // TODO:  Write about the case of chimerical multioption
    const definitions = [

        // kimera case
        [ "bools" , "default" , [ "test" , "maybe" , "no" , false ] ] ,

        // numbers
        [ "someval" , 0 , [ 5 , 3.14 , 8.1 , Number.NaN ] ] ,

        // strings
        [ "greetings" , "hello worlds" , [ "hi" , "yo" , "hey" , "booh !" ] ] ,

        // miscs
        [ "blastval" , null , [ 5 , "pi" , void 0 , () => { } ] ] ,

        [ "modulopt" , { sort : "asc" } ]
    ];

    const test = optionize( {} , definitions );
    const y = definitions.length;
    const x = definitions[ 0 ][ 2 ].length;

    sortDefiinitions( definitions );

    let cpt = 0;
    for ( let i = 0; i < y; ++i ) {
        for ( let j = 0; j < x; ++j ) {
            const bit = Math.pow( 2 , cpt++ );

            const representation = maskBuilder.formatedNumberRepresentation( bit , 16 );

            const option = definitions[ i ][ 0 ];
            expect( maskBuilder.chosenFromMask( test.modulopt , representation , option ) ).toBe( definitions[ i ][ 2 ][ j ] );
        }
    }
} );

test( "can sort options in reverse thanks to modulopt config" , () => {

    // TODO:  Write about the case of chimerical multioption
    const definitions = [

        // kimera case
        [ "bools" , "default" , [ "test" , "maybe" , "no" , false ] ] ,

        // numbers
        [ "someval" , 0 , [ 5 , 3.14 , 8.1 , Number.NaN ] ] ,

        // strings
        [ "greetings" , "hello worlds" , [ "hi" , "yo" , "hey" , "booh !" ] ] ,

        // miscs
        [ "blastval" , null , [ 5 , "pi" , void 0 , () => { } ] ] ,

        [ "modulopt" , { sort : "dsc" } ]
    ];

    const onlyOptionNames = [ "bools" , "someval" , "greetings" , "blastval" ].sort().reverse();

    const test = optionize( {} , definitions );

    Object.keys( test.options ).forEach( ( e , i ) => {
        expect( e ).toBe( onlyOptionNames[ i ] );
    } );
} );

test( "keep options order thanks to modulopt config" , () => {

    // TODO:  Write about the case of chimerical multioption
    const definitions = [

        // kimera case
        [ "bools" , "default" , [ "test" , "maybe" , "no" , false ] ] ,

        // numbers
        [ "someval" , 0 , [ 5 , 3.14 , 8.1 , Number.NaN ] ] ,

        // strings
        [ "greetings" , "hello worlds" , [ "hi" , "yo" , "hey" , "booh !" ] ] ,

        // miscs
        [ "blastval" , null , [ 5 , "pi" , void 0 , () => { } ] ] ,

        [ "modulopt" , { sort : "no" } ]
    ];

    const onlyOptionNames = [ "bools" , "someval" , "greetings" , "blastval" ];

    const test = optionize( {} , definitions );

    Object.keys( test.options ).forEach( ( e , i ) => {
        expect( e ).toBe( onlyOptionNames[ i ] );
    } );
} );

test( "can throw on mismatching option thanks to config" , () => {

    // TODO:  Write about the case of chimerical multioption
    const definitions = [

        // kimera case
        [ "existing" , {} ] ,
        [ "modulopt" , { "mismatch" : "throw" } ]

    ];

    const test = optionize( {} , definitions );

    const t = () => {
        stick( test , { un : true } );
    };

    expect( t ).toThrow( expect.stringMatching( /MODULOPT EXCEPTION c404\. Non existing option/ ) );
} );

test( "can queue mismatching option message thanks to config" , () => {

    // TODO:  Write about the case of chimerical multioption
    const definitions = [

        // kimera case
        [ "existing" , {} ] ,
        [ "modulopt" , { "mismatch" : "report" } ]

    ];

    const obj = optionize( {} , definitions );
    
    stick( obj , { un : true } );

    let foundMessage = "";

    obj.modulopt.logs.forEach( e => {
        if( /MODULOPT MISMATCH c404/.test( e.message ) ){
            foundMessage = e.message;
        }
    } ) ;   
    
    expect( foundMessage ).toStrictEqual( expect.stringMatching( /MODULOPT MISMATCH c404\. Non existing option/ ) );
} );

test( "can print out to the console on mismatching option thanks to config" , () => {

    const vmi = {
        inform : { interaction : "info" , type : "INFO" } ,
        yell : { interaction : "error" , type : "ERROR" } ,
        warn : { interaction : "warn" , type : "WARNING" } ,
        debug : { interaction : "log" , type : "DEBUG" } ,
    };

    Object.keys( vmi ).forEach( k => {

        const e = vmi[ k ];
        
        // TODO:  Write about the case of chimerical multioption
        const definitions = [

            // kimera case
            [ "existing" , {} ] ,
            [ "modulopt" , { "mismatch" : k } ]

        ];

        const test = optionize( {} , definitions );
        console[ e.interaction  ] = jest.fn();
        stick( test , { un : true } );

        expect( console[ e.interaction  ] ).toHaveBeenCalledWith( expect.stringMatching( /MODULOPT [A-Z]+ c404\. Non existing option/ ) );
    } );

} );