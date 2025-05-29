const config = require('./src/config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  pathPrefix: '/portfolio',
  siteMetadata: {
    title: 'Ivan Ilyich',
    description: 'Software Engineer & Developer',
    siteUrl: 'https://ivanilyich.github.io/portfolio',
    image: '/og.png',
    twitterUsername: '@ivanilyich',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ivan Ilyich',
        short_name: 'Ivan Ilyich',
        description: 'Software Engineer & Developer',
        start_url: '/portfolio',
        background_color: '#020c1b',
        theme_color: '#0a192f',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-XXXXXXXXXX',
        head: true,
        anonymize: true,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-sitemap',
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             siteUrl
    //           }
    //         }
    //         allSitePage {
    //           edges {
    //             node {
    //               path
    //             }
    //           }
    //         }
    //       }
    //     `,
    //     serialize: ({ site, allSitePage }) =>
    //       allSitePage.edges.map(edge => ({
    //         url: `${site.siteMetadata.siteUrl}${edge.node.path}`,
    //         changefreq: 'daily',
    //         priority: 0.7,
    //       })),
    //   },
    // },
    {
      resolve: 'gatsby-plugin-csp',
      options: {
        disableOnDev: true,
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        directives: {
          'default-src': "'self'",
          'script-src': "'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.google-analytics.com",
          'style-src': "'self' 'unsafe-inline'",
          'img-src': "'self' data: blob:",
          'connect-src': "'self'",
          'font-src': "'self' data:",
          'object-src': "'none'",
        },
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: '#64ffda' },
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
  ],
};
