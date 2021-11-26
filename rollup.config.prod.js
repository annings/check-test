import json from "rollup-plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";

const esOutput = {
  preserveModules: true,
  preserveModulesRoot: "src",
  exports: "named",
};
export default {
  input: "./src/index.tsx",
  output: [
    {
      dir: "esm",
      format: "esm",
      ...esOutput,
    },
  ],
  // 是否开启代码分割
  experimentalCodeSplitting: true,
  plugins: [
    json(),
    // clear({
    //   targets: ["es"],
    // }),
    resolve({ extensions: [".tsx", ".ts", ".jsx", ".js"] }),

    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),

    commonjs({
      include: ["node_modules/**"],
    }),

    babel({
      exclude: ["node_modules/**"],
    }),

    typescript({ useTsconfigDeclarationDir: true }),
  ],
  // 将模块视为外部模块，不会打包在库中
  external: ["react", "react-dom"],
};
