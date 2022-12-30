export type Module = {
  specifier: string;
  parsed: ParsedModule | undefined;
  dependencies?: Module[];
  size: number;
  error?: string;
};

export type ParsedModule = {
  host: string;
  module: string;
  version?: string | undefined;
  esmVersion?: string | undefined;
};

export type StatModule = {
  size: number;
  files: number;
};

export type Results = {
  userModules: Record<string, StatModule>;
  depModules: Record<string, StatModule>;
  depsModulesMultipleVersions: Record<string, Set<string>>;
  moduleErrors: Record<string, Module>;
  sizeSum: number;
  sizeMean: number;
  sizeMedian: number;
  sizePercentile: number;
  sizeMax: number;
  fileSum: number;
  fileMax: number;
  filePercentile: number;
  userSizeSum: number;
  userFileSum: number;
};
