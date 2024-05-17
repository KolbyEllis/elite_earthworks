const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const configCssExtension = require("./src/config/cssExtension");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");

const filterPostDate = require("./src/config/postDate");

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(pluginEleventyNavigation);
    eleventyConfig.addPlugin(pluginSitemap, configSitemap);
    if (configServer.isProduction) {
        eleventyConfig.addPlugin(pluginMinifier);
    }
    eleventyConfig.addPlugin(pluginRss);

    // Extensions
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCssExtension);

    // Pass-through files
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

    // Filters
    eleventyConfig.addFilter("postDate", filterPostDate);

    // Shortcodes
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Collections
    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByTag("post").reverse();
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
