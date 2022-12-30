import { Module } from "./types.ts";

export const dependsOn = (module: string, graph: { modules: Module[] }) => {
  const dependsOnSet = new Set<string>();
  graph.modules.forEach((m: Module) => {
    const mDeps: Module[] = m.dependencies || [];
    if (
      mDeps.some((d: Module) => d.specifier.includes(module)) &&
      m.parsed!.module !== module
    ) {
      dependsOnSet.add(
        `${m.parsed!.esmVersion ? `${m.parsed!.esmVersion}/` : ""}${
          m.parsed!.module
        }${m.parsed!.version ? `@${m.parsed!.version}` : ""}`,
      );
    }
  });
  // Return only unique values
  return [...dependsOnSet];
};
