export default {
  jwtSecret: process.env.JWT_SECRET || 'SecretToken',
  facebookAppId: process.env.FACEBOOK_APP_ID || '465011334889680',
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || '4fc93723119a124fcc0fcd22da80e6a8',
  googleAppId: process.env.GOOGLE_APP_ID || '598744794483-u5almo77dmnr76bgq3m2te393u8be2mt.apps.googleusercontent.com',
  googleAppSecret: process.env.GOOGLE_APP_SECRET || 'Isw7nuu__aos0exrN4x7irMH',
  MongoDB: {
    URI: process.env.MONGODB_URI || 'mongodb',
    USER: process.env.MONGODB_USER || 'josematias',
    PASS: process.env.MONGODB_PASS || 'MongoDB2021!',
    HOST: process.env.MONGODB_HOST || 'josematias.dev',
    PORT: process.env.MONGODB_PORT || '27017',
    NAME: process.env.MONGODB_NAME || 'relicario',
  },
  JSReport: {
    hostname: process.env.JSREPORT_HOST || 'https://josematias.dev/reporting/api/report',
    username: process.env.JSREPORT_USER || 'jose.matias',
    password: process.env.JSREPORT_PASS || 'jmsf@jsreport',
  }
};
