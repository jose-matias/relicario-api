export default {
  jwtSecret: process.env.JWT_SECRET,
  MongoDB: {
    URI: process.env.MONGODB_URI,
    USER: process.env.MONGODB_USER,
    PASS: process.env.MONGODB_PASS,
    HOST: process.env.MONGODB_HOST,
    PORT: process.env.MONGODB_PORT,
    NAME: process.env.MONGODB_NAME,
  },
  JSReport: {
    hostname: process.env.JSREPORT_HOST,
    username: process.env.JSREPORT_USER,
    password: process.env.JSREPORT_PASS,
  },
  NodeMailer: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
