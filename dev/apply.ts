import { IUseOption , IOptions , IOptionsConfig } from "./interfaces";
import { formatedNumberRepresentation , prepareOptionObject } from "./prepare";

const fixOptions = <T extends IUseOption>( object: T , options: IOptions ) => {
	prepareOptionObject( object );

	Object.keys( object.modulopt.defaults ).map( ( key ) => {
		const value = options[ key ];
		if ( value !== undefined ) {
			const customs = object.modulopt.masks[ key ];
			if ( customs ) {

				// if the value is one of the multiple choice options
				if ( Object.values( customs ).includes( value ) ) {
					object.options[ key ] = options[ key ];
				}
			} else if ( typeof object.modulopt.defaults[ key ] === typeof options[ key ] ) {
				object.options[ key ] = options[ key ];
			} else if ( object.modulopt.defaults[ key ] === null ) {
				object.options[ key ] = options[ key ];
			}
		}
	} );
};

/**
 * Masks can be written following this format 11.1111.11 (with dots to avoid mistakes)
 * so it is necessary to strip all dots out of the masks so we can process them as real
 * masks
 * @param s
 * @returns
 */
const stripDots = ( s: string ): string => s.replace( /[.]/g , "" );

const substituteTwos = ( s: string ): string => s.replace( /2/g , "1" );

const defineBooleansOption = (
	defaults: IOptions ,
	bit: string ,
	option: string
) => {
	switch ( bit ) {
		case "1" :
			return true;
		case "0" :
			return false;
		default :
			return defaults[ option ];
	}
};

const defineSortOption = (
	modulopt: IOptionsConfig ,
	bit: number ,
	maskField: string
) => {
	const offset = modulopt.optionsOffset;
	const representation = formatedNumberRepresentation( bit , offset );
	return modulopt.masks[ maskField ][ representation ];
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultCall = ( key: string , previousKey: string , value: any ): number => {
	return 0;
};
const masksMappedByName = (
	masks: IOptions ,
	cb = defaultCall ,
	previousKey = ""
) => {
	const mapped: IOptions = {};

	for ( const [ key , value ] of Object.entries( masks ) ) {
		if ( typeof value === "string" || previousKey ) {
			mapped[ value ] = key;
			const result: number = cb( key , previousKey , value );
			if ( result != 0 ) {
				return result;
			}
		} else if ( typeof value === "object" ) {
			mapped[ key ] = masksMappedByName( value , cb , key );
		}
	}
	return mapped;
};
const applyMasks = ( masks: IOptions , a: string , maskField: string ) => {
	let result = 0;
	const onAssociation = (
		key: string ,
		previousKey: string ,
		value: any
	): number => {
		if ( maskField === value || maskField === previousKey ) {

			// the key is the actual mask
			const b = stripDots( key as string );

			// bitwise comparison on base 2
			result = parseInt( a , 2 ) & parseInt( b , 2 );
			if ( result != 0 ) {
				return result;
			}
		}
		return 0;
	};

	// invert keys and values of the masks so we have option name as index of the object
	masksMappedByName( masks , onAssociation );

	return result;
};

/**
 * from a string mask containing 0 - 1 - 2, that produce an other mask;
 * "2" => "true":1 ... "1" => "false":0 ... "0" => default : "-"
 * @param setMask
 */
const guessMaskFromMask = ( setMask: string ): string => {
	const result = [];
	let i = 0;
	setMask = stripDots( setMask );

	for ( ; i < setMask.length; ++i ) {
		const c = setMask.charAt( i );
		result.push( c === "2" ? 1 : c === "1" ? 0 : "-" );
	}
	return result.join( "" );
};

const chosenFromMask = (
	modulopt: IOptionsConfig ,
	setMask: string ,
	maskField: string
): any => {
	const a = substituteTwos( stripDots( setMask ) );
	const c = guessMaskFromMask( setMask );

	const result = applyMasks( modulopt.masks , a , maskField );

	if ( result > 0 ) {
		const bitPosFromRight = Math.log2( result );
		const position = -1 + c.length - bitPosFromRight;

		const offset = modulopt.optionsOffset;
		const representation = formatedNumberRepresentation( result , offset );
		const booleanMask = modulopt.masks[ representation ];

		// does the result indicates a bit value that aims a boolean ?
		if ( typeof booleanMask === "string" ) {
			const result = defineBooleansOption(
				modulopt.defaults ,
				c[ position ] ,
				booleanMask
			);
			return result;
		} else {

			// INFO: Treat non binar cases
			return defineSortOption( modulopt , result , maskField );
		}
	}
	const option = /[\d.]/g.test( maskField )
		? modulopt.masks[ maskField ]
		: maskField;

	return modulopt.defaults[ option ];
};

const getOptionsFromMask = (
	modulopt: IOptionsConfig ,
	optionMask: string
): any => {
	const options: any = {};
	const masks = masksMappedByName( modulopt.masks );

	Object.keys( masks ).map( ( k ) => {
		options[ k ] = chosenFromMask( modulopt , optionMask , k );
	} );

	return options;
};

export {
	getOptionsFromMask ,
	chosenFromMask ,
	masksMappedByName ,
	guessMaskFromMask ,
	fixOptions ,
};
