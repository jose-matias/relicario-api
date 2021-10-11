import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import PassportStrategy from './middlewares/passport'

import authRoutes from './routes/auth.routes'

dotenv.config();

// Initializations
const app = express();

// settings
app.set('port', process.env.SERVER_PORT || 3700);

// Middlewares
app.use(cors());
// app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

passport.use(PassportStrategy.local);
passport.use('google-token', PassportStrategy.google);
passport.use('facebook-token', PassportStrategy.facebook);

app.all('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

// Routes
app.get('/', (req, res) => {
  res.json({
    'project-name': 'relicario-api',
    'description': 'API para sistema de venda e troca de livros',
    'runing-on': `http://localhost:${app.get('port')}/`,
  });
});

app.use(authRoutes);

export default app;
