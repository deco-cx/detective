import { format } from "https://deno.land/std@0.170.0/fmt/bytes.ts";
import { Module, Results, StatModule } from "./types.ts";
import { dependsOn } from "./depends.ts";
import { stripColor } from "https://deno.land/std@0.170.0/fmt/colors.ts";

const entryToRow =
  (sizeSum: number, fileSum: number) => ([k, m]: [string, StatModule]) => {
    return {
      module: stripColor(k).substring(0, 30),
      bytes: format(m.size, { maximumFractionDigits: 2 }),
      "size (%)": (m.size / sizeSum).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
        minimumIntegerDigits: 2,
      }),
      files: m.files,
      "files (%)": (m.files / fileSum).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
        minimumIntegerDigits: 2,
      }),
    };
  };

export const logResults = (graph: { modules: Module[] }, {
  depModules,
  depsModulesMultipleVersions,
  moduleErrors,
  sizeSum,
  sizeMean,
  sizeMedian,
  sizePercentile,
  sizeMax,
  fileSum,
  fileMax,
  filePercentile,
  userSizeSum,
  userFileSum,
}: Results) => {
  if (Object.keys(moduleErrors).length > 0) {
    console.log(">>> Errors\n");
    console.log(`Module loading errors found for following specifiers:\n`);
    for (const [k, v] of Object.entries(moduleErrors)) {
      console.log(k);
      console.log(v);
      console.log(`Module ${v.parsed!.module} is depended by:`);
      console.log(dependsOn(stripColor(v.parsed?.module!), graph));
      console.log();
    }
  } else {
    console.log(`No module loading errors found. 🎉\n`);
  }

  console.log(">>> Userland\n");

  console.table([
    { label: `Total size`, value: format(userSizeSum) },
    { label: `Total files`, value: userFileSum },
  ]);

  console.log("\n>>> Dependencies\n");

  console.table([
    { label: `Total size`, value: format(sizeSum) },
    { label: `Mean size`, value: format(sizeMean) },
    { label: `Median size`, value: format(sizeMedian) },
    { label: `p90 size`, value: format(sizePercentile) },
    { label: `Max size`, value: format(sizeMax) },
    { label: `Total files`, value: fileSum },
    { label: `Max files`, value: fileMax },
    { label: `p90 files`, value: Math.floor(filePercentile) },
  ]);

  const sortedDeps = Object.entries(depModules).sort(([_, a], [__, b]) =>
    b.size - a.size
  );
  console.log(`\nDeps from largest to smallest:`);
  console.table(sortedDeps.map(entryToRow(sizeSum, fileSum)));

  console.log("\n>>> Top offenders (>p90) and who depends on them:\n");

  const topOffenders = sortedDeps.filter(([_, m]) => {
    return (m.size >= sizePercentile);
  }).map(([k]) => k);

  for (const offender of topOffenders) {
    console.log(
      offender,
      `is depended by`,
      dependsOn(stripColor(offender), graph),
    );
  }
  console.log("\n");

  console.log("Deps with more than one version and who depends on them:");
  let congratulations = true;
  for (const [k, v] of Object.entries(depsModulesMultipleVersions)) {
    console.log(k, v);
    for (const offender of v) {
      console.log(
        offender,
        `is depended by`,
        dependsOn(stripColor(offender), graph),
      );
    }
    console.log("\n");
    congratulations = false;
  }

  if (congratulations) {
    console.log("(No esm duplicates found 🎉)");
  }
};
