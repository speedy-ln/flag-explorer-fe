export interface CountryModel {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld?: string[];
  cca2: string;
  cca3: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: {
    [key: string]: string;
  };
  translations?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  latlng?: number[];
  landlocked?: boolean;
  area?: number;
  flag?: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population?: number;
  borders?: string[];
  continents?: string[];
}
