require('dotenv').config();

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import PassportStrategy from './middlewares/passport'


import authRoutes from './routes/auth.routes'

// Initializations
const app = express();

// settings
app.set('port', process.env.SERVER_PORT || 3700);

// Middlewares
// app.use(cors());
app.use((req, res, next) => {
  const corsWhitelist = [
    'https://relicario.josematias.dev/',
  ];

  if (req.headers.origin && corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  next();
});


// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

passport.use(PassportStrategy.local);

// Routes
app.get('/', (req, res) => {
  res.json({
    'project-name': 'relicario-api',
    'description': 'API para sistema de gerenciamento de bibliotecas',
    'link': `https://relicario-api.josematias.dev/`,
  });
});

app.use(authRoutes);

export default app;
