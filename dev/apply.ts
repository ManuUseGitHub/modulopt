import { checkValidCallOptions } from "./dialog";
import { IUseOptions , IOptions } from "./interfaces";
import { MaskBuilder } from "./MaskBuilder";
import { prepareOptionObject } from "./prepare";

const mb = MaskBuilder.getInstance() as MaskBuilder;

const fixOptions = <T extends IUseOptions>( object: T , options: IOptions ) => {
	prepareOptionObject( object );

	if ( object.modulopt ) {
		Object.keys( object.modulopt.defaults ).map( ( key ) => {
			const value = options[ key ];
			if ( value !== undefined ) {
				const customs = object.modulopt.masks[ key ];
				if ( customs ) {

					// if the value is one of the multiple choice options
					if ( Object.values( customs ).includes( value ) ) {
						object.options[ key ] = options[ key ];
					}
				} else if (
					typeof object.modulopt.defaults[ key ] === typeof options[ key ]
				) {
					object.options[ key ] = options[ key ];
				} else if ( object.modulopt.defaults[ key ] === null ) {
					object.options[ key ] = options[ key ];
				}
			}
		} );
	}
};


const stickOptions = <T extends IUseOptions>( object: T , ...options: any ): T => {
	options
		.sort( ( a: any , b: any ) => ( typeof a < typeof b ? 1 : -1 ) )
		.forEach( ( optSet: any ) => {
			if ( typeof optSet === "string" ) {
				object.options = mb.getOptionsFromMask( object.modulopt! , optSet );
			} else if ( typeof optSet === "object" ) {
				fixOptions( object , optSet );
				checkValidCallOptions( object , optSet );
			}
		} );

	return object;
};

export { stickOptions , fixOptions };
