export default {
  jwtSecret: process.env.JWT_SECRET || 'SecretToken',
  MongoDB: {
    URI: process.env.MONGODB_URI || 'mongodb',
    USER: process.env.MONGODB_USER || 'josematias',
    PASS: process.env.MONGODB_PASS || 'MongoDB2021!',
    HOST: process.env.MONGODB_HOST || 'josematias.dev',
    PORT: process.env.MONGODB_PORT || '27017',
    NAME: process.env.MONGODB_NAME || 'relicario',
  },
  JSReport: {
    hostname: process.env.JSREPORT_HOST || 'https://jsreport.josematias.dev/api/report',
    username: process.env.JSREPORT_USER || 'jose.matias',
    password: process.env.JSREPORT_PASS || 'jmsf@jsreport',
  }
};
