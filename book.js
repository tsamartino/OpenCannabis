module.exports = {
    title: 'OpenCannabis Specification (Raw/Draft)',
    description: 'Open technical model and specification for legal cannabis data',
    author: 'OpenCannabis Editor and Contributors',
    gitbook: '>=3.0.0',
    plugins: [
      'coss',
      'code',
      'sitemap',
      'insert-logo',
      'nomnoml',
      'colors',
      'terminal',
      'rss',
      'plantuml-cloud-languages',
    ],
    pluginsConfig: {
      sitemap: {
        hostname: 'https://rfc.opencannabis.info/'
      },
      rss: {
        title: 'OpenCannabis Revision Feed',
        site_url: 'https://rfc.opencannabis.info',
        author: 'Bloombox (info+opencannabis@bloombox.io)',
        managingEditor: 'Sam Gammon (sam@bloombox.io)',
        feed_url: 'https://medium.com/feed/opencannabis',
        categories: [
          'cannabis',
          'technology',
          'data',
          'protobuf'
        ]
      }
    }
};
