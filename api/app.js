const path = require('path');
const crypto = require('crypto');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const PDFRoute = require('./routes/pdfRoutes');
const cookieParser = require('cookie-parser');
const { createUser } = require('./utils/createUser');
const { sessionUrl } = require('./server');
const AppError = require('./utils/classes/AppError');
const entryRoute = require('./routes/entryRoute');
const refreshRoute = require('./routes/refreshRoute');
const ratingRoute = require('./routes/ratingRoute');
const mediaRoute = require('./routes/mediaRoute');
const errorMiddleware = require('./utils/classes/Error');
const {subscribe, cancel} = require('./controllers/subscriptionController');
const { isAuth } = require('./utils/isAuth');
const { verifyJWT } = require('./controllers/authController');
const {
  isStillActive,
  create,
} = require('./controllers/paymentRegisterController');

const app = express();

const corsOpts = {
  credentials: true,
  origin: 'http://localhost:3000',

  methods: ['GET', 'POST'],

  allowedHeaders: ['Content-Type'],
};

const store = new MongoDBStore({
  uri: sessionUrl,
  collection: 'mySessions',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts));
app.use(cookieParser());

const secret = crypto.randomBytes(32).toString('hex');

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use('/api/v1/pdf', isAuth, createUser, PDFRoute);
app.use('/api/v1/entry', entryRoute);
app.use('/api/v1/token', refreshRoute);
app.use('/api/v1/media/share', mediaRoute);
app.use(
  '/api/v1/superpdf/payment/charge',
  verifyJWT,
  isStillActive,
  subscribe
);
app.use(
  '/api/v1/superpdf/payment/:id/create',
  verifyJWT,
  isStillActive,
  create
);

app.use('/api/v1/superpdf/subscription/delete', verifyJWT, cancel);
app.use('/api/v1/rate', ratingRoute);

app.all('*', (req, res, next) => {
  next(new AppError(404, 'Page is not found'));
});

app.use(errorMiddleware);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

module.exports = app;
