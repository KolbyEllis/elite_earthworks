module.exports = function (eleventyConfig) {
    // EXTENSIONS
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", require("./src/config/cssExtension"));

    // PLUGINS
    eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
    eleventyConfig.addPlugin(require("@quasibit/eleventy-plugin-sitemap"), require("./src/config/sitemap"));
    if (require("./src/config/server").isProduction) {
        eleventyConfig.addPlugin(require("@sherby/eleventy-plugin-files-minifier"));
    }
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));

    // SERVER OPTIONS
    eleventyConfig.setServerOptions(require("./src/config/server"));

    // PASSTHROUGHS
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/assets/documents"); // ✅ This was missing

    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

    // FILTERS
    eleventyConfig.addFilter("postDate", require("./src/config/postDate"));

    // SHORTCODES
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // COLLECTIONS
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByTag("post");
    });

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};
