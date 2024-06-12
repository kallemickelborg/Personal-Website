/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mickelb.org',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*', 
    '/login', 
    '/components/*', 
    '/hooks/*'
  ],
  sitemapSize: 5000,
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
  },
};