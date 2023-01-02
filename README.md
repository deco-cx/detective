# Deno Deps Detective

1. detective _(noun)_

> a person, especially a police officer, whose occupation is to investigate and solve crimes.

Don't let your deno project dependencies become a **crime scene!**

`detective` helps you keep track of your deno dependencies and their versions, and important metrics like number of files and total size. 

## Installation

```bash
deno install --allow-read --allow-write --allow-net --allow-env --allow-run --unstable https://deno.land/x/detective/detective.ts
```

## Usage

First, create a `deps.json` file using `deno info --json <your_root.ts>`.

```bash
deno info --json ./main.ts > deps.json
```

Then, run `detective` with the `deps.json` file as an argument.

```bash
detective deps.json
```

The default mode will show you diagnostics of your dependencies.

You can also use `--json` to output a JSON version of the diagnostics.

```bash
detective --json deps.json
```

## Example

```bash
$ deno info --json main.ts > deps.json
$ detective deps.json
>>> Errors

Module loading errors found for following specifiers:

https://esm.sh/*@dnd-kit@6.0.5/core/dist/hooks/utilities?alias=react:preact/compat,@types/react:preact/compat,react-dom:preact/compat&pin=v102
{
  specifier: "https://esm.sh/*@dnd-kit@6.0.5/core/dist/hooks/utilities?alias=react:preact/compat,@types/react:prea...",
  error: 'Module not found "https://esm.sh/*@dnd-kit@6.0.5/core/dist/hooks/utilities?alias=react:preact/compat...',
  parsed: { host: "esm.sh", module: "@dnd-kit", version: "6.0.5", esmVersion: undefined }
}
Module @dnd-kit is depended by:
[
  "components/editor/SectionList.tsx",
  "components/editor/SectionListItem.tsx",
  "@dnd-kit/accessibility@3.0.1",
  "@dnd-kit/core@6.0.5",
  "@dnd-kit/sortable@7.0.1",
  "@dnd-kit/utilities@3.2.0",
  "v102/@dnd-kit/core@6.0.5",
  "v102/@dnd-kit/sortable@7.0.1"
]

>>> Userland

┌───────┬───────────────┬──────────┐
│ (idx) │ label         │ value    │
├───────┼───────────────┼──────────┤
│     0 │ "Total size"  │ "448 kB" │
│     1 │ "Total files" │ 199      │
└───────┴───────────────┴──────────┘

>>> Dependencies

┌───────┬───────────────┬───────────┐
│ (idx) │ label         │ value     │
├───────┼───────────────┼───────────┤
│     0 │ "Total size"  │ "5.01 MB" │
│     1 │ "Mean size"   │ "47.7 kB" │
│     2 │ "Median size" │ "4.8 kB"  │
│     3 │ "p90 size"    │ "92.4 kB" │
│     4 │ "Max size"    │ "1.19 MB" │
│     5 │ "Total files" │ 1365      │
│     6 │ "Max files"   │ 412       │
│     7 │ "p90 files"   │ 9         │
└───────┴───────────────┴───────────┘

Deps from largest to smallest:
┌───────┬──────────────────────────────────┬─────────────┬──────────┬───────┬───────────┐
│ (idx) │ module                           │ bytes       │ size (%) │ files │ files (%) │
├───────┼──────────────────────────────────┼─────────────┼──────────┼───────┼───────────┤
│     0 │ "std@0.170.0"                    │ "1.19 MB"   │ "23.81%" │    87 │ "06.37%"  │
│     1 │ "v96/csstype@3.1.1"              │ "857.89 kB" │ "17.13%" │     1 │ "00.07%"  │
│     2 │ "v102/lodash@4.17.21"            │ "557 kB"    │ "11.12%" │   412 │ "30.18%"  │
│     3 │ "v102/ajv@8.11.2"                │ "349.18 kB" │ "06.97%" │    93 │ "06.81%"  │
│     4 │ "denoflate@1.2.1"                │ "306.6 kB"  │ "06.12%" │     3 │ "00.22%"  │
│     5 │ "esbuild@v0.14.51"               │ "192.33 kB" │ "03.84%" │     4 │ "00.29%"  │
│     6 │ "v102/preact@10.11.3"            │ "135.21 kB" │ "02.70%" │    13 │ "00.95%"  │
│     7 │ "v96/lodash-es@4.17.21"          │ "126.79 kB" │ "02.53%" │   317 │ "23.22%"  │
│     8 │ "v102/@rjsf/utils@5.0.0-beta.15" │ "99.58 kB"  │ "01.99%" │     2 │ "00.15%"  │
│     9 │ "v102/@dnd-kit/core@6.0.5"       │ "93.07 kB"  │ "01.86%" │   114 │ "08.35%"  │
│    10 │ "v102/@rjsf/utils@5.0.0-beta.13" │ "92.42 kB"  │ "01.84%" │     2 │ "00.15%"  │
│    11 │ "@octokit/plugin-rest-endpoint-" │ "74.13 kB"  │ "01.48%" │     1 │ "00.07%"  │
│    12 │ "v102/@rjsf/core@5.0.0-beta.15"  │ "68.42 kB"  │ "01.37%" │     2 │ "00.15%"  │
│    13 │ "v96/twind@0.16.17"              │ "66.15 kB"  │ "01.32%" │     4 │ "00.29%"  │
│    14 │ "fresh@1.1.2"                    │ "60.36 kB"  │ "01.20%" │    16 │ "01.17%"  │
│    15 │ "v102/@types/json-schema@7.0.11" │ "58.34 kB"  │ "01.16%" │     2 │ "00.15%"  │
│    16 │ "v102/@supabase/gotrue-js@1.24." │ "55.89 kB"  │ "01.12%" │     6 │ "00.44%"  │
│    17 │ "stable/preact@10.11.3"          │ "47.49 kB"  │ "00.95%" │     7 │ "00.51%"  │
│    18 │ "v102/uri-js@4.4.1"              │ "44.55 kB"  │ "00.89%" │     4 │ "00.29%"  │
│    19 │ "v102/@supabase/postgrest-js@0." │ "30.14 kB"  │ "00.60%" │     7 │ "00.51%"  │
│    20 │ "v96/swr@2.0.0"                  │ "29.89 kB"  │ "00.60%" │     4 │ "00.29%"  │
│    21 │ "@types/json-schema@7.0.11"      │ "29.17 kB"  │ "00.58%" │     1 │ "00.07%"  │
│    22 │ "v102/@supabase/realtime-js@1.7" │ "28.94 kB"  │ "00.58%" │     9 │ "00.66%"  │
│    23 │ "node.ns.d.ts"                   │ "22.54 kB"  │ "00.45%" │     1 │ "00.07%"  │
│    24 │ "v102/json-schema-merge-allof@0" │ "20.8 kB"   │ "00.42%" │     2 │ "00.15%"  │
│    25 │ "v102/@supabase/storage-js@1.7." │ "19.48 kB"  │ "00.39%" │     9 │ "00.66%"  │
│    26 │ "v102/@supabase/supabase-js@1.3" │ "18.89 kB"  │ "00.38%" │     7 │ "00.51%"  │
│    27 │ "tabler_icons_tsx@0.0.2"         │ "17.47 kB"  │ "00.35%" │    30 │ "02.20%"  │
│    28 │ "v102/@dnd-kit/sortable@7.0.1"   │ "16.63 kB"  │ "00.33%" │    28 │ "02.05%"  │
│    29 │ "exponential-backoff@v3.1.0-nEI" │ "16.56 kB"  │ "00.33%" │     1 │ "00.07%"  │
│    30 │ "fuse@v6.4.1"                    │ "15.43 kB"  │ "00.31%" │     1 │ "00.07%"  │
│    31 │ "djwt@v2.8"                      │ "12.85 kB"  │ "00.26%" │     5 │ "00.37%"  │
│    32 │ "@octokit/plugin-paginate-rest@" │ "12.81 kB"  │ "00.26%" │     1 │ "00.07%"  │
│    33 │ "v102/ajv-formats@2.1.1"         │ "12.67 kB"  │ "00.25%" │     4 │ "00.29%"  │
│    34 │ "marky@v1.1.6"                   │ "12.53 kB"  │ "00.25%" │     3 │ "00.22%"  │
│    35 │ "esbuild_deno_loader@0.5.2"      │ "12.48 kB"  │ "00.25%" │     6 │ "00.44%"  │
│    36 │ "@octokit/endpoint@v7.0.0-BBk8I" │ "9.72 kB"   │ "00.19%" │     1 │ "00.07%"  │
│    37 │ "importmap@0.2.1"                │ "9.63 kB"   │ "00.19%" │     2 │ "00.15%"  │
│    38 │ "v102/@dnd-kit/utilities@3.2.0"  │ "9.18 kB"   │ "00.18%" │    34 │ "02.49%"  │
│    39 │ "v102/cross-fetch@3.1.5"         │ "9.07 kB"   │ "00.18%" │     1 │ "00.07%"  │
│    40 │ "v102/json-schema-compare@0.2.2" │ "8.71 kB"   │ "00.17%" │     2 │ "00.15%"  │
│    41 │ "v102/preact-render-to-string@5" │ "7.94 kB"   │ "00.16%" │     2 │ "00.15%"  │
│    42 │ "v102/@builder.io/partytown@0.7" │ "7.8 kB"    │ "00.16%" │     2 │ "00.15%"  │
│    43 │ "v102/react-is@18.2.0"           │ "7.51 kB"   │ "00.15%" │     2 │ "00.15%"  │
│    44 │ "dishooks@v1.1.0"                │ "7.46 kB"   │ "00.15%" │     3 │ "00.22%"  │
│    45 │ "rutt@0.0.13"                    │ "7.27 kB"   │ "00.15%" │     1 │ "00.07%"  │
│    46 │ "v102/@rjsf/validator-ajv8@5.0." │ "6.96 kB"   │ "00.14%" │     2 │ "00.15%"  │
│    47 │ "inspect_vscode@0.2.0"           │ "6.73 kB"   │ "00.13%" │     4 │ "00.29%"  │
│    48 │ "v102/compute-gcd@1.2.1"         │ "5.48 kB"   │ "00.11%" │     2 │ "00.15%"  │
│    49 │ "v96/tabbable@5.3.3"             │ "5.45 kB"   │ "00.11%" │     2 │ "00.15%"  │
│    50 │ "@octokit/request@v6.0.1-rQnUxH" │ "5.17 kB"   │ "00.10%" │     1 │ "00.07%"  │
│    51 │ "v102/compute-lcm@1.1.2"         │ "5.04 kB"   │ "00.10%" │     2 │ "00.15%"  │
│    52 │ "universal-user-agent@v6.0.0-fU" │ "4.8 kB"    │ "00.10%" │     1 │ "00.07%"  │
│    53 │ "partytown@0.1.3"                │ "4.57 kB"   │ "00.09%" │     6 │ "00.44%"  │
│    54 │ "v102/jsonpointer@5.0.1"         │ "4.11 kB"   │ "00.08%" │     2 │ "00.15%"  │
│    55 │ "v102/json-schema-traverse@1.0." │ "4.05 kB"   │ "00.08%" │     2 │ "00.15%"  │
│    56 │ "v102/@preact/signals@1.0.3"     │ "4.02 kB"   │ "00.08%" │     2 │ "00.15%"  │
│    57 │ "std@0.161.0"                    │ "3.83 kB"   │ "00.08%" │     2 │ "00.15%"  │
│    58 │ "v96/use-sync-external-store@1." │ "3.74 kB"   │ "00.07%" │     2 │ "00.15%"  │
│    59 │ "before-after-hook@v2.2.2-pi5OV" │ "3.54 kB"   │ "00.07%" │     1 │ "00.07%"  │
│    60 │ "@octokit/core@v4.0.4-hwgV7PzMc" │ "3.53 kB"   │ "00.07%" │     1 │ "00.07%"  │
│    61 │ "@octokit/graphql@v5.0.0-og38x9" │ "3.27 kB"   │ "00.07%" │     1 │ "00.07%"  │
│    62 │ "v102/@supabase/functions-js@1." │ "3.1 kB"    │ "00.06%" │     3 │ "00.22%"  │
│    63 │ "v102/validate.io-integer-array" │ "2.92 kB"   │ "00.06%" │     2 │ "00.15%"  │
│    64 │ "v100/nanoid@4.0.0"              │ "2.89 kB"   │ "00.06%" │     2 │ "00.15%"  │
│    65 │ "v102/fast-deep-equal@3.1.3"     │ "2.79 kB"   │ "00.06%" │     2 │ "00.15%"  │
│    66 │ "v102/websocket@1.0.34"          │ "2.75 kB"   │ "00.05%" │     1 │ "00.07%"  │
│    67 │ "v102/validate.io-integer@1.0.5" │ "2.39 kB"   │ "00.05%" │     2 │ "00.15%"  │
│    68 │ "v102/@preact/signals-core@1.0." │ "2.32 kB"   │ "00.05%" │     2 │ "00.15%"  │
│    69 │ "v96/style-vendorizer@2.2.3"     │ "1.87 kB"   │ "00.04%" │     1 │ "00.07%"  │
│    70 │ "@octokit/request-error@v2.1.0-" │ "1.86 kB"   │ "00.04%" │     1 │ "00.07%"  │
│    71 │ "v102/validate.io-number@1.0.3"  │ "1.66 kB"   │ "00.03%" │     2 │ "00.15%"  │
│    72 │ "v102/validate.io-array@1.0.6"   │ "1.59 kB"   │ "00.03%" │     2 │ "00.15%"  │
│    73 │ "v102/@dnd-kit/accessibility@3." │ "1.56 kB"   │ "00.03%" │     9 │ "00.66%"  │
│    74 │ "v102/validate.io-function@1.0." │ "1.5 kB"    │ "00.03%" │     2 │ "00.15%"  │
│    75 │ "lodash-es@4.17.21"              │ "1.47 kB"   │ "00.03%" │     8 │ "00.59%"  │
│    76 │ "@octokit/auth-token@v3.0.0-WuY" │ "1.39 kB"   │ "00.03%" │     1 │ "00.07%"  │
│    77 │ "v102/es5-ext@0.10.62"           │ "1.14 kB"   │ "00.02%" │     1 │ "00.07%"  │
│    78 │ "once@v1.4.0-dZva3nt1fLBY6vpXF5" │ "1.1 kB"    │ "00.02%" │     1 │ "00.07%"  │
│    79 │ "exponential-backoff@3.1.0"      │ "897 B"     │ "00.02%" │     1 │ "00.07%"  │
│    80 │ "@octokit/rest@v19.0.4-xPNRCbtf" │ "843 B"     │ "00.02%" │     1 │ "00.07%"  │
│    81 │ "@octokit/rest@19.0.4"           │ "842 B"     │ "00.02%" │     1 │ "00.07%"  │
│    82 │ "@octokit/plugin-request-log@v1" │ "736 B"     │ "00.01%" │     1 │ "00.07%"  │
│    83 │ "preact@10.11.3"                 │ "689 B"     │ "00.01%" │     5 │ "00.37%"  │
│    84 │ "wrappy@v1.0.2-e8nLh7Qms0NRhbAb" │ "667 B"     │ "00.01%" │     1 │ "00.07%"  │
│    85 │ "is-plain-object@v5.0.0-8mrVMp9" │ "623 B"     │ "00.01%" │     1 │ "00.07%"  │
│    86 │ "@rjsf/validator-ajv8@5.0.0-bet" │ "416 B"     │ "00.01%" │     1 │ "00.07%"  │
│    87 │ "@rjsf/core@5.0.0-beta.15"       │ "346 B"     │ "00.01%" │     1 │ "00.07%"  │
│    88 │ "swr@2.0.0"                      │ "329 B"     │ "00.01%" │     1 │ "00.07%"  │
│    89 │ "preact-render-to-string@5.2.4"  │ "267 B"     │ "00.01%" │     1 │ "00.07%"  │
│    90 │ "deprecation@v2.3.1-uvOjAQiALAZ" │ "255 B"     │ "00.01%" │     1 │ "00.07%"  │
│    91 │ "@dnd-kit/core@6.0.5"            │ "210 B"     │ "00.00%" │     1 │ "00.07%"  │
│    92 │ "@dnd-kit/accessibility@3.0.1"   │ "205 B"     │ "00.00%" │     1 │ "00.07%"  │
│    93 │ "twind@0.16.17"                  │ "194 B"     │ "00.00%" │     2 │ "00.15%"  │
│    94 │ "@dnd-kit/utilities@3.2.0"       │ "193 B"     │ "00.00%" │     1 │ "00.07%"  │
│    95 │ "@dnd-kit/sortable@7.0.1"        │ "190 B"     │ "00.00%" │     1 │ "00.07%"  │
│    96 │ "@rjsf/utils@5.0.0-beta.13"      │ "185 B"     │ "00.00%" │     1 │ "00.07%"  │
│    97 │ "ajv@8.11.2"                     │ "156 B"     │ "00.00%" │     1 │ "00.07%"  │
│    98 │ "@builder.io/partytown@0.7.1"    │ "140 B"     │ "00.00%" │     1 │ "00.07%"  │
│    99 │ "@preact/signals-core@1.0.1"     │ "134 B"     │ "00.00%" │     1 │ "00.07%"  │
│   100 │ "@supabase/supabase-js@1.35.4"   │ "130 B"     │ "00.00%" │     1 │ "00.07%"  │
│   101 │ "@preact/signals@1.0.3"          │ "119 B"     │ "00.00%" │     1 │ "00.07%"  │
│   102 │ "tabbable@5.3.3"                 │ "98 B"      │ "00.00%" │     1 │ "00.07%"  │
│   103 │ "nanoid@4.0.0"                   │ "93 B"      │ "00.00%" │     1 │ "00.07%"  │
│   104 │ "@dnd-kit/utilities@3.2.1"       │ "73 B"      │ "00.00%" │     1 │ "00.07%"  │
└───────┴──────────────────────────────────┴─────────────┴──────────┴───────┴───────────┘

>>> Top offenders (>p90) and who depends on them:

std@0.170.0 is depended by [ "v102/@supabase/gotrue-js@1.24.0" ]
v96/csstype@3.1.1 is depended by [ "v96/twind@0.16.17" ]
v102/lodash@4.17.21 is depended by [
  "v102/json-schema-compare@0.2.2",
  "v102/json-schema-merge-allof@0.8.1",
  "v102/lodash@4.17.21"
]
v102/ajv@8.11.2 is depended by [
  "ajv@8.11.2",
  "v102/@rjsf/validator-ajv8@5.0.0-beta.13",
  "v102/ajv-formats@2.1.1",
  "v102/ajv@8.11.2"
]
denoflate@1.2.1 is depended by [ "esbuild@v0.14.51" ]
esbuild@v0.14.51 is depended by [ "esbuild_deno_loader@0.5.2", "fresh@1.1.2" ]
v102/preact@10.11.3 is depended by [ "v102/@rjsf/utils@5.0.0-beta.13", "v102/@rjsf/utils@5.0.0-beta.15" ]
v96/lodash-es@4.17.21 is depended by [ "lodash-es@4.17.21", "v96/lodash-es@4.17.21" ]
v102/@rjsf/utils@5.0.0-beta.15 is depended by [ "v102/@rjsf/validator-ajv8@5.0.0-beta.13" ]
v102/@dnd-kit/core@6.0.5 is depended by [ "@dnd-kit/core@6.0.5" ]
v102/@rjsf/utils@5.0.0-beta.13 is depended by [ "@rjsf/utils@5.0.0-beta.13" ]


Deps with more than one version and who depends on them:
@rjsf/utils Set { "v102/@rjsf/utils@5.0.0-beta.13", "v102/@rjsf/utils@5.0.0-beta.15" }
v102/@rjsf/utils@5.0.0-beta.13 is depended by [ "@rjsf/utils@5.0.0-beta.13" ]
v102/@rjsf/utils@5.0.0-beta.15 is depended by [ "v102/@rjsf/validator-ajv8@5.0.0-beta.13" ]
```
