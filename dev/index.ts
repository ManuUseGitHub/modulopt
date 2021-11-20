import { IRowsOption , IUseOption , IBuild } from "./interfaces";
import {
	populateOptionsObjects ,
	buildDefinition ,
	beforeOptionize
} from "./prepare";
import { fixOptions , getOptionsFromMask } from "./apply";

const optionize = <T extends IUseOption>(
	object: T ,
	optionVector: any[] ,
	hint = false
): T => {
	const definitions: IRowsOption = {} as IRowsOption;

	const { sortedVector , totalOffset } = beforeOptionize( object , optionVector );

	const buildDef: IBuild = { cpt : 0 , optionVector : sortedVector , definitions };

	buildDefinition( totalOffset , object.modulopt , buildDef );

	populateOptionsObjects( object.modulopt , definitions );

	hintDefinitions( object , hint );
	object.options = Object.assign( {} , object.modulopt.defaults );
	
	return object;
};

const hintDefinitions = ( object: IUseOption , hint: boolean ) => {
	if ( hint ) {
		const stringify = require( "json-stringify-pretty-compact" );
		const colorizeJson = require( "json-colorizer" );
		
		console.log(
			`modulopt configuration for the instance of "${object.constructor.name}" (class) :\n` ,
			colorizeJson( stringify( object.modulopt ) )
		);
	}

	return object;
};

const stick = <T extends IUseOption>( object: T , ...options: any ): T => {
	
	options
		.sort( ( a :any , b : any ) => typeof a < typeof b ? 1 : -1 )
		.forEach( ( optSet : any ) => {
			if ( typeof optSet === "string" ) {
				object.options = getOptionsFromMask( object.modulopt , optSet );
			} else if ( typeof optSet === "object" ) {
				fixOptions( object , optSet );
			}
	} );

	return object;
};

export { optionize , stick , populateOptionsObjects };
