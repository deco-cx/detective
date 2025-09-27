import { relative } from "https://deno.land/std@0.170.0/path/mod.ts";
import {
  mean,
  median,
  percentile,
  sum,
} from "https://esm.sh/stats-lite@2.2.0?pin=v102";
import { Module, ParsedModule, Results, StatModule } from "./types.ts";
import { logResults } from "./log.ts";
import {
  green,
  magenta,
  stripColor,
  yellow,
} from "https://deno.land/std@0.170.0/fmt/colors.ts";

const USER_MODULE_HOST = "local";
const cwd = Deno.cwd();

export const parseSpecifier = (specifier: string): ParsedModule => {
  const { host, pathname, protocol } = new URL(specifier);
  const relativePath = relative(cwd, pathname);

  if (protocol === "file:") {
    return {
      host: USER_MODULE_HOST,
      module: relativePath,
    };
  }

  const esmVersion = host === "esm.sh" && pathname.startsWith("/v") &&
      pathname.split("/")[1] || undefined;
  const remaining = esmVersion
    ? pathname.split("/").slice(2).join("/")
    : pathname.replace(/\/\-\//, "");
  const [, module, version, path] = remaining.match(/(.*)(@[\d.\-\w]*)(.*)/) ||
    [];

  return {
    host,
    module: module ? module?.replace(/(\/x\/)?\/?\*?/, "") : path || remaining,
    version: version ? version.slice(1) : version,
    esmVersion,
  };
};

export const investigate = (graph: { modules: Module[] }): Results => {
  const userModules: Record<string, StatModule> = {};
  const depModules: Record<string, StatModule> = {};
  const depsModulesMultipleVersions: Record<string, Set<string>> = {};
  const moduleErrors: Record<string, Module> = {};

  for (let i = 0; i < graph.modules.length; i++) {
    const dep = graph.modules[i];

    const parsed = parseSpecifier(dep.specifier);
    dep.parsed = parsed;

    if (dep.error) {
      moduleErrors[dep.specifier] = dep;
      continue;
    }

    const { host, module, version, esmVersion } = parsed;

    // Is dependency or local file
    const userOrDepsModules = host === USER_MODULE_HOST
      ? userModules
      : depModules;
    let locator = version
      ? (`${esmVersion ? magenta(`${esmVersion}/`) : ""}${green(module)}${
        yellow("@" + version)
      }`)
      : `${module}`;

    if (Deno.noColor) {
      locator = stripColor(locator);
    }

    const moduleSize = typeof dep.size === "number" && Number.isFinite(dep.size)
      ? dep.size
      : 0;

    if (!userOrDepsModules[locator]) {
      userOrDepsModules[locator] = {
        size: moduleSize,
        files: 1,
      };
    } else {
      userOrDepsModules[locator].size += moduleSize;
      userOrDepsModules[locator].files += 1;
    }
    if (esmVersion) {
      if (!depsModulesMultipleVersions[module]) {
        depsModulesMultipleVersions[module] = new Set<string>();
      }
      depsModulesMultipleVersions[module].add(stripColor(locator));
    }
  }

  for (const module of Object.keys(depsModulesMultipleVersions)) {
    if (depsModulesMultipleVersions[module].size === 1) {
      delete depsModulesMultipleVersions[module];
    }
  }

  const sizes = Object.values(depModules).map((m) => m.size || 0);
  const files = Object.values(depModules).map((m) => m.files);
  const userSizes = Object.values(userModules).map((m) => m.size || 0);
  const userFiles = Object.values(userModules).map((m) => m.files);

  return {
    userModules,
    depModules,
    depsModulesMultipleVersions,
    moduleErrors,
    sizeSum: sum(sizes) || 0,
    sizeMean: mean(sizes) || 0,
    sizeMedian: median(sizes) || 0,
    sizePercentile: percentile(sizes, 0.90) || 0,
    sizeMax: Math.max(...sizes, 0),
    fileSum: sum(files) || 0,
    fileMax: Math.max(...files, 0),
    filePercentile: percentile(files, 0.90) || 0,
    userSizeSum: sum(userSizes) || 0,
    userFileSum: sum(userFiles) || 0,
  };
};

// Called directly
if (import.meta.main) {
  const depsPath = Deno.args.find((a) => a !== "--json" && a !== "--");
  if (!depsPath) {
    throw new Error("Missing deps.json path");
  }
  const graph = JSON.parse(await Deno.readTextFile(depsPath));
  const results = investigate(graph);

  if (Deno.args.find((a) => a === "--json")) {
    const logJSON = results as Partial<Results>;
    delete logJSON["userModules"];
    delete logJSON["depModules"];
    delete logJSON["depsModulesMultipleVersions"];
    console.log(
      JSON.stringify(results, null, 2),
    );
  } else {
    logResults(graph, results);
  }
}
