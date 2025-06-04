import adapter from "@sveltejs/adapter-static";

export default {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
      strict: false,
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : "/idyll",
    },
    prerender: {
      handleHttpError: "warn",
      handleMissingId: "warn",
    },
  },
};
