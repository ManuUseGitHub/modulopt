import { ILoggingMessage , IOptions , IUseOptions } from "./interfaces";

const dateNTime = require( "date-and-time" );

const hintDefinitions = ( object: IUseOptions , hint: boolean ) => {
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

const getNowString = ( date: Date , format = "hh:mm A [GMT]Z" ) => {
	return dateNTime.format( date , format );
};

const checkValidCallOptions = ( data: IOptions , optSet: IOptions ): void => {
	if ( data.modulopt.config ) {
		const moduloptConfig = data.modulopt.config.options;

		Object.keys( optSet ).forEach( ( key ) => {
			if ( !( key in data.options ) ) {
				const verb = moduloptConfig.mismatch;

				if ( verb === "throw" ) {
					throw `MODULOPT EXCEPTION c404. Non existing option : ${key} on ${data.constructor.name} options`;
				} else if ( verb !== "ignore" && verb !== "report" ) {

					// verbs and interactions
					const vmi: any = {
						inform : { interaction : "info" , type : "INFO" } ,
						yell : { interaction : "error" , type : "ERROR" } ,
						warn : { interaction : "warn" , type : "WARNING" } ,
						debug : { interaction : "log" , type : "DEBUG" } ,
					};

					( console as any )[ vmi[ verb ].interaction ](
						`MODULOPT ${vmi[ verb ].type} c404. Non existing option : ${key} on ${data.constructor.name} options`
					);
				} else if ( verb === "report" ) {
					const time = new Date();
					const log: ILoggingMessage = {
						timestamp : time.getTime() ,
						message : `[${getNowString(
							time
						)}] MODULOPT MISMATCH c404. Non existing option : ${key}` ,
					};
					data.modulopt.logs.push( log );
				}
			}
		} );
	}
};

export { hintDefinitions , checkValidCallOptions };
