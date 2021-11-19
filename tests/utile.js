// eslint-disable-next-line no-undef
const { optionize } = require( "../module" );

class Testing {
    hello = "world";
}

const getInstanceConfigured = ( hint = false ) => {
    const tt = new Testing();
    optionize( tt , [
        [ "displays" , false ] ,
        [ "bar" , false ] ,
        [ "level" , "none" , [ "normal" , "intermediate" , "hard" ] ] ,
        [ "foo" , true ] ,
        [ "sort" , "no" , [ "asc" , "dsc" ] ] ,
        [ "obj" ] ,
        [ "numbs" , 10 ] ,
        [ "numba" , 0 ]
    ] , hint );
    return Object.assign( {} , tt );
};

const removeFromOptions = ( obj , options ) => {
    Object.keys( obj.modulopt.defaults ).forEach( key => {
        const _default = obj.modulopt.defaults[ key ];

        if ( typeof _default !== "boolean" ) {
            delete options[ key ];
        }
    } );
};

// eslint-disable-next-line no-undef
module.exports = { getInstanceConfigured , removeFromOptions , Testing };
