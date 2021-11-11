/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */

const { myService } = require( "../module-name/index.js" );
const fs = require( "fs" );

fs.readFile( "./demo/demo.txt" , "utf8" , ( err , text ) => {
  if ( err ) {
    console.error( err );
    return;
  }

  // TODO : manipulate the service
  const result = myService ( text );
  const resultText = foo(result);
  
  const fileCallback = ( err , data ) => { };

 
  fs.writeFile( "./assets/demout.txt" , resultText , fileCallback );
  
  fs.writeFile( "./assets/demout.json" , JSON.stringify( { result:data } , null , 2 ) , fileCallback );

  console.log( result );
} );
