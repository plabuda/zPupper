// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    // Same behavior as the "src" example above:
    src: { url: '/scripts' },
    // Mount "public" to the root URL path ("/*") and serve files with zero transformations:
    public: { url: '/', static: true, resolve: false },
  },
  plugins: ['@snowpack/plugin-typescript'],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
    treeshake: true,
    sourcemap: false
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 8000
  },
  buildOptions: {
    /* ... */
  },
};
