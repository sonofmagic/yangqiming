import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { readFileSync } from 'node:fs'
import json from '@rollup/plugin-json'
import builtinModules from 'builtin-modules'
import { visualizer } from 'rollup-plugin-visualizer'
// import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
const pkg = JSON.parse(
  readFileSync('./package.json', {
    encoding: 'utf8'
  })
)
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

/** @type {import('rollup').RollupOptions} */
const config = {
  // input: 'src/index.ts',
  input: { index: 'src/index.ts', cli: 'src/cli.ts' },
  output: [
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   sourcemap: isDev,
    //   exports: 'auto'
    // },
    // { format: 'esm', file: pkg.module, sourcemap: isDev }
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: isDev,
      exports: 'auto',
      esModule: true,
      generatedCode: {
        reservedNamesAsProps: false
      },
      interop: 'compat',
      systemNullSetters: false
    }
  ],
  makeAbsoluteExternalsRelative: true,
  preserveEntrySignatures: 'strict',
  plugins: [
    json(),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    terser(),
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: isDev }),
    isProd
      ? visualizer({
          // emitFile: true,
          filename: `stats/stats.html`
        })
      : undefined
  ],
  external: [...(pkg.dependencies ? Object.keys(pkg.dependencies) : []), ...builtinModules]
}

export default config
