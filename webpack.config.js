const path = require("path");

module.exports = {
  entry: ["./src/index.ts", "./src/firebase.js"],
  output: {
    filename: "main.js",
    path: path.resolve(`${__dirname}/public`, "dist"),
  },
  watch: true,
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
