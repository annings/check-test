/* eslint-disable import/no-extraneous-dependencies */
/** @format */
import json from "rollup-plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
// import { eslint } from 'rollup-plugin-eslint';
import typescript from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import postcss from "rollup-plugin-postcss";
// PostCSS plugins
import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
// const esOutput = {
//   preserveModules: true,
//   preserveModulesRoot: "src",
//   exports: "named",
// };

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "public/iife_bundle.js",
      name: "iife",
      format: "iife",
      sourcemap: false,
    },
  ],

  // 是否开启代码分割
  experimentalCodeSplitting: true,
  plugins: [
    json(),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano(),
      ],
      extensions: [".css"],
    }),
    // eslint({
    //     fix: true,
    //     include: ['src/*.ts', 'src/*.tsx', 'src/*.js', 'src/*.jsx'],
    //     exclude: ['node_modules/**']
    // }),

    typescript({ useTsconfigDeclarationDir: true }),

    resolve({ extensions: [".tsx", ".ts", ".jsx", ".js"] }),

    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),

    commonjs({
      //解决某些commonjs的代码打包不进去的问题
      include: ["node_modules/**"],
    }),

    babel({
      exclude: ["node_modules/**"],
    }),

    livereload(),
    // 本地服务器
    serve({
      open: true, // 自动打开页面
      port: 8000,
      openPage: "index.html", // 打开的页面
      contentBase: "",
    }),
    // env === 'production' && terser()
  ],
};
