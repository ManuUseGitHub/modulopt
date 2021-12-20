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
        [ "numba" , 0 ] ,
        [ "modulopt" , 
            { missmatch : "throw" , sort : "asc" }
        ]
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

const sortDefiinitions  = ( definitions , direction = "asc" ) => {

    if( direction !== "no" ){
        const dirInfluence = direction === "asc" ? 1 : -1;
        definitions.sort( ( a , b ) => {
            if ( a[ 0 ] < b[ 0 ] ){
                return -1 * dirInfluence;
              }
              if ( a[ 0 ] > b[ 0 ] ){
                return 1 * dirInfluence;
              }
              return 0;
            } 
        );
    }
};

// eslint-disable-next-line no-undef
module.exports = { getInstanceConfigured , removeFromOptions , Testing , sortDefiinitions };
