export interface IMasks {
	[key: string]: string;
}

export interface IOptions {
	[key: string]: any;
}

export interface IRowsOption {
  [key: string]: IColumnOption;
}

export interface IUseOption {
  options : IOptions;
  modulopt : IOptionsConfig
}

export interface IOptionsConfig {
  defaults : IOptions;
  masks : IOptions ;
  free : IOptions;
  optionsOffset : number;
}

export interface IColumnOption {
  mask : string; 
  default : any;
}

export interface IOptionEntry {
  option : string;
  data : any[];
}

export interface IBuild {
  definitions : IRowsOption; 
  optionVector : any[];
  cpt : number;
}